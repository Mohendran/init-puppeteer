import { initPuppeteer } from './'

const GITHUB = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md'
const WEBPACK = 'http://localhost:8080'
const ILEARNSMARTER = 'https://ilearnsmarter.com/'

async function debug() {
  console.time('x')
  const { browser, page } = await initPuppeteer({
    headless: false,
    url: ILEARNSMARTER,
    waitCondition: {
      timeout: 180000,
      waitUntil: 'networkidle2',
    },
  })
  console.timeEnd('x')
  let x
}

debug()
