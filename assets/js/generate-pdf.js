const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2
    });

    console.log('Loading PDF template...');
    const templatePath = path.resolve(__dirname, '../../_site/pdf-resume.html');
    await page.goto(`file://${templatePath}`, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Wait for content to be rendered
    await page.waitForSelector('.main-content', { timeout: 5000 });

    console.log('Generating PDF...');
    await page.pdf({
      path: 'assets/BM_resume.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        bottom: '1cm',
        left: '1cm',
        right: '1cm'
      },
      preferCSSPageSize: true
    });

    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})().catch(console.error);