import {
  defaultTo,
} from 'rambdax'
import { clickModule } from './modules/clickModule'

import {
  IInput,
  IOutput,
  IResolution,
} from '../typings'
import * as constants from './modules/constants'
import { initPuppeteerModule } from './modules/initPuppeteerModule'
import { typeModule } from './modules/typeModule'

const defaultInput: IInput = {
  headless: true,
  url: 'about:blank',
}

export async function initPuppeteer(
  inputRaw: IInput|undefined,
): Promise<IOutput>{
  const input: IInput = defaultTo(defaultInput, inputRaw)
  const resolutionValue: IResolution = { x: 1366, y: 768 }
  const resolution: IResolution = defaultTo(resolutionValue, input.resolution)
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
