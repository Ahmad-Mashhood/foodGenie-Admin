const fs = require('fs');
const path = require('path');

const dir = 'C:/foodGennie/admin-app/src/pages';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.jsx')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Management tabs
        content = content.replace(/<button([^>]*)>\s*Customers\s*<\/button>/g, '<Link to="/management"$1>Customers</Link>');
        content = content.replace(/<button([^>]*)>\s*Riders\s*<\/button>/g, '<Link to="/riders"$1>Riders</Link>');
        content = content.replace(/<button([^>]*)>\s*Restaurants\s*<\/button>/g, '<Link to="/restaurants"$1>Restaurants</Link>');
        content = content.replace(/<button([^>]*)>([\s\S]*?)Pending Approvals([\s\S]*?)<\/button>/g, '<Link to="/approvals"$1>$2Pending Approvals$3</Link>');

        // Order tabs
        content = content.replace(/<button([^>]*)>\s*All Orders\s*<\/button>/g, '<Link to="/orders"$1>All Orders</Link>');
        content = content.replace(/<button([^>]*)>\s*Pending\s*<\/button>/g, '<Link to="/orders/pending-reverted"$1>Pending</Link>');
        content = content.replace(/<button([^>]*)>\s*Preparing\s*<\/button>/g, '<Link to="/orders/preparing"$1>Preparing</Link>');
        content = content.replace(/<button([^>]*)>\s*Out for Delivery\s*<\/button>/g, '<Link to="/orders/out-for-delivery"$1>Out for Delivery</Link>');
        content = content.replace(/<button([^>]*)>\s*Delivered\s*<\/button>/g, '<Link to="/orders/delivered"$1>Delivered</Link>');
        content = content.replace(/<button([^>]*)>\s*Cancelled\s*<\/button>/g, '<Link to="/orders/cancelled"$1>Cancelled</Link>');

        if (content !== originalContent) {
            // Ensure Link is imported if we added any Links
            if (!content.includes('import { Link }') && !content.includes('import {Link}')) {
                const importsEnd = content.lastIndexOf('import ');
                if (importsEnd !== -1) {
                    const endOfLine = content.indexOf('\n', importsEnd);
                    content = content.slice(0, endOfLine + 1) + "import { Link } from 'react-router-dom';\n" + content.slice(endOfLine + 1);
                } else {
                    content = "import { Link } from 'react-router-dom';\n" + content;
                }
            }
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated ' + file);
        }
    }
});
