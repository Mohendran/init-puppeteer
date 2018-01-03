import { defaultTo } from 'rambdax'
import { clickModule } from './modules/clickModule'

import { NavigationOptions } from 'puppeteer'
import {
  ConditionMap,
  GetWaitCondition,
  InputPuppeteer,
  OutputPuppeteer,
  Resolution,
  WaitConditions,
} from '../typings'
import * as common from './common'
import { init } from './modules/init'
import { typeModule } from './modules/typeModule'

const defaultHeadless = true
const defaultURL = 'about:blank'
const webpackURL = 'http://localhost:8080'
const defaultResolution: Resolution = { x: 1366, y: 768 }

const defaultInput: InputPuppeteer = {
  headless: defaultHeadless,
  resolution: defaultResolution,
  url: defaultURL,
}

function getWait(url: string, waitCondition?: WaitConditions): NavigationOptions {
  const urlFlag: false | NavigationOptions = url === defaultURL ?
    common.waitForTimeout(common.SHORT_TIMEOUT) :
    url === webpackURL ?
      common.waitForTimeout(common.TIMEOUT) :
      false

  if (urlFlag === false && waitCondition === undefined) {
    return common.waitForNetwork
  }

  if (typeof waitCondition === 'string') {
    const conditionMap: ConditionMap = {
      DOM: 'domcontentloaded',
      LOAD: 'load',
      NETWORK: 'networkidle0',
    }

    const condition: GetWaitCondition = conditionMap[waitCondition] === undefined ?
      'load' :
      conditionMap[waitCondition]

    return common.getWaitCondition(condition)
  }

  return waitCondition
}

export async function initPuppeteer(
  inputRaw: InputPuppeteer | undefined,
): Promise<OutputPuppeteer> {
  try {
    const inputValue: InputPuppeteer = defaultTo(defaultInput, inputRaw)

    const resolution: Resolution = defaultTo(defaultResolution, inputValue.resolution)
    const url = defaultTo(defaultURL, inputValue.url)
    const headless = defaultTo(defaultHeadless, inputValue.headless)
    const waitCondition = inputRaw.waitCondition

    const input: InputPuppeteer = {
      headless,
      resolution,
      url,
      waitCondition,
    }

    var { browser, page } = await init({ input, resolution })

    const wait = getWait(input.url, input.waitCondition)

    await page.goto(input.url, wait)

    page.on('console', console.log)

    return {
      browser,
      clickModule,
      page,
      typeModule,
    }
  } catch (error) {
    if (page !== undefined && page.close !== undefined) {

      const screenshotPath = `${__dirname}/${Date.now()}.png`
      await page.screenshot({
        fullPage: true,
        path: screenshotPath,
      })
      console.log('screenshotPath', screenshotPath)
      error.screen = screenshotPath

      await browser.close()
    }

    throw error
  }
}

export const waitForTimeout = common.waitForTimeout
export const waitForNetwork = common.waitForNetwork
export const LONG_TIMEOUT = common.LONG_TIMEOUT
export const SHORT_TIMEOUT = common.SHORT_TIMEOUT
export const TIMEOUT = common.TIMEOUT
