import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getClassifier } from "@/lib/ml/classifier";

// PUT /api/transactions/[id] — update transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const transactionId = parseInt(id, 10);
    const data = await request.json();

    if (!data.type || !data.amount || !data.description || !data.date) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap." },
        { status: 400 }
      );
    }

    // Verify ownership
    const existing = await prisma.transaction.findFirst({
      where: { id: transactionId, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    // Re-predict via ML
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

    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        type: data.type,
        amount: data.amount,
        category,
        confidence,
        mlSource,
        description: data.description,
        date: new Date(data.date),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Transaksi berhasil diupdate.",
      category,
      confidence,
      ml_source: mlSource,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Database error" },
      { status: 503 }
    );
  }
}

// DELETE /api/transactions/[id] — delete transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const transactionId = parseInt(id, 10);

    // Verify ownership
    const existing = await prisma.transaction.findFirst({
      where: { id: transactionId, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    await prisma.transaction.delete({
      where: { id: transactionId },
    });

    return NextResponse.json({
      success: true,
      message: "Transaksi berhasil dihapus.",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Database error" },
      { status: 503 }
    );
  }
}
