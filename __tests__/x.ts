import { initPuppeteer } from '../src/'
import { delay } from 'rambdax'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

test('', async () => {
  let b
  const {browser, page} = await initPuppeteer({
    headless:false,
    url: 'http://localhost:8080',
  })
  let a
  expect(
    1
  ).toBeTruthy()
})
