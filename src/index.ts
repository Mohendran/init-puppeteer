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

export async function initPuppeteer(input: IInput): Promise<IOutput>{
  const resolutionValue: IResolution = { x: 1366, y: 768 }
  const resolution: IResolution = defaultTo(resolutionValue, input.resolution)
  var { browser, page } = await initPuppeteerModule({input, resolution})
  await page.goto(input.url, constants.waitForNetwork)

  return {
    browser,
    clickModule,
    page,
    typeModule,
  }
}

export const waitForLoad = constants.waitForLoad
export const waitForNetwork = constants.waitForLoad
