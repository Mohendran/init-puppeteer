import * as log from 'log-fn'
import { Response } from 'puppeteer'
import {
  partialCurry,
} from 'rambdax'
import { click } from './modules/click'
import {
  waitForLoad,
  waitForNetwork,
 } from './modules/constants'
import { getCredentials } from './modules/getCredentials'
import { getRepoName } from './modules/getRepoName'
import { getTagValue } from './modules/getTagValue'
import { initPuppeteer } from './modules/initPuppeteer'
import { type as typeModule } from './modules/type'

const selectors = {
  clickLoginSubmit: '.btn-primary',
  inputTag: 'input.js-release-tag-field',
  password: '#password',
  submitTag: 'button.js-publish-release',
  username: '#login_field',
}

export async function tagFn(input: IInput): Promise<void|string>{
  try{
    const repoName = getRepoName()
    const {user, password} = getCredentials()
    var { browser, page } = await initPuppeteer()
    const type: TypeFunction = partialCurry(typeModule, { page })

    const urlGithub = 'https://github.com/'
    const urlInit = `${urlGithub}login`
    await page.goto(urlInit, waitForNetwork)

    await type({
      selector: selectors.username,
      text: user,
    })

    await type({
      selector: selectors.password,
      text: password,
    })

    await page.evaluate(click, selectors.clickLoginSubmit)

    const responseURLInit: Response = await page.waitForNavigation(waitForLoad)
    if (responseURLInit.url !== urlGithub){
      throw `Not valid credentials('${user}' '${password}')`
    }

    const urlRepo = `https://github.com/${user}/${repoName}`
    const responseURLRepo: Response = await page.goto(urlRepo, waitForNetwork)
    if (!responseURLRepo.ok){
      log(`Github user '${user}' doesn't have repo '${repoName}'`, 'error')

      return
    }

    const urlRelease = `${urlRepo}/releases`
    await page.goto(urlRelease, waitForNetwork)

    const tagValue: string = await getTagValue({page, input, urlRepo})
    if (input.getLatestTag){
      return tagValue
    }

    const urlNewRelease = `${urlRelease}/new`
    await page.goto(urlNewRelease, waitForNetwork)

    await type({ selector: selectors.inputTag, text: tagValue })
    await page.evaluate(click, selectors.submitTag)
    const responseURLNewTag: Response = await page.waitForNavigation(waitForLoad)
    const expectedURL = `${urlRepo}/releases/tag/${tagValue}`

    if (responseURLNewTag.ok && responseURLNewTag.url === expectedURL) {
      log(`Published new tag '${tagValue}' on repo '${repoName}'`, 'success')

      return
    }
    log(`Something went wront when publishing new tag '${tagValue}'`, 'error')
  }catch (err){
    console.log(err)
  }finally{
    if (browser !== undefined){
      await browser.close()
    }
  }
}
