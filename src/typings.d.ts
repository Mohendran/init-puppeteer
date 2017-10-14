import { Browser, Page } from 'puppeteer'

interface IInput{
  resolution?: IResolution
  url: string
  headless: boolean
}

interface IOutput{
  page: Page
  browser: Browser
  typeModule: TypeFunction
  clickModule: ClickFunction
}

interface IInitPuppeteer{
  input: IInput
  resolution: IResolution
}

interface IPuppeteer {
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
