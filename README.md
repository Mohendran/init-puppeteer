# Init-puppeteer

It starts a `Puppeteer` instance for you and gives you reference to its `page` and `browser` methods. 

You can pass `headless`, `url` and `resolution` as settings.

## Install

`yarn add https://github.com/selfrefactor/init-puppeteer#0.6.0`

## Example

```typescript
const { initPuppeteer } = require('init-puppeteer')

function fn(xx){

  return xx.length
  // return xx.a.b
}

void async function debug() {
  try {
    var { browser, page, $$, catchError } = await initPuppeteer({
      headless: false,
      logFlag: false,
      screenOnError:'CLOUD',
      url: ILEARNSMARTER,
      waitCondition: {
        timeout: 5800,
        waitUntil: 'networkidle2',
      },
    })
    const x = await $$('div', {fn})

    await browser.close()
  } catch (e) {
    e = await catchError(e)
    console.log(e.screen)
  }
}()
```

## Typescript example

```typescript
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

## output.catchError

It takes a screenshot and returns its local or Imgur path. Turned off by default