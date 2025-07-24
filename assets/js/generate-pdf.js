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

    // Change this:
    // const htmlPath = path.join(process.cwd(), '_site', 'pdf-resume.html');
    // To this:
    const htmlPath = path.join(process.cwd(), '_site', 'pdf-resume', 'index.html');
    console.log('Loading resume from:', htmlPath);
    
    await page.goto(`file://${htmlPath}`, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Wait for content to be rendered
    await page.waitForSelector('.resume-container', { timeout: 20000 });

    const pdfPath = path.join(process.cwd(), '_site', 'assets', 'BM_resume.pdf');
    console.log('Generating PDF at:', pdfPath);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1.5cm',
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm'
      },
      preferCSSPageSize: true
    });

    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();