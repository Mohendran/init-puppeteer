import { launch } from 'puppeteer'
import { IPuppeteer, IPuppeteerSettings, IResolution } from '../typings'
import {getSettings} from './getSettings'

export async function initPuppeteerModule(input: IResolution): Promise<IPuppeteer> {
  const settings: IPuppeteerSettings = getSettings(input)
  const browser = await launch(settings)
  const page = await browser.newPage()
  await page.setViewport({
    height: input.y,
    width: input.x,
  })

  return { browser, page }
}
