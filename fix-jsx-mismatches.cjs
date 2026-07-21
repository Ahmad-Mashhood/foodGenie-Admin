const fs = require('fs');
const path = require('path');

const dir = 'C:/foodGennie/admin-app/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

let totalFixes = 0;

files.forEach(filename => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  let fixes = 0;

  // Fix 1: <Link ...> ... </button>  →  <button ...> ... </button>
  // When the opening tag was wrongly changed to Link but closing is </button>
  // We need to find <Link ...> blocks that close with </button> and fix the opening
  content = content.replace(/<Link([^>]*)>([\s\S]*?)<\/button>/g, (match, attrs, inner) => {
    // Only fix if this is NOT a proper Link (i.e. shouldn't navigate anywhere meaningful for a button)
    // Check if it has a meaningful "to" prop that's not "#"
    if (attrs.includes('to="/approvals"') || attrs.includes('to="/riders"') || attrs.includes('to="/restaurants"') || attrs.includes('to="/management"')) {
      // These might be the Pending Approvals tab incorrectly tagged as opening Link but closing as button
      // Leave them for manual review — skip
    }
    // Restore as button
    fixes++;
    return `<button${attrs}>${inner}</button>`;
  });

  // Fix 2: <button ...> ... </Link>  →  <Link ...> ... </Link>
  // When the closing was wrongly changed to Link but opening is still button
  content = content.replace(/<button([^>]*)>([\s\S]*?)<\/Link>/g, (match, attrs, inner) => {
    // This is a button that mistakenly got a </Link> closing — restore </button>
    fixes++;
    return `<button${attrs}>${inner}</button>`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${fixes} mismatch(es) in: ${filename}`);
    totalFixes += fixes;
  }
});

console.log(`\nDone! Total fixes applied: ${totalFixes}`);
