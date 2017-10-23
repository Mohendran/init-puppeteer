# Init-puppeteer

`yarn add https://github.com/selfrefactor/init-puppeteer#0.6.0`

```
const {initPuppeteer} = require('init-puppeteer')

const {
  page,
  browser
} = await initPuppeteer({
  headless: true,
  url: 'about:blank'
})
```