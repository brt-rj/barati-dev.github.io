const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Serve the built site locally or open the file directly
  const filePath = path.resolve(__dirname, '../../_site/index.html');
  if (!fs.existsSync(filePath)) {
    console.error('Built site not found at', filePath);
    process.exit(1);
  }
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: '../../assets/BM_resume.pdf',
    format: 'A4',
    printBackground: true
  });

  await browser.close();
  console.log('PDF generated at assets/BM_resume.pdf');
})(); 