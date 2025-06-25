const fs = require('fs');
const path = require('path');

/**
 * Jest快照格式化和查看工具
 * 
 * 功能：
 * 1. 格式化快照文件，将多行对象转换为单行
 * 2. 比较原始和格式化后的文件大小和内容差异
 * 3. 提供在VS Code中打开格式化文件的选项
 * 
 * 使用方法：
 * - 格式化: node snapshotFormatter.js format [文件路径]
 * - 查看: node snapshotFormatter.js view [文件路径]
 * - 比较: node snapshotFormatter.js compare [文件路径]
 * - 应用: node snapshotFormatter.js apply [文件路径]
 * - 帮助: node snapshotFormatter.js help
 */

// 解析命令行参数
const args = process.argv.slice(2);
const command = args[0] || 'help';
const filePath = args[1];

// 快照文件夹路径
const snapshotsDir = path.join(__dirname, '__snapshots__');

/**
 * 主函数
 */
function main() {
  console.log('===== Jest快照文件格式化工具 =====');
  
  switch (command.toLowerCase()) {
    case 'format':
      formatSnapshots(filePath);
      break;
    case 'view':
      viewSnapshot(filePath);
      break;
    case 'compare':
      compareSnapshots(filePath);
      break;
    case 'apply':
      applyFormatted(filePath);
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log('使用方法:');
  console.log('  node snapshotFormatter.js <命令> [文件路径]');
  console.log('\n命令:');
  console.log('  format   格式化快照文件，将多行对象转换为单行');
  console.log('  view     查看快照文件内容');
  console.log('  compare  比较原始和格式化后的文件');
  console.log('  apply    将格式化后的文件应用到原始文件');
  console.log('  help     显示帮助信息');
  console.log('\n参数:');
  console.log('  [文件路径]  可选，指定要处理的快照文件路径');
  console.log('              如果不提供，将处理 __snapshots__ 目录中的所有快照文件');
  console.log('\n示例:');
  console.log('  node snapshotFormatter.js format src/__snapshots__/myTest.js.snap');
  console.log('  node snapshotFormatter.js view');
  console.log('  node snapshotFormatter.js compare src/__snapshots__/myTest.js.snap');
  console.log('  node snapshotFormatter.js apply src/__snapshots__/myTest.js.snap');
}

/**
 * 将格式化文件应用到原始文件
 */
function applyFormatted(specificFile) {
  if (!specificFile) {
    console.log('请指定要应用的文件路径:');
    console.log('  node snapshotFormatter.js apply [原始文件路径]');
    return;
  }
  
  const originalPath = path.isAbsolute(specificFile) ? 
    specificFile : 
    path.join(process.cwd(), specificFile);
    
  if (!fs.existsSync(originalPath)) {
    console.error(`错误：找不到指定的原始文件：${originalPath}`);
    return;
  }
  
  // 构造格式化文件路径
  const dir = path.dirname(originalPath);
  const basename = path.basename(originalPath, '.snap');
  const formattedPath = path.join(dir, `${basename}.formatted.snap`);
  
  if (!fs.existsSync(formattedPath)) {
    console.error(`错误：找不到格式化文件：${formattedPath}`);
    console.log('请先运行格式化命令:');
    console.log(`  node snapshotFormatter.js format ${specificFile}`);
    return;
  }
  
  // 读取格式化文件内容
  const formattedContent = fs.readFileSync(formattedPath, 'utf-8');
  
  // 检查是否已经有备份
  const backupPath = `${originalPath}.bak`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(originalPath, backupPath);
    console.log(`已创建备份: ${backupPath}`);
  } else {
    console.log(`已存在备份文件: ${backupPath}`);
  }
  
  // 将格式化内容应用到原始文件
  fs.writeFileSync(originalPath, formattedContent, 'utf-8');
  console.log(`已将格式化内容应用到原始文件: ${originalPath}`);
  
  // 删除格式化文件(可选，这里保留)
  // fs.unlinkSync(formattedPath);
  // console.log(`已删除格式化文件: ${formattedPath}`);
  
  console.log('\n提示: 如果您使用Jest测试，请重新运行测试以确保快照匹配。');
}

