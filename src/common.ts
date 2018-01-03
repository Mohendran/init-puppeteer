import { NavigationOptions } from 'puppeteer'
import { GetWaitCondition } from '../typings'

export const LONG_TIMEOUT = 60000
export const TIMEOUT = 5000
export const SHORT_TIMEOUT = 100

export const waitForNetwork: NavigationOptions = {
  timeout: LONG_TIMEOUT,
  waitUntil: 'networkidle0',
}

export const getWaitCondition = (condition: GetWaitCondition): NavigationOptions => ({
  timeout: LONG_TIMEOUT,
  waitUntil: condition,
})

export const waitForTimeout = (ms): NavigationOptions => ({
  timeout: ms,
  waitUntil: 'networkidle0',
})
