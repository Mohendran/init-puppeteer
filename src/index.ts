import * as log from 'log-fn'
import { Response } from 'puppeteer'
import {
  defaultTo,
  partialCurry,
} from 'rambdax'
import { click } from './modules/click'
import {
  waitForLoad,
  waitForNetwork,
 } from './modules/constants'
import { initPuppeteerModule } from './modules/initPuppeteerModule'
import { typeModule } from './modules/typeModule'
import {
  IInput,
  IOutput,
  IResolution,
} from './typings'

export async function initPuppeteer(input: IInput): Promise<IOutput>{
  const resolutionValue: IResolution = { x: 1366, y: 768 }
  const resolution: IResolution = defaultTo(resolutionValue, input.resolution)
  var { browser, page } = await initPuppeteerModule(resolution)
  await page.goto(input.url, waitForNetwork)

  return {
    browser,
    page,
    typeModule,
  }
}
