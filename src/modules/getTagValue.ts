import { IGetTagValue } from '../custom'
import { getCurrentTag } from './getCurrentTag'
import { getNextTag } from './getNextTag'

export const getTagValue = async (x: IGetTagValue): Promise<string> => {
  if (x.input.tag !== undefined) {
    return x.input.tag
  }

  const currentTag: string = await x.page.evaluate(getCurrentTag)

  return getNextTag(currentTag)
}
