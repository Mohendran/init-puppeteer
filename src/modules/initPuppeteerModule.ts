import { launch } from 'puppeteer'
import {
  IInitPuppeteer,
  IPuppeteer,
  IPuppeteerSettings,
} from '../typings'
import {getSettings} from './getSettings'

export async function initPuppeteerModule(input: IInitPuppeteer): Promise<IPuppeteer> {
  const settings: IPuppeteerSettings = getSettings(input)
  const browser = await launch(settings)
  const page = await browser.newPage()
  await page.setViewport({
    height: input.resolution.y,
    width: input.resolution.x,
  })

  return { browser, page }
}
