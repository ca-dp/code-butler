export function removeTargetFileFromDiff(
  diff: string,
  targetFiles: string[]
): string {
  // Split the diff into files
  const files = diff.split(/^diff --git /m)

  // The first element is empty, so remove it
  files.shift()

  // Filter out the target files
  const filteredFiles = files.filter(fileDiff => {
    // Extract the file name from the diff
    const fileName = fileDiff.split(' ')[1].split('\n')[0]
    console.log(fileName)

    // Check if the file name is included in any of the target files
    return !targetFiles.some(targetFile => fileName.includes(targetFile))
  })

  // If all files are filtered out, return an empty string
  if (filteredFiles.length === 0) {
    return ''
  }

  // Join the remaining files back into a diff
  const updatedDiff = `diff --git ${filteredFiles.join('diff --git ')}`

  console.log(updatedDiff)

  return updatedDiff
}

export function removeFilesWithExtensionsFromDiff(
  diff: string,
  extensions: string[]
): string {
  // Split the diff into files
  const files = diff.split(/^diff --git /m)

  // The first element is empty, so remove it
  files.shift()

  // Filter out the files with specified extensions
  const filteredFiles = files.filter(fileDiff => {
    // Extract the file name from the diff
    const fileName = fileDiff.split(' ')[1].split('\n')[0]

    // Extract the extension from the file name
    const extension = fileName.split('.').pop()

    console.log(extension)

    // Check if the extension is included in the specified extensions
    // and if the extension is not undefined
    return extension && !extensions.includes(extension)
  })

  // If all files are filtered out, return an empty string
  if (filteredFiles.length === 0) {
    return ''
  }

  // Join the remaining files back into a diff
  const updatedDiff = `diff --git ${filteredFiles.join('diff --git ')}`

  console.log(updatedDiff)

  return updatedDiff
}
