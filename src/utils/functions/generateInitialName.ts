export const GenerateInitialNameForAvatar = (
  nameCompleted: string | undefined,
) => {
  if (nameCompleted) {
    const names = nameCompleted.split(' ')

    const firstLetter = names[0][0].concat(names[names.length - 1][0])

    return firstLetter
  }

  return ''
}
