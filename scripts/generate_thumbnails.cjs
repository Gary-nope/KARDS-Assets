const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_ROOT = path.resolve(__dirname, '..');

const HQ_SRC_DIR = path.join(ASSETS_ROOT, 'HQ2_unknown-id_Resized');
const HQ_DST_DIR = path.join(ASSETS_ROOT, 'HQ2_unknown-id_Thumbnails');

const CARDBACK_SRC_DIR = path.join(ASSETS_ROOT, 'CardBacks_Resized');
const CARDBACK_DST_DIR = path.join(ASSETS_ROOT, 'CardBacks_Thumbnails');

const THUMBNAIL_WIDTH = 240;
const WEBP_QUALITY = 82;

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function convertFile(srcFile, dstFile) {
  ensureDir(path.dirname(dstFile));
  await sharp(srcFile)
    .resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(dstFile);
}

function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (/\.(png|jpe?g)$/i.test(item)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function run() {
  console.log('=== 开始生成 WebP 缩略图 ===\n');

  let totalSrcBytes = 0;
  let totalDstBytes = 0;
  let totalCount = 0;

  // 1. 处理 HQ 总部
  console.log('1. 处理总部图片 (HQ2_unknown-id_Resized)...');
  const hqFiles = walkDir(HQ_SRC_DIR);
  for (const srcPath of hqFiles) {
    const relPath = path.relative(HQ_SRC_DIR, srcPath);
    const dstRelPath = relPath.replace(/\.(png|jpe?g)$/i, '.webp');
    const dstPath = path.join(HQ_DST_DIR, dstRelPath);

    const srcStat = fs.statSync(srcPath);
    totalSrcBytes += srcStat.size;

    await convertFile(srcPath, dstPath);

    const dstStat = fs.statSync(dstPath);
    totalDstBytes += dstStat.size;
    totalCount++;
  }
  console.log(`✓ 已生成 ${hqFiles.length} 个总部 WebP 缩略图。\n`);

  // 2. 处理卡背 CardBacks
  console.log('2. 处理卡背图片 (CardBacks_Resized)...');
  const cardbackFiles = walkDir(CARDBACK_SRC_DIR);
  for (const srcPath of cardbackFiles) {
    const relPath = path.relative(CARDBACK_SRC_DIR, srcPath);
    const dstRelPath = relPath.replace(/\.(png|jpe?g)$/i, '.webp');
    const dstPath = path.join(CARDBACK_DST_DIR, dstRelPath);

    const srcStat = fs.statSync(srcPath);
    totalSrcBytes += srcStat.size;

    await convertFile(srcPath, dstPath);

    const dstStat = fs.statSync(dstPath);
    totalDstBytes += dstStat.size;
    totalCount++;
  }
  console.log(`✓ 已生成 ${cardbackFiles.length} 个卡背 WebP 缩略图。\n`);

  const srcMB = (totalSrcBytes / 1024 / 1024).toFixed(2);
  const dstMB = (totalDstBytes / 1024 / 1024).toFixed(2);
  const ratio = (((totalSrcBytes - totalDstBytes) / totalSrcBytes) * 100).toFixed(1);

  console.log('=== 统计结果 ===');
  console.log(`处理文件总数: ${totalCount}`);
  console.log(`原图总体积:   ${srcMB} MB`);
  console.log(`缩略图总体积: ${dstMB} MB`);
  console.log(`体积缩减率:   ${ratio}%\n`);
}

run().catch(err => {
  console.error('生成缩略图失败:', err);
  process.exit(1);
});
