# Init-puppeteer

It starts a `Puppeteer` instance for you and gives you reference to its `page` and `browser` methods. 

You can pass `headless`, `url` and `resolution` as settings.


## Install
`yarn add https://github.com/selfrefactor/init-puppeteer#0.6.0`

## Example
```
const { initPuppeteer } = require('init-puppeteer')
async function fn(){
  const {
    page,
    browser
  } = await initPuppeteer()
  // WORK
  await browser.close()
}
```

## Typescript example

```
import { initPuppeteer } from 'init-puppeteer'
import {
  InputPuppeteer,
  OutputPuppeteer,
} from 'init-puppeteer/typings'

async function fn(): Promise<void>{
  try{
      const settings: InputPuppeteer = {
        headless: true,
        url: 'about:blank',
      }

      var { browser, page }: OutputPuppeteer = await initPuppeteer(settings)
      // WORK
      return
     }catch (err){
    console.log(err)
  }finally{
    console.log('closing Chrome')
    if (browser !== undefined){
      await browser.close()
    }
  }
}
```

## input.waitCondition

Could be a string among `LOAD, NETWORK, DOM`. In this case timeout is 60 seconds.

It can be also Puppeteer's `NavigationOptions` in which case `input.waitCondition` will passed directly to `page.goto`.