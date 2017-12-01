import { Browser, Page } from 'puppeteer'

interface InputPuppeteer{
  resolution?: Resolution
  url?: string
  headless?: boolean
}

interface OutputPuppeteer{
  page: Page
  browser: Browser
  typeModule: TypeFunction
  clickModule: ClickFunction
}

interface InitPuppeteer{
  input: InputPuppeteer
  resolution: Resolution
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
