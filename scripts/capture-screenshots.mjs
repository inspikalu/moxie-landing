import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'public', 'screenshots');

async function captureScreenshots() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Create screenshots directory
    await mkdir(screenshotsDir, { recursive: true });

    const page = await browser.newPage();
    
    // Set viewport for desktop
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    // Navigate to trade page
    console.log('Navigating to trade page...');
    await page.goto('http://localhost:3000/trade', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for the page to fully render
    await page.waitForSelector('.trading-panel', { timeout: 10000 }).catch(() => {
      console.log('Trading panel not found, continuing anyway...');
    });

    // Wait a bit for animations
    await new Promise(r => setTimeout(r, 2000));

    // Take main trading screenshot
    console.log('Capturing trading interface...');
    await page.screenshot({
      path: join(screenshotsDir, 'trading-interface.png'),
      fullPage: false,
    });

    // Capture just the chart area if possible
    const chartElement = await page.$('.trading-panel');
    if (chartElement) {
      await chartElement.screenshot({
        path: join(screenshotsDir, 'chart-panel.png'),
      });
    }

    // Navigate to discover page
    console.log('Navigating to discover page...');
    await page.goto('http://localhost:3000/discover', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({
      path: join(screenshotsDir, 'discover-interface.png'),
      fullPage: false,
    });

    // Mobile viewport screenshot
    console.log('Capturing mobile view...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/trade', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({
      path: join(screenshotsDir, 'mobile-trading.png'),
    });

    console.log('Screenshots captured successfully!');
    console.log(`Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();

