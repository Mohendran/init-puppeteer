import { initPuppeteer } from './'

async function debug(){
  const {browser, page} = await initPuppeteer({
    headless: false,
    url: 'http://localhost:8080',
    // url: 'https://ilearnsmarter.com/',
  })
  let x
}

debug()
