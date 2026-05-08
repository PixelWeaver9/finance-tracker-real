import { NextResponse } from "next/server";
import { getClassifier } from "@/lib/ml/classifier";

export async function GET() {
  try {
    const classifier = getClassifier();
    return NextResponse.json({
      status: "ok",
      ready: classifier.isTrained,
      message: classifier.isTrained
        ? "ML Service aktif dan siap digunakan"
        : "Model sedang disiapkan...",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      status: "error",
      ready: false,
      message: "ML Service tidak tersedia.",
      timestamp: new Date().toISOString(),
    });
  }
}
