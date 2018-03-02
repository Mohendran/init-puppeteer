const {log} = require('log')
const path = require('path')
const watchFn = require('watch-fn')
const { exec } = require('child_process')

const projectDirectory = path.resolve(__dirname, '../')

//As we have numerous operations, watch.timeout option is not a good fit. 
let flag = true

const execCommand = command =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd : projectDirectory })

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

execCommand('rm -rf dist')

const tsBuildFn = async () => {
  await execCommand('yarn build')
  log('Typescript build ready', 'info')
}

const tslintFn = async filePath => {
  await execCommand(`yarn lint ${ filePath } --fix`)
  log(`Tslint ${ filePath } ready`, 'info')
}


const tsFormatFn = async filePath => {
  await execCommand(`yarn format -r ${ filePath }`)
  log('tsFormatFn ready', 'info')
}

const typeCheckFn = async () => {
  await execCommand('yarn lint --type-check --project tsconfig.json')
  log('Typecheck ready','success')
}

async function tsCommand(filePath){
  if(flag === false){
    
    return
  }
  flag = false
  await tslintFn(filePath)
  await Promise.all([
    tsBuildFn(filePath),
    tsFormatFn(filePath),
    typeCheckFn(filePath)
  ])
  flag = true
  log('','sepx')
}

const options = {
  commands : {
    ts : tsCommand,
  },
  directory : `${ projectDirectory }/src`,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
