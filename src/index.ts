import {
  ConditionMap,
  GetWaitCondition,
  InputPuppeteer,
  OutputPuppeteer,
  Resolution,
  WaitConditions,
} from '../typings'
import * as common from './common'

import { NavigationOptions } from 'puppeteer'
import { defaultTo, delay } from 'rambdax'

import { takeScreenshot } from './modules/takeScreenshot'
import { init } from './modules/init'

import { attach as attachModule } from './attach'

const defaultURL = 'about:blank'
const webpackURL = 'http://localhost:8080'
const defaultResolution: Resolution = { x: 1366, y: 768 }

const defaultInput: InputPuppeteer = {
  headless: true,
  logFlag: false,
  resolution: defaultResolution,
  screenOnError: 'OFF',
  url: defaultURL,
  waitCondition: common.waitForNetwork,
}

function getWait(
  url: string,
  waitCondition?: WaitConditions,
): NavigationOptions {
  const urlFlag = url === defaultURL ?
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

    const answer = conditionMap[waitCondition] === undefined

    const condition: GetWaitCondition = answer ?
      'load' :
      conditionMap[waitCondition]

    return common.getWaitCondition(condition)
  }

  return waitCondition
}

const DELAY = Number(defaultTo('0', process.env.STEP_DELAY))

export async function initPuppeteer(
  inputRaw: InputPuppeteer | undefined,
): Promise<OutputPuppeteer> {
  try {
    var input: InputPuppeteer = {
      ...defaultInput,
      ...defaultTo({}, inputRaw),
    }

    var { browser, page } = await init(input)

    const wait = getWait(input.url, input.waitCondition)

    await page.goto(input.url, wait)

    if(input.logFlag){
      page.on('console', log)
    }

    const catchError = async (e: any) => {
      if (page !== undefined && page.close !== undefined) {
        e.screen = await takeScreenshot(
          page, 
          input.screenOnError
        )
        
        await browser.close()
      }

      return e
    }

    return {
      browser,
      catchError,
      page,
    }
  } catch (error) {
    if (page !== undefined && page.close !== undefined) {
      error.screen = await takeScreenshot(page, input.screenOnError)
      console.log('screenshotPath', error.screen)
      
      await browser.close()
    }

    throw error
  }
}

function log (input) {
  if (input._type === 'log') {
    console.log(input._text)
  }
}

export const waitForTimeout = common.waitForTimeout
export const waitForNetwork = common.waitForNetwork
export const LONG_TIMEOUT = common.LONG_TIMEOUT
export const SHORT_TIMEOUT = common.SHORT_TIMEOUT
export const TIMEOUT = common.TIMEOUT
export const attach = attachModule
