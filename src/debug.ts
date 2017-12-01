import { initPuppeteer } from './'

async function debug(){
  const {browser, page} = await initPuppeteer({
    headless: false,
    url: 'https://ilearnsmarter.com/',
  })
  let x
}

debug()
