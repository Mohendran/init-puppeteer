import { NavigationOptions } from 'puppeteer'

export const TIMEOUT = 50000
const SHORT_TIMEOUT = 100

export const waitForNetwork: NavigationOptions = {
  timeout: TIMEOUT,
  waitUntil: 'networkidle0',
}

export const waitAboutBlank: NavigationOptions = {
  timeout: SHORT_TIMEOUT,
}

export const waitForLoad: NavigationOptions = {
  timeout: TIMEOUT,
  waitUntil: 'load',
}
