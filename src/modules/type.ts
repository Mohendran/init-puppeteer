import {
  delay,
  mapAsync,
  split,
} from 'rambdax'

export const type = async ({ page, text, selector }): Promise<Array<any>> => {
  await page.focus(selector)

  const textAsArray: Array<string> = split('', text)

  return mapAsync(async (char): Promise<void> => {
      await page.keyboard.sendCharacter(char)
      await delay(100)
  }, textAsArray)
}
