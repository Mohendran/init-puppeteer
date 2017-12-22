import {
  defaultTo,
} from 'rambdax'
import { clickModule } from './modules/clickModule'

import {
  InputPuppeteer,
  OutputPuppeteer,
  Resolution,
} from '../typings'
import { init } from './modules/init'
import { typeModule } from './modules/typeModule'
import { NavigationOptions } from 'puppeteer';
import * as common from './common'

const defaultHeadless = true
const defaultURL = 'about:blank'
const webpackURL = 'http://localhost:8080'
const defaultResolution: Resolution = { x: 1366, y: 768 }

const defaultInput: InputPuppeteer = {
  headless: defaultHeadless,
  resolution: defaultResolution,
  url: defaultURL,
}

function getWait(url: string): NavigationOptions {
  switch (url) {
    case defaultURL:
      return common.waitForTimeout(common.SHORT_TIMEOUT)
    case webpackURL:
      return common.waitForTimeout(common.TIMEOUT)
    default:
      return common.waitForNetwork
  }
}

export async function initPuppeteer(
  inputRaw: InputPuppeteer | undefined,
): Promise<OutputPuppeteer> {
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

    const { browser, page } = await init({ input, resolution })

    const wait = getWait(input.url)

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

export const waitForLoad = common.waitForLoad
export const waitForTimeout = common.waitForTimeout
export const waitForNetwork = common.waitForLoad
export const LONG_TIMEOUT = common.LONG_TIMEOUT
export const SHORT_TIMEOUT = common.SHORT_TIMEOUT
export const TIMEOUT = common.TIMEOUT
