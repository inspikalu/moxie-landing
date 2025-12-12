import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'public', 'preview');

async function capturePreview() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    await mkdir(screenshotsDir, { recursive: true });
    const page = await browser.newPage();
    
    // Desktop viewport
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    console.log('Navigating to landing page...');
    await page.goto('http://localhost:3002', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for animations to load
    await new Promise(r => setTimeout(r, 2000));

    // Scroll through the entire page to trigger all animations
    console.log('Scrolling through page to trigger animations...');
    
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 1080;
    let currentPosition = 0;
    
    while (currentPosition < scrollHeight) {
      await page.evaluate((y) => window.scrollTo(0, y), currentPosition);
      await new Promise(r => setTimeout(r, 300));
      currentPosition += viewportHeight / 2;
    }

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1000));

    // Capture hero
    console.log('Capturing hero...');
    await page.screenshot({
      path: join(screenshotsDir, 'hero.png'),
      fullPage: false,
    });

    // Capture features section
    await page.evaluate(() => window.scrollTo(0, 900));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: join(screenshotsDir, 'features.png'),
      fullPage: false,
    });

    // Capture full page
    console.log('Capturing full page...');
    await page.screenshot({
      path: join(screenshotsDir, 'full-page.png'),
      fullPage: true,
    });

    console.log('Screenshots captured successfully!');

  } catch (error) {
    console.error('Error capturing preview:', error);
  } finally {
    await browser.close();
  }
}

capturePreview();

