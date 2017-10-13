process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
process.on('uncaughtException', err => {
  console.log(err)
})

import * as inquirer from 'inquirer'
import * as log from 'log-fn'
import {
  drop,
  head,
} from 'rambdax'
import {tagFn} from './index'
import {init} from './modules/init'

const [input]: Array<string> = drop(2, process.argv)

if (input === 'init') {
inquirer
  .prompt([
    { type: 'input', message: 'Your Github username?', name: 'user' },
    { type: 'password', message: 'Your Github password?', name: 'password' },
  ])
  .then((credentials: ICredentials) => {
    init(credentials)
  })
}else if (input === undefined){

  log('Auto increment of the latest tag will be applied\n', 'info')
  log('spin')

  tagFn({autoTag: true})
  .then(() => {
    log('stopspin')
  })
  .catch(console.log)
}else{

  log(`The new tag will be '${input}'\n`, 'info')

  tagFn({tag: head(input)})
  .then(() => {
    log('stopspin')
  })
  .catch(console.log)
}
