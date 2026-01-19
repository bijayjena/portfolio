import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redirectsContent = '/*  /index.html  200';
const distDir = path.join(__dirname, 'dist');
const redirectsPath = path.join(distDir, '_redirects');

try {
    if (fs.existsSync(distDir)) {
        fs.writeFileSync(redirectsPath, redirectsContent);
        console.log('_redirects file generated successfully in dist folder.');
    } else {
        console.error('Error: dist directory not found. Please run the build script first.');
        process.exit(1);
    }
} catch (error) {
    console.error('Error generating _redirects file:', error);
    process.exit(1);
}
