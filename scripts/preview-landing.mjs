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
    await new Promise(r => setTimeout(r, 3000));

    console.log('Capturing hero section...');
    await page.screenshot({
      path: join(screenshotsDir, 'landing-hero.png'),
      fullPage: false,
    });

    // Scroll down and capture more sections
    await page.evaluate(() => window.scrollTo(0, 800));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: join(screenshotsDir, 'landing-features.png'),
      fullPage: false,
    });

    // Full page screenshot
    console.log('Capturing full page...');
    await page.screenshot({
      path: join(screenshotsDir, 'landing-full.png'),
      fullPage: true,
    });

    console.log('Preview screenshots captured successfully!');
    console.log(`Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('Error capturing preview:', error);
  } finally {
    await browser.close();
  }
}

capturePreview();

