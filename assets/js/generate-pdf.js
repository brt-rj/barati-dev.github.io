const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    // Debug logging
    console.log('Current working directory:', process.cwd());
    
    // Verify file exists before proceeding
    const htmlPath = path.resolve(process.cwd(), '_site/pdf-resume.html');
    console.log('Looking for HTML file at:', htmlPath);
    
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found at ${htmlPath}`);
    }

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1553 });

    console.log('Loading resume page...');
    await page.goto(`file://${htmlPath}`, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000
    });

    // Wait for content to be rendered
    await page.waitForSelector('.resume-container', { timeout: 10000 });

    // Ensure output directory exists
    const pdfDir = path.resolve(process.cwd(), 'assets');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    console.log('Generating PDF...');
    await page.pdf({
      path: path.resolve(pdfDir, 'BM_resume.pdf'),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    console.log('PDF generated successfully!');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();