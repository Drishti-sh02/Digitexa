const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // For GSAP scrollTrigger (multiline and single line)
  content = content.replace(/scrollTrigger:\s*\{\s*trigger:\s*([^,]+),\s*start:\s*([^,}\n]+)\s*\}/g, 'scrollTrigger: { trigger: $1, start: $2, once: true }');
  content = content.replace(/scrollTrigger:\s*\{\s*trigger:\s*([^,]+),\s*start:\s*([^,}\n]+),?\s*\n\s*\}/g, 'scrollTrigger: { trigger: $1, start: $2, once: true }');
  
  // For framer-motion whileInView without viewport
  content = content.replace(/whileInView=([^\s]+)(?![^>]*viewport=)/g, 'whileInView=$1 viewport={{ once: true, margin: "-50px" }}');

  // Also add lazy loading and decoding to imgs (basic, doesn't handle all Edge cases but good enough)
  content = content.replace(/<img(?![^>]*loading=)([^>]+)>/g, '<img loading="lazy" decoding="async"$1>');
  
  // Transform GPU for blurs
  content = content.replace(/blur-\[([^\]]+)\]/g, 'blur-[$1] transform-gpu');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
    updatedCount++;
  }
});

console.log('Updated ' + updatedCount + ' files.');
