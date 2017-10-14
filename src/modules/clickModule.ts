import {ClickFunction} from '../typings'

const click = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement
  if (element === null) {
    throw `cannot click element with selector '${selector}'`
  }
  element.click()
}

export const clickModule: ClickFunction = async input =>
  input.page.evaluate(click, input.selector)
