import {
  defaultTo,
} from 'rambdax'
import { clickModule } from './modules/clickModule'

import {
  InputPuppeteer,
  OutputPuppeteer,
  Resolution,
} from '../typings'
import * as constants from './modules/constants'
import { initPuppeteerModule } from './modules/initPuppeteerModule'
import { typeModule } from './modules/typeModule'

const defaultInput: InputPuppeteer = {
  headless: true,
  url: 'about:blank',
}
const defaultResolution: Resolution = { x: 1366, y: 768 }

export async function initPuppeteer(
  inputRaw: InputPuppeteer|undefined,
): Promise<OutputPuppeteer>{
  const input: InputPuppeteer = defaultTo(defaultInput, inputRaw)
  const resolution: Resolution = defaultTo(defaultResolution, input.resolution)
  const { browser, page } = await initPuppeteerModule({input, resolution})

  const condition = input.url === 'about:blank'

  const wait = condition ? constants.waitAboutBlank : constants.waitForNetwork

  await page.goto(input.url, wait)

  page.on('console', console.log)

  return {
    browser,
    clickModule,
    page,
    typeModule,
  }
}

export const waitForLoad = constants.waitForLoad
export const waitForNetwork = constants.waitForLoad
