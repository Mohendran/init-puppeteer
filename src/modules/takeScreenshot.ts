import { Page } from 'puppeteer'
import { ScreenOnError } from '../../typings'
import { unlinkSync } from 'fs'
import { path } from 'rambdax'
// import {uploadFile} from 'imgur'

export async function takeScreenshot(
  page: Page, 
  screenOnError: ScreenOnError
): Promise<string> {
  try{
    if(screenOnError === 'OFF'){
      
      return 'OFF'
    }

    const screenshotPath = `${__dirname}/${Date.now()}.png`
    await page.screenshot({
      fullPage: true,
      path: screenshotPath,
    })

    if(screenOnError === 'LOCAL'){

      return screenshotPath
    }
    // const uploadResult = await uploadFile(screenshotPath)
    // unlinkSync(screenshotPath)

    // return path(
    //   'data.link',
    //   uploadResult
    // )
  }catch(err){
    throw err
  }
}