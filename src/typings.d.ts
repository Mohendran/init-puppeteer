interface ICredentials {
  user: string
  password: string
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
  autoTag?: true
  tag?: string
  getLatestTag?: boolean
}

type TypeFunction = (input: ITypeSettings) => Promise<void>
