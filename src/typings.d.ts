import { Browser, Page } from 'puppeteer'

export interface IPuppeteer {
  browser: Browser
  page: Page
}

interface IResolution {
  x: number
  y: number
}

interface IPuppeteerSettings{
  args: Array<string>
  handleSIGINT: false
  headless: boolean
}

interface ITypeSettings{
  selector: string
  text: string
}

interface IInput{
  resolution?: IResolution,
  url: string
}

type TypeModule = (input: ITypeModule) => Promise<Array<void>>

interface IOutput{
  page: Page
  browser: Browser
  typeModule: TypeModule
}

interface ITypeModule{
  page: Page
  text: string
  selector: string
}

type TypeFunction = (input: ITypeSettings) => Promise<void>
