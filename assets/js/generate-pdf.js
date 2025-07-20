const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Serve the built site locally or open the file directly
  const filePath = path.resolve(__dirname, '../../_site/resume/index.html');
  if (!fs.existsSync(filePath)) {
    console.error('Built site not found at', filePath);
    process.exit(1);
  }
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

  // Get the bounding box of the .resume-container
  const resumeContainer = await page.$('.resume-container');
  if (!resumeContainer) {
    console.error('Could not find .resume-container on the page.');
    await browser.close();
    process.exit(1);
  }
  const boundingBox = await resumeContainer.boundingBox();

  await page.pdf({
    path: 'assets/BM_resume.pdf',
    printBackground: true,
    width: boundingBox.width + 'px',
    height: boundingBox.height + 'px',
    pageRanges: '1',
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height
    }
  });

  await browser.close();
  console.log('PDF generated at assets/BM_resume.pdf');
})(); 