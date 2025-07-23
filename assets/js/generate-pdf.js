const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // A4 size in pixels at 96 DPI
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2
    });

    console.log('Loading resume page...');
    await page.goto(`file://${path.resolve(__dirname, '../../_site/pdf-resume.html')}`, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Ensure content is loaded
    await page.waitForSelector('.resume-container');

    console.log('Generating PDF...');
    await page.pdf({
      path: path.resolve(__dirname, '../../assets/BM_resume.pdf'),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '2cm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    console.log('PDF generated successfully!');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();