import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "monthly";

    // Calculate start date
    const startDate = new Date();
    if (period === "weekly") {
      startDate.setDate(startDate.getDate() - 7);
    } else {
      // default to monthly (30 days)
      startDate.setDate(startDate.getDate() - 30);
    }

    // Prisma groups by category and sums the amount
    const groupedTransactions = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId: session.user.id,
        type: "expense",
        date: {
          gte: startDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Format data for Recharts
    const chartData = groupedTransactions
      .map((item) => ({
        name: item.category,
        value: Number(item._sum.amount || 0),
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value); // Sort descending

    return NextResponse.json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    console.error("Charts API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
