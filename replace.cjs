const fs = require('fs');
const path = require('path');

const dir = 'C:/foodGennie/admin-app/src/pages';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.jsx')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        if (content.includes('<a ') || content.includes('<a>')) {
            content = content.replace(/<a\b/g, '<Link');
            content = content.replace(/<\/a>/g, '</Link>');
            content = content.replace(/href=/g, 'to=');
            
            if (!content.includes('import { Link }') && !content.includes('import {Link}')) {
                const importsEnd = content.lastIndexOf('import ');
                if (importsEnd !== -1) {
                    const endOfLine = content.indexOf('\n', importsEnd);
                    content = content.slice(0, endOfLine + 1) + "import { Link } from 'react-router-dom';\n" + content.slice(endOfLine + 1);
                } else {
                    content = "import { Link } from 'react-router-dom';\n" + content;
                }
            }
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated ' + file);
        }
    }
});
