import { Browser, Page, NavigationOptions } from 'puppeteer'

type GetWaitCondition = 'load' | 'domcontentloaded' | 'networkidle0'

type WaitConditions = 'LOAD' | 
  'NETWORK' | 
  'DOM' |
  NavigationOptions

interface ConditionMap{
  [key: string]: GetWaitCondition
}  
type ScreenOnError = 'OFF' | 'CLOUD' | 'LOCAL'

interface InputPuppeteer{
  resolution?: Resolution
  url?: string
  headless?: boolean
  waitCondition?: WaitConditions
  logFlag?: boolean
  screenOnError?: ScreenOnError 
}

interface Fn{
  [key: string]: Function
}

type Attach = (page: Page) => AttachOutput

interface Selector{
  index: number
  selector: string
}

interface AttachOutput{
  $$: (selector: string, fn: Function, args?: string[]) => Promise<any>
  $: (selector: string, fn: Function, args?: string[]) => Promise<any>
  click: (selector: string, index?: number|string) => Promise<boolean>
  clickWithPartialText: (selector: string, text: string) => Promise<boolean>
  clickWithText: (selector: string, text: string) => Promise<boolean>
  count: (selector: string) => Promise<number>
  exists: (selector: string) => Promise<boolean>
  fill(selector: string, text: string): void
  focus: (selector: string) => Promise<boolean>
  onError: () => void
  page: Page
  url: () => Promise<string>
  setInput: (selector: string, newValue: string) => Promise<boolean>
  waitFor: (selector: string, count?: number) => Promise<boolean>
  waitAndClick: (input: Selector) => Promise<boolean>
  waitForSelectors: (selectors: string[]) => Promise<boolean>
}

interface OutputPuppeteer{
  page: Page
  browser: Browser
  catchError: (e: any) => Promise<any>
}

interface PuppeteerInstance {
  browser: Browser
  page: Page
}

interface Resolution {
  x: number
  y: number
}

interface PuppeteerSettings{
  args: Array<string>
  handleSIGINT: false
  headless: boolean
}

interface TypeSettings{
  selector: string
  text: string
}

type TypeModule = (input: ITypeModule) => Promise<Array<void>>
type ClickModule = (input: IClickModule) => Promise<void>

interface ITypeModule{
  page: Page
  text: string
  selector: string
}

interface IClickModule{
  page: Page
  selector: string
}

type TypeFunction = (input: ITypeModule) => Promise<Array<void>>
type ClickFunction = (input: IClickModule) => Promise<void>
