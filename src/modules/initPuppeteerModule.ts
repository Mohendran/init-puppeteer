import { launch } from 'puppeteer'
import {
  InitPuppeteer,
  PuppeteerInstance,
  PuppeteerSettings,
} from '../../typings'
import {getSettings} from './getSettings'

export async function initPuppeteerModule(
  input: InitPuppeteer,
): Promise<PuppeteerInstance> {
  const settings: PuppeteerSettings = getSettings(input)
  const browser = await launch(settings)
  const page = await browser.newPage()
  await page.setViewport({
    height: input.resolution.y,
    width: input.resolution.x,
  })

  return { browser, page }
}
