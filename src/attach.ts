import { delay } from 'rambdax'
import { Page } from 'puppeteer'
import { AttachOutput } from '../typings'

const STEP_DELAY = Number(process.env.STEP_DELAY || '0')
const DELAY = 200

export function attach (page: Page): AttachOutput {
  const holder = []
  const mark = (operation: string, selector: any, additional?: any) => {
    if(holder.length === 10){
      holder.shift()
    }

    const x = additional === undefined ?
      {selector, operation} :
      {selector, operation, additional}

    holder.push(x)
  }

  
  const $ = async (selector, fn, ...args) => {
    mark('$',selector)

    const result = await page.$eval(selector, fn, ...args)
    await delay(STEP_DELAY)

    return result
  }
  
  const $$ = async (selector, fn, ...args) => {
    mark('$$',selector)

    const result = await page.$$eval(selector, fn, ...args)
    await delay(STEP_DELAY)

    return result
  }

  const waitFor = async (selectorInput, countInput = 1) => {
    const {selector, count} = typeof selectorInput === 'object' ?
      selectorInput :
      {selector: selectorInput, count: countInput}

    mark('waitFor',selector, count)

    let counter = 15
    const countFn = page.$$eval(
      selector,
      (els, countValue) => els.length >= countValue,
      count
    )
    let found = await countFn

    while (!found && counter > 0) {
      counter -= 1
      await delay(DELAY)
      found = await countFn
    }

    return found
  }
  
  const waitForSelectors = async (...selectors) => {
    mark('waitForSelectors',`[${selectors.toString()}]`)
    
    const promised = selectors.map(singleSelector => waitFor(singleSelector))
    const result = await Promise.all(promised)

    return !result.includes(false)
  }

  const url = () => {
    mark('url', '')

    return page.evaluate(() => window.location.href)
  }

  const focus = async (selector) => {
    mark('focus', selector)

    await $(selector, el => el.focus())

    return true
  }

  const count = (selector) => {
    mark('count', selector)

    return page.$$eval(selector, els => els.length)
  }

  const exists = (selector) => {
    mark('exists', selector)

    return page.$$eval(selector, els => els.length > 0)
  }

  const click = async (selectorInput, indexInput) => {
    const { selector, index } = typeof selectorInput === 'object' ? 
      selectorInput : 
      { selector: selectorInput, index: indexInput }

    mark('click', selector, index)
      
    if (index === undefined) {
      if (await exists(selector) === false) {
        return false
      }
      await $(selector, el => el.click())

      return true
    }

    await $$(selector, clickWhichSelector, index)

    return true
  }

  const clickWithText = async (selector, text) => {
    mark('clickWithText', selector, text)
    
    if (await exists(selector) === false) {
      return false
    }
    await $$(selector, clickWithTextFn, text)

    return true
  }

  const clickWithPartialText = async (selector, text) => {
    mark('clickWithPartialText', selector, text)
    
    if (await exists(selector) === false) {
      return false
    }

    await $$(selector, clickWithPartialTextFn, text)

    return true
  }

  const waitAndClick = async input => {
    mark('waitAndClick', input)
    
    if(await waitFor(input.selector, input.index + 1) === false){
      return false
    }

    return click(input.selector, input.index)
  }

  const fill = async (selector, text) => {
    mark('fill', selector, text)

    await focus(selector)
    await page.keyboard.type(text, { delay: 50 })
  }

  const setInput = async (selector, newValue) => {
    mark('setInput', selector, newValue)

    if (await exists(selector) === false) {

      return false
    }

    await page.$eval(selector, setInputFn, newValue)

    return true
  }

  const onError = () => {
    holder.forEach(x => console.log(x))
  }

  return {
    $$,
    $,
    click,
    clickWithText,
    clickWithPartialText,
    count,
    exists,
    fill,
    focus,
    onError,
    page,
    url,
    setInput,
    waitFor,
    waitAndClick,
    waitForSelectors
  }
}


function clickWhichSelector (els, i) {
  const convertIndex = (x, length) => 
    typeof x === 'number' ? 
      x : 
        x === 'last' ? 
          length - 1
          : 0

  const index = convertIndex(i, els.length)

  if (index >= els.length) {

    return false
  }

  els[index].click()

  return true
}

function clickWithTextFn (els, text) {
  const filtered = els.filter(x => x.textContent === text)

  if (filtered.length === 0) {
    return false
  }
  filtered[0].click()

  return true
}

function clickWithPartialTextFn (els, text) {
  const filtered = els.filter(x => x.textContent.includes(text))

  if (filtered.length === 0) {
    return false
  }
  filtered[0].click()

  return true
}

function setInputFn (el, newValue) {
  el.value = newValue
}

