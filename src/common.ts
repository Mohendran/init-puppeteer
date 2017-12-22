import { NavigationOptions } from 'puppeteer'

export const LONG_TIMEOUT = 50000
export const TIMEOUT = 5000
export const SHORT_TIMEOUT = 100

export const waitForNetwork: NavigationOptions = {
  timeout: TIMEOUT,
  waitUntil: 'networkidle0',
}

export const waitForTimeout = (ms): NavigationOptions => ({
  timeout: ms,
})

export const waitForLoad: NavigationOptions = {
  timeout: TIMEOUT,
  waitUntil: 'load',
}
