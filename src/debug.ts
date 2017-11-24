import { initPuppeteer } from './'

async function debug(){
  let x
  const {browser, page} = await initPuppeteer({
    headless: false,
    url: 'https://ilearnsmarter.com/',
  })
}

debug()
