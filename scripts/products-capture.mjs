import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'public', 'preview');

async function captureProducts() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    await mkdir(screenshotsDir, { recursive: true });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    console.log('Navigating to landing page...');
    await page.goto('http://localhost:3002', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Scroll through to trigger animations
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    let currentPosition = 0;
    while (currentPosition < scrollHeight) {
      await page.evaluate((y) => window.scrollTo(0, y), currentPosition);
      await new Promise(r => setTimeout(r, 200));
      currentPosition += 500;
    }

    // Navigate to products section
    await page.evaluate(() => {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 1000));

    // Capture products section
    console.log('Capturing products section...');
    await page.screenshot({
      path: join(screenshotsDir, 'products-section.png'),
      fullPage: false,
    });

    console.log('Done!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureProducts();

