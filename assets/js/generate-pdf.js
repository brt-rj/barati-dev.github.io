const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  // Set viewport to A4 size
  await page.setViewport({
    width: 794, // A4 width in pixels at 96 DPI
    height: 1123, // A4 height
    deviceScaleFactor: 2 // For better resolution
  });

  await page.goto('file://' + path.resolve(__dirname, '../../_site/pdf-resume.html'), {
    waitUntil: 'networkidle0'
  });

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

  await browser.close();
  console.log('PDF generated successfully');
})().catch(console.error);