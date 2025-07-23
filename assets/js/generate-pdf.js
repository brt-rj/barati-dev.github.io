const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    
    const htmlFile = path.join(process.cwd(), '_site', 'pdf-resume.html');
    console.log('Loading:', htmlFile);
    
    await page.goto(`file://${htmlFile}`, {
      waitUntil: 'networkidle0'
    });
    
    const pdfPath = path.join(process.cwd(), '_site', 'assets', 'BM_resume.pdf');
    console.log('Generating PDF:', pdfPath);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
      printBackground: true
    });
    
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('PDF generation failed:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();