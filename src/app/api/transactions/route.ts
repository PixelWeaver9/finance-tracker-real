import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getClassifier } from "@/lib/ml/classifier";

// GET /api/transactions — list transactions
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: Record<string, string> = { userId: session.user.id };
    if (filter !== "all") {
      where.type = filter;
    }

    // Get total count
    const total = await prisma.transaction.count({ where });

    // Get paginated transactions
    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    });

    const data = transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amount: Number(t.amount),
      category: t.category,
      confidence: Number(t.confidence),
      ml_source: t.mlSource,
      description: t.description,
      date: t.date.toISOString().split("T")[0],
      created_at: t.createdAt.toISOString(),
    }));

    return NextResponse.json({ 
      success: true, 
      data, 
      count: data.length,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Read error:", error);
    return NextResponse.json(
      { success: false, message: "Database error" },
      { status: 503 }
    );
  }
}

// POST /api/transactions — create transaction
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    if (!data.type || !data.amount || !data.description || !data.date) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap. Wajib: type, amount, description, date." },
        { status: 400 }
      );
    }

    // ML prediction
    let category = "Lainnya";
    let confidence = 0;
    let mlSource = "fallback";

    try {
      const classifier = getClassifier();
      const result = classifier.predict(data.description, data.type);
      category = result.category;
      confidence = result.confidence;
      mlSource = "ml";
    } catch (e) {
      console.error("ML prediction failed:", e);
    }

    const transaction = await prisma.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        category,
        confidence,
        mlSource,
        description: data.description,
        date: new Date(data.date),
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi berhasil disimpan.",
        id: transaction.id,
        category,
        confidence,
        ml_source: mlSource,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { success: false, message: "Database error" },
      { status: 503 }
    );
  }
}
