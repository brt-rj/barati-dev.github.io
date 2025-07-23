const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    console.log('Current directory:', process.cwd());
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--font-render-hinting=none'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794, // A4 width in pixels
      height: 1123,
      deviceScaleFactor: 2
    });

    const htmlPath = path.join(process.cwd(), '_site', 'pdf-resume', 'index.html');
    console.log('Loading resume from:', htmlPath);
    
    await page.goto(`file://${htmlPath}`, {
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000
    });

    // Wait for content to be fully rendered
    await page.waitForSelector('.resume-container', { timeout: 10000 });

    const outputPath = path.join(process.cwd(), '_site', 'assets', 'BM_resume.pdf');
    console.log('Generating PDF at:', outputPath);

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' }
    });

    console.log('PDF generated successfully');
  } catch (error) {
    console.error('PDF generation failed:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();