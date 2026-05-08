#!/usr/bin/env node

/**
 * Generate AUTH_SECRET untuk NextAuth
 * Usage: node scripts/generate-secret.js
 */

const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

console.log('\n🔐 AUTH_SECRET Generator\n');
console.log('Copy salah satu secret di bawah ini ke environment variable AUTH_SECRET:\n');

// Generate 3 options
for (let i = 1; i <= 3; i++) {
  console.log(`Option ${i}:`);
  console.log(generateSecret());
  console.log('');
}

console.log('💡 Tip: Jangan share secret ini ke siapapun!\n');
