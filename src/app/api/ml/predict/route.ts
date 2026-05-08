import { NextRequest, NextResponse } from "next/server";
import { getClassifier, preprocess } from "@/lib/ml/classifier";

export async function POST(request: NextRequest) {
  try {
    const { description, type } = await request.json();

    if (!description || typeof description !== "string" || description.trim() === "") {
      return NextResponse.json(
        { success: false, message: 'Field "description" wajib diisi.' },
        { status: 400 }
      );
    }

    const transactionType = type === "income" ? "income" : "expense";
    const classifier = getClassifier();
    const result = classifier.predict(description.trim(), transactionType);
    const processedText = preprocess(description);

    return NextResponse.json({
      success: true,
      category: result.category,
      confidence: result.confidence,
      type: transactionType,
      processed_text: processedText,
    });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat prediksi.", category: "Lainnya", confidence: 0 },
      { status: 500 }
    );
  }
}
