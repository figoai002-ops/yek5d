import fs from 'fs/promises';

async function rmSafe(p) {
  try { await fs.rm(p, { recursive: true, force: true }); } catch {}
}

await rmSafe('.next/cache');
await rmSafe('node_modules/.cache');
// No need to recreate; webpack will run without FS cache in dev.
console.log('✅ Cache cleaned');