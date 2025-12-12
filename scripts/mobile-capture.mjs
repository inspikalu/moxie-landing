import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'public', 'preview');

async function captureMobile() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    await mkdir(screenshotsDir, { recursive: true });
    const page = await browser.newPage();
    
    // iPhone 14 Pro viewport
    await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 3 });

    console.log('Navigating to landing page...');
    await page.goto('http://localhost:3002', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for animations
    await new Promise(r => setTimeout(r, 2000));

    // Scroll through to trigger animations
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    let currentPosition = 0;
    while (currentPosition < scrollHeight) {
      await page.evaluate((y) => window.scrollTo(0, y), currentPosition);
      await new Promise(r => setTimeout(r, 150));
      currentPosition += 400;
    }

    // Back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));

    // Capture hero
    console.log('Capturing mobile hero...');
    await page.screenshot({
      path: join(screenshotsDir, 'mobile-hero.png'),
      fullPage: false,
    });

    // Scroll to products
    await page.evaluate(() => {
      const el = document.getElementById('product');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 500));

    console.log('Capturing mobile products...');
    await page.screenshot({
      path: join(screenshotsDir, 'mobile-products.png'),
      fullPage: false,
    });

    // Full page
    console.log('Capturing mobile full page...');
    await page.screenshot({
      path: join(screenshotsDir, 'mobile-full.png'),
      fullPage: true,
    });

    console.log('Mobile screenshots captured!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureMobile();

