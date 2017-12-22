import { launch } from 'puppeteer'
import {
  InitPuppeteer,
  PuppeteerInstance,
  PuppeteerSettings,
} from '../../typings'
import { getSettings } from './getSettings'

export async function init(
  input: InitPuppeteer,
): Promise<PuppeteerInstance> {
  try {
    const settings: PuppeteerSettings = getSettings(input)
    const browser = await launch(settings)
    const page = await browser.newPage()

    await page.setViewport({
      height: input.resolution.y,
      width: input.resolution.x,
    })

    return { browser, page }
  } catch (err) {
    throw err
  }
}
