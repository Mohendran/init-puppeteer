import { initPuppeteer } from './'
// tslint:disable
const GITHUB = 'https://github.com'
const WEBPACK = 'http://localhost:8080'
const ILEARNSMARTER = 'https://ilearnsmarter.com/'


void async function debug() {
  try {
    var { browser, page, catchError } = await initPuppeteer({
      headless: false,
      logFlag: false,
      screenOnError:'CLOUD',
      url: ILEARNSMARTER,
      waitCondition: {
        timeout: 5800,
        waitUntil: 'networkidle2',
      },
    })
    const x = await page.$$eval('div', els => els.length)
    
    await browser.close()
  } catch (e) {
    e = await catchError(e)
    console.log(e.screen)
  }
}()
// tslint:enable
// await page.keyboard.down('ArrowUp')
