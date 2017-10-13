import { launch } from 'puppeteer'
import { IPuppeteer } from '../custom'
import {getSettings} from './getSettings'

export async function initPuppeteer(): Promise<IPuppeteer> {
  const resolutionValue: IResolution = { x: 1366, y: 768 }
  const settings: IPuppeteerSettings = getSettings(resolutionValue)
  const browser = await launch(settings)
  const page = await browser.newPage()
  await page.setViewport({
    height: resolutionValue.y,
    width: resolutionValue.x,
  })

  return { browser, page }
}
