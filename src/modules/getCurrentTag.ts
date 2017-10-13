export const getCurrentTag = (): string => {
  const tagElements = Array.from(
    document.querySelectorAll('ul.tag-references'),
  )
  if (tagElements.length === 0) {
    return '0.0.0'
  }
  const latestTagElement = tagElements[0]

  return latestTagElement.querySelector('span').innerText
}
