import fs from "fs";
if (fs.existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
} else if (fs.existsSync(".env")) {
  process.loadEnvFile(".env");
}



const dummyData = [
  // Income
  { type: "income", amount: 15000000, category: "Gaji", description: "Gaji bulan ini", daysAgo: 28, confidence: 0.98, ml_source: "ml" },
  { type: "income", amount: 2500000, category: "Freelance", description: "Fee proyek desain", daysAgo: 15, confidence: 0.85, ml_source: "ml" },
  { type: "income", amount: 500000, category: "Investasi", description: "Dividen saham BBCA", daysAgo: 5, confidence: 0.9, ml_source: "ml" },

  // Expenses - Makanan
  { type: "expense", amount: 150000, category: "Makanan", description: "Belanja groceries Superindo", daysAgo: 2, confidence: 0.95, ml_source: "ml" },
  { type: "expense", amount: 35000, category: "Makanan", description: "Beli mixue", daysAgo: 1, confidence: 0.88, ml_source: "ml" },
  { type: "expense", amount: 75000, category: "Makanan", description: "Order grabfood pecel lele", daysAgo: 4, confidence: 0.92, ml_source: "ml" },
  { type: "expense", amount: 120000, category: "Makanan", description: "Makan siang di restoran", daysAgo: 10, confidence: 0.85, ml_source: "ml" },
  { type: "expense", amount: 25000, category: "Makanan", description: "Ngopi senja", daysAgo: 14, confidence: 0.75, ml_source: "ml" },
  
  // Expenses - Transport
  { type: "expense", amount: 100000, category: "Transport", description: "Isi bensin pertalite", daysAgo: 3, confidence: 0.96, ml_source: "ml" },
  { type: "expense", amount: 25000, category: "Transport", description: "Naik gojek ke kantor", daysAgo: 1, confidence: 0.89, ml_source: "ml" },
  { type: "expense", amount: 50000, category: "Transport", description: "Top up flazz e-toll", daysAgo: 12, confidence: 0.91, ml_source: "ml" },
  { type: "expense", amount: 15000, category: "Transport", description: "Parkir mobil mall", daysAgo: 7, confidence: 0.99, ml_source: "ml" },

  // Expenses - Tagihan
  { type: "expense", amount: 450000, category: "Tagihan", description: "Token listrik PLN", daysAgo: 25, confidence: 0.98, ml_source: "ml" },
  { type: "expense", amount: 350000, category: "Tagihan", description: "Bayar Indihome", daysAgo: 20, confidence: 0.99, ml_source: "ml" },
  { type: "expense", amount: 150000, category: "Tagihan", description: "Kuota telkomsel", daysAgo: 15, confidence: 0.94, ml_source: "ml" },

  // Expenses - Hiburan
  { type: "expense", amount: 120000, category: "Hiburan", description: "Nonton bioskop", daysAgo: 7, confidence: 0.82, ml_source: "ml" },
  { type: "expense", amount: 65000, category: "Hiburan", description: "Langganan Netflix", daysAgo: 22, confidence: 0.97, ml_source: "ml" },
  { type: "expense", amount: 50000, category: "Hiburan", description: "Top up diamond ml", daysAgo: 2, confidence: 0.86, ml_source: "ml" },
  { type: "expense", amount: 250000, category: "Hiburan", description: "Main biliar bareng temen", daysAgo: 9, confidence: 0.72, ml_source: "ml" },

  // Expenses - Belanja
  { type: "expense", amount: 350000, category: "Belanja", description: "Baju koko baru", daysAgo: 8, confidence: 0.84, ml_source: "ml" },
  { type: "expense", amount: 150000, category: "Belanja", description: "Checkout shopee sabun mandi", daysAgo: 5, confidence: 0.88, ml_source: "ml" },
  { type: "expense", amount: 550000, category: "Belanja", description: "Beli sepatu lari", daysAgo: 18, confidence: 0.90, ml_source: "ml" },

  // Expenses - Kesehatan
  { type: "expense", amount: 250000, category: "Kesehatan", description: "Konsul dokter gigi", daysAgo: 14, confidence: 0.91, ml_source: "ml" },
  { type: "expense", amount: 45000, category: "Kesehatan", description: "Beli vitamin C", daysAgo: 6, confidence: 0.93, ml_source: "ml" }
];

async function main() {
  const { prisma } = await import("../src/lib/db");
  
  const user = await prisma.user.findUnique({
    where: { email: "bayuadjie@gmail.com" }
  });
  if (!user) {
    console.error("User bayuadjie@gmail.com tidak ditemukan. Pastikan sudah register terlebih dahulu.");
    process.exit(1);
  }

  console.log(`Menambahkan transaksi untuk user: ${user.email}...`);

  console.log("Menambahkan data dummy baru...");
  const today = new Date();

  for (const data of dummyData) {
    const d = new Date(today);
    d.setDate(d.getDate() - data.daysAgo);
    
    await prisma.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: d,
        confidence: data.confidence,
        mlSource: data.ml_source,
        userId: user.id
      }
    });
  }

  console.log(`✅ Berhasil menambahkan ${dummyData.length} transaksi dummy.`);
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
