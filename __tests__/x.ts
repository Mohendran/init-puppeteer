import { delay } from 'rambdax'
import { initPuppeteer } from '../src/'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

test('', async () => {
  const {browser, page} = await initPuppeteer({
    headless: false,
    url: 'https://github.com/selfrefactor/',
  })
  let a
  expect(
    1
  ).toBeTruthy()
})