/**
 * 格式化快照文件
 */
function formatSnapshots(specificFile) {
  const snapshotFiles = getSnapshotFiles(specificFile);
  
  if (snapshotFiles.length === 0) {
    console.log('没有找到需要处理的快照文件');
    return;
  }
  
  console.log(`找到 ${snapshotFiles.length} 个快照文件需要处理`);
  
  // 处理每个文件
  const formattedFiles = [];
  for (const file of snapshotFiles) {
    const formattedFile = formatSnapshotFile(file);
    formattedFiles.push(formattedFile);
  }
  
  // 输出总结
  console.log('\n===== 格式化完成 =====');
  console.log(`共处理 ${formattedFiles.length} 个文件:`);
  formattedFiles.forEach(file => console.log(`- ${file}`));
  
  console.log('\n提示:');
  console.log('1. 格式化后的文件使用扩展名 .formatted.snap');
  console.log('2. 原始文件已备份为 .snap.bak');
  console.log('3. 要使用格式化后的文件替换原文件，请运行:');
  console.log('   node snapshotFormatter.js apply [文件路径]');
}

/**
 * 获取需要处理的快照文件
 */
function getSnapshotFiles(specificFile) {
  if (specificFile) {
    // 处理特定文件
    const filePath = path.isAbsolute(specificFile) ? 
      specificFile : 
      path.join(process.cwd(), specificFile);
      
    if (fs.existsSync(filePath) && filePath.endsWith('.snap')) {
      return [filePath];
    } else {
      console.error(`错误：找不到指定的快照文件：${filePath}`);
      return [];
    }
  } else {
    // 处理整个快照目录
    if (!fs.existsSync(snapshotsDir)) {
      console.error(`错误：快照目录不存在：${snapshotsDir}`);
      return [];
    }
    
    return findSnapshotFiles(snapshotsDir);
  }
}

/**
 * 递归查找快照文件
 */
function findSnapshotFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      files.push(...findSnapshotFiles(itemPath));
    } else if (item.endsWith('.snap') && 
              !item.endsWith('.formatted.snap') && 
              !item.endsWith('.bak')) {
      files.push(itemPath);
    }
  }
  
  return files;
}

/**
 * 格式化单个快照文件
 */
function formatSnapshotFile(filePath) {
  console.log(`\n处理文件: ${filePath}`);
  
  // 创建备份
  const backupPath = `${filePath}.bak`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`已创建备份: ${backupPath}`);
  } else {
    console.log(`已存在备份文件: ${backupPath}`);
  }
  
  // 读取文件内容
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalSize = content.length;
  
  // 格式化内容
  const formattedContent = formatContent(content);
  const formattedSize = formattedContent.length;
  
  // 创建格式化后的文件
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, '.snap');
  const formattedPath = path.join(dir, `${basename}.formatted.snap`);
  
  fs.writeFileSync(formattedPath, formattedContent, 'utf-8');
  
  const sizeDiff = ((originalSize - formattedSize) / originalSize * 100).toFixed(1);
  console.log(`已创建格式化文件: ${formattedPath}`);
  console.log(`文件大小: ${originalSize} -> ${formattedSize} 字节 (减少 ${sizeDiff}%)`);
  
  return formattedPath;
}

/**
 * 格式化快照内容
 */
function formatContent(content) {
  // 处理特定的格式模式
  
  // 1. 特别处理canggan数组中的对象
  content = content.replace(/{\s*\n\s*"?gan"?:\s*"([^"]+)",\s*\n\s*"?type"?:\s*"([^"]+)",\s*\n\s*"?shishen"?:\s*"([^"]+)"\s*\n\s*}/g, 
                          '{gan: "$1",type: "$2",shishen: "$3"},');
  
  // 2. 处理带有type、elements、result的对象 (两个元素)
  content = content.replace(/{\s*\n\s*"?type"?:\s*"([^"]+)",\s*\n\s*"?elements"?:\s*\[\s*\n\s*"([^"]+)",\s*\n\s*"([^"]+)",?\s*\n\s*\],\s*\n\s*"?result"?:\s*([^,\n\s}]+|"[^"]+"|\w+)\s*\n\s*}/g, 
                          '{type: "$1",elements: ["$2","$3",],result: $4},');
  
  // 3. 处理带有type、elements、result的对象 (三个元素)
  content = content.replace(/{\s*\n\s*"?type"?:\s*"([^"]+)",\s*\n\s*"?elements"?:\s*\[\s*\n\s*"([^"]+)",\s*\n\s*"([^"]+)",\s*\n\s*"([^"]+)",?\s*\n\s*\],\s*\n\s*"?result"?:\s*([^,\n\s}]+|"[^"]+"|\w+)\s*\n\s*}/g, 
                          '{type: "$1",elements: ["$2","$3","$4",],result: $5},');
  
  // 4. 通用处理多行数组对象
  content = content.replace(/{\s*\n(\s*)[^{}]*?\n\s*}/g, function(match) {
    // 将多行对象转换为单行，保留属性和值
    return match.replace(/\s*\n\s*/g, ' ');
  });
  
  // 5. 修正可能产生的额外逗号
  content = content.replace(/,\s*,/g, ',');
  
  return content;
}

/**
 * 查看快照文件内容
 */
function viewSnapshot(specificFile) {
  if (!specificFile) {
    console.log('请指定要查看的文件路径:');
    console.log('  node snapshotFormatter.js view [文件路径]');
    return;
  }
  
  const filePath = path.isAbsolute(specificFile) ? 
    specificFile : 
    path.join(process.cwd(), specificFile);
    
  if (!fs.existsSync(filePath)) {
    console.error(`错误：找不到指定的文件：${filePath}`);
    return;
  }
  
  // 读取并显示文件内容
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log('\n文件内容:');
  console.log('-----------------------------------');
  console.log(content);
  console.log('-----------------------------------');
  console.log(`文件大小: ${content.length} 字节`);
}

/**
 * 比较原始和格式化后的快照文件
 */
function compareSnapshots(specificFile) {
  if (!specificFile) {
    console.log('请指定要比较的文件路径:');
    console.log('  node snapshotFormatter.js compare [原始文件路径]');
    return;
  }
  
  const originalPath = path.isAbsolute(specificFile) ? 
    specificFile : 
    path.join(process.cwd(), specificFile);
    
  if (!fs.existsSync(originalPath)) {
    console.error(`错误：找不到指定的原始文件：${originalPath}`);
    return;
  }
  
  // 构造格式化文件路径
  const dir = path.dirname(originalPath);
  const basename = path.basename(originalPath, '.snap');
  const formattedPath = path.join(dir, `${basename}.formatted.snap`);
  
  if (!fs.existsSync(formattedPath)) {
    console.error(`错误：找不到格式化文件：${formattedPath}`);
    console.log('请先运行格式化命令:');
    console.log(`  node snapshotFormatter.js format ${specificFile}`);
    return;
  }
  
  // 读取文件内容
  const originalContent = fs.readFileSync(originalPath, 'utf-8');
  const formattedContent = fs.readFileSync(formattedPath, 'utf-8');
  
  // 比较文件大小
  const originalSize = originalContent.length;
  const formattedSize = formattedContent.length;
  const sizeDiff = ((originalSize - formattedSize) / originalSize * 100).toFixed(1);
  
  console.log('\n文件比较结果:');
  console.log('-----------------------------------');
  console.log(`原始文件: ${originalPath}`);
  console.log(`格式化文件: ${formattedPath}`);
  console.log(`原始大小: ${originalSize} 字节`);
  console.log(`格式化后大小: ${formattedSize} 字节`);
  console.log(`减少: ${sizeDiff}%`);
  console.log('-----------------------------------');
}

// 运行主函数
try {
  main();
} catch (error) {
  console.error('处理过程中发生错误:', error);
} 