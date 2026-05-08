'use strict';

import natural from 'natural';

// ──────────────────────────────────────────────
//  Preprocessing & Stemmer
// ──────────────────────────────────────────────
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.StemmerId;

// Stopwords bahasa Indonesia (diperluas)
const STOPWORDS = new Set([
  'di', 'ke', 'dari', 'yang', 'dan', 'atau', 'dengan', 'untuk', 'buat',
  'pada', 'dalam', 'oleh', 'karena', 'jika', 'maka', 'saat', 'ketika',
  'ini', 'itu', 'adalah', 'ada', 'tidak', 'belum', 'bukan', 'sudah', 'akan', 'bisa',
  'juga', 'lagi', 'lebih', 'sangat', 'sekali', 'buat', 'terus', 'saja',
  'saya', 'kamu', 'dia', 'kita', 'kami', 'mereka', 'kalian',
  'hari', 'bulan', 'tahun', 'minggu', 'jam', 'menit'
]);

/**
 * Preprocessing teks: lowercase → tokenize → hapus stopword → stemmer → join
 */
export function preprocess(text: string): string {
  const lower = text.toLowerCase().trim();
  const cleaned = lower.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ');
  const tokens = tokenizer.tokenize(cleaned);

  if (!tokens) return '';

  const filtered = tokens.filter((t: string) => t.length > 1 && !STOPWORDS.has(t));
  const stemmed = filtered.map((t: string) => stemmer.stem(t));

  return stemmed.join(' ');
}

// ──────────────────────────────────────────────
//  Kelas Classifier (wrapper Naive Bayes)
// ──────────────────────────────────────────────
interface ClassificationResult {
  label: string;
  value: number;
}

interface PredictionResult {
  category: string;
  confidence: number;
}

interface TrainingData {
  expense: Array<{ text: string; category: string }>;
  income: Array<{ text: string; category: string }>;
}

export class FinanceClassifier {
  private expenseClassifier: natural.BayesClassifier;
  private incomeClassifier: natural.BayesClassifier;
  private _isTrained: boolean;

  constructor() {
    this.expenseClassifier = new natural.BayesClassifier();
    this.incomeClassifier = new natural.BayesClassifier();
    this._isTrained = false;
  }

  get isTrained(): boolean {
    return this._isTrained;
  }

  /**
   * Melatih model dari dataset JSON
   */
  train(data: TrainingData): void {
    console.log('⚙️  Training expense classifier...');
    data.expense.forEach((item) => {
      const processed = preprocess(item.text);
      this.expenseClassifier.addDocument(processed, item.category);
    });

    console.log('⚙️  Training income classifier...');
    data.income.forEach((item) => {
      const processed = preprocess(item.text);
      this.incomeClassifier.addDocument(processed, item.category);
    });

    this.expenseClassifier.train();
    this.incomeClassifier.train();
    this._isTrained = true;

    console.log('✅ Training selesai!');
    console.log(`   Expense samples: ${data.expense.length}`);
    console.log(`   Income samples : ${data.income.length}`);
  }

  /**
   * Prediksi kategori dan confidence
   */
  predict(description: string, type: string = 'expense'): PredictionResult {
    if (!this._isTrained) {
      throw new Error('Model belum dilatih. Jalankan train() terlebih dahulu.');
    }

    const processed = preprocess(description);

    if (!processed || processed.trim() === '') {
      return { category: 'Lainnya', confidence: 0 };
    }

    const classifier = type === 'income' ? this.incomeClassifier : this.expenseClassifier;

    const category = classifier.classify(processed);
    const classifications = classifier.getClassifications(processed) as unknown as ClassificationResult[];
    const confidence = this._calculateConfidence(classifications, category);

    if (confidence < 0.5) {
      return { category: 'Lainnya', confidence: parseFloat(confidence.toFixed(4)) };
    }

    return {
      category,
      confidence: parseFloat(confidence.toFixed(4))
    };
  }

  private _calculateConfidence(classifications: ClassificationResult[], predictedClass: string): number {
    if (!classifications || classifications.length === 0) return 0;

    const EXP = 3;

    const isLog = classifications.some((c) => typeof c.value === 'number' && c.value < 0);
    let scores: Array<{ label: string; val: number }>;

    if (isLog) {
      const maxLog = Math.max(...classifications.map((c) => c.value));
      scores = classifications.map((c) => ({
        label: c.label,
        val: Math.pow(Math.exp(c.value - maxLog), EXP)
      }));
    } else {
      scores = classifications.map((c) => ({
        label: c.label,
        val: Math.pow(c.value, EXP)
      }));
    }

    const total = scores.reduce((sum, c) => sum + c.val, 0);
    if (total === 0) return 0;

    const predicted = scores.find((c) => c.label === predictedClass);
    if (!predicted) return 0;

    return predicted.val / total;
  }
}

// ──────────────────────────────────────────────
//  Singleton Instance
// ──────────────────────────────────────────────
import fs from 'fs';
import path from 'path';

const globalForML = globalThis as unknown as {
  classifier: FinanceClassifier | undefined;
};

export function getClassifier(): FinanceClassifier {
  if (globalForML.classifier && globalForML.classifier.isTrained) {
    return globalForML.classifier;
  }

  const classifier = new FinanceClassifier();

  const dataPath = path.join(process.cwd(), 'src', 'lib', 'ml', 'data', 'training_data.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(raw) as TrainingData;

  classifier.train(data);
  globalForML.classifier = classifier;

  return classifier;
}
