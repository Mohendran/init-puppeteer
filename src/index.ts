import {
  defaultTo,
} from 'rambdax'
import { clickModule } from './modules/clickModule'

import {
  InputPuppeteer,
  OutputPuppeteer,
  Resolution,
} from '../typings'
import * as constants from './constants'
import { initPuppeteerModule } from './modules/initPuppeteerModule'
import { typeModule } from './modules/typeModule'

const defaultHeadless = true
const defaultURL = 'about:blank'
const defaultResolution: Resolution = { x: 1366, y: 768 }

const defaultInput: InputPuppeteer = {
  headless: defaultHeadless,
  resolution: defaultResolution,
  url: defaultURL,
}

export async function initPuppeteer(
  inputRaw: InputPuppeteer|undefined,
): Promise<OutputPuppeteer>{
  try {
    const inputValue: InputPuppeteer = defaultTo(defaultInput, inputRaw)

    const resolution: Resolution = defaultTo(defaultResolution, inputValue.resolution)
    const url = defaultTo(defaultURL, inputValue.url)
    const headless = defaultTo(defaultHeadless, inputValue.headless)

    const input: InputPuppeteer = {
      headless,
      resolution,
      url,
    }

    const { browser, page } = await initPuppeteerModule({input, resolution})

    const wait = input.url === defaultURL ?
      constants.waitForTimeout :
      constants.waitForNetwork

    await page.goto(input.url, wait)

    page.on('console', console.log)

    return {
      browser,
      clickModule,
      page,
      typeModule,
    }
  } catch (error) {
    throw error
  }
}

export const waitForLoad = constants.waitForLoad
export const waitForNetwork = constants.waitForLoad
