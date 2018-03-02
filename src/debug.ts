import { initPuppeteer } from './'
// tslint:disable
const GITHUB = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md'
const WEBPACK = 'http://localhost:8080'
const ILEARNSMARTER = 'https://ilearnsmarter.com/'

void async function debug() {
  try {

    const { browser, page } = await initPuppeteer({
      headless: false,
      url: GITHUB,
      waitCondition: {
        timeout: 5800,
        waitUntil: 'networkidle2',
      },
    })
    await page.keyboard.down('ArrowUp')
    await browser.close()
    let x
  } catch (e) {
    console.log(e)

  }
}()
// tslint:enable
