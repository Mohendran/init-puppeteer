import {
  delay,
  mapAsync,
  split,
} from 'rambdax'
import { TypeFunction } from '../../typings'

export const typeModule: TypeFunction = async input => {
  await input.page.focus(input.selector)

  const textAsArray: Array<string> = split('', input.text)

  return mapAsync(async (char): Promise<void> => {
    await input.page.keyboard.sendCharacter(char)
    await delay(100)
  }, textAsArray)
}
