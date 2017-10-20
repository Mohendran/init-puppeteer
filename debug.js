const {initPuppeteer} = require('./dist/index')
const R = require('rambdax')

async function fn(){
  console.log(0)
  const {
    page,
    browser
  } = await initPuppeteer({
    headless: true,
    url: 'about:blank'
  })

  console.log(1)
  await R.delay(2222)
  console.log(2)
  
}

fn()
