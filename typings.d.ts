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

interface OutputPuppeteer{
  $: (selector: string, fn: Function) => Promise<any>
  $$: (selector: string, fn: Function) => Promise<any>
  page: Page
  browser: Browser
  catchError: (e: any) => Promise<any>
  typeModule: TypeFunction
  clickModule: ClickFunction
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
