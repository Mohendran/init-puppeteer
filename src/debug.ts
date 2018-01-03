import { initPuppeteer } from './'

const GITHUB = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md'
const WEBPACK = 'http://localhost:8080'
const ILEARNSMARTER = 'https://ilearnsmarter.com/'

async function debug() {
  try {

    const { browser, page } = await initPuppeteer({
      headless: false,
      url: ILEARNSMARTER,
      waitCondition: {
        timeout: 1800,
        waitUntil: 'networkidle0',
      },
    })
    let x
  } catch (e) {
    console.log(e)

  }
}

debug()
