//1.更新测试八字信息（bazi-backend\src\baziService.test.js手动修改）
//2.进入后端文件夹（cd D:\MYWORK\everydaywork\250703\BA_ZI_V3\bazi-backend）
//3.更新快照文件，（运行npm test -- -u）
//4.更新bazi-frontend\src\app\mock-bazi-data.ts中信息，（运行npm run update-mock自动更新，免手动复制bazi-backend\src\__snapshots__\baziService.test.js.snap到bazi-frontend\src\app\mock-bazi-data.ts）
//5.进入前端文件夹（cd D:\MYWORK\everydaywork\250703\BA_ZI_V3\bazi-frontend）
//6.运行npm run dev
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- 配置路径 ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源文件：Jest快照文件的路径
const sourceSnapshotPath = path.resolve(__dirname, '__snapshots__', 'baziService.test.js.snap');

// 目标文件：前端模拟数据的路径
const destinationMockPath = path.resolve(__dirname, '../../bazi-frontend/src/app/mock-bazi-data.ts');
// --- 配置路径结束 ---

console.log('--- [自动化脚本] 开始更新前端模拟数据 ---');
console.log(`[信息] 读取源文件: ${sourceSnapshotPath}`);

// 1. 读取快照文件内容
let snapshotContent;
try {
    snapshotContent = fs.readFileSync(sourceSnapshotPath, 'utf8');
} catch (error) {
    console.error(`\n[错误] 无法读取快照文件。`);
    console.error(`请确保您已经先运行 'npm test -- -u' 来生成最新的快照文件。`);
    process.exit(1);
}

// 2. 使用正则表达式提取核心的JSON对象
const match = snapshotContent.match(/exports\[`.*?`\] = `\s*(\{[\s\S]*\})\s*`;/);

if (!match || !match[1]) {
    console.error(`\n[错误] 无法在快照文件中找到有效的八字数据。快照格式可能已改变。`);
    process.exit(1);
}

const jsonData = match[1];

// 3. 准备要写入前端模拟数据文件的完整内容
const mockFileContent = `
// 该文件由后端自动化脚本生成，请勿手动修改！
// 生成时间: ${new Date().toLocaleString()}

import { BaziProfile } from "@/types/bazi";

export const mockBaziData: BaziProfile = ${jsonData};
`;

// 4. 将内容写入目标文件
console.log(`[信息] 写入目标文件: ${destinationMockPath}`);
try {
    fs.writeFileSync(destinationMockPath, mockFileContent.trim(), 'utf8');
    console.log(`\n✅ [成功] 前端模拟数据 (mock-bazi-data.ts) 已被成功更新！`);
    console.log('   现在您可以刷新前端页面查看最新结果了。');
} catch (error) {
    console.error(`\n[错误] 无法写入前端模拟数据文件。请检查路径是否正确或文件是否被占用。`, error);
    process.exit(1);
}