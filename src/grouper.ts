import { encoding_for_model } from 'tiktoken'

export async function groupFilesForReview(diff: string): Promise<string[][]> {
  // Split the diff into files
  const files = diff.split('diff --git ')

  // The first element is empty, so remove it
  files.shift()

  // Initialize groups and group counter
  const groups: string[][] = []
  let currentGroup: string[] = []

  for (const fileDiff of files) {
    const fileTokens = countTokensInDiff(fileDiff) // Implement token counting function
    const maxToken = 3000
    if (sumTokensInGroup(currentGroup) + fileTokens > maxToken) {
      if (currentGroup.length === 0) {
        // Remove lines that do not start with '+' or '-' (lines without additions or deletions)
        const trimmedFileDiff = fileDiff
          .split('\n')
          .filter(line => line.startsWith('+') || line.startsWith('-'))
          .join('\n')
        // If adding the current file would exceed the limit, start a new group
        if (countTokensInDiff(trimmedFileDiff) > maxToken) {
          currentGroup = [] // Do not include the current file in the new group
          continue
        }
        currentGroup = [trimmedFileDiff] // Include the current file in the new group
        groups.push(currentGroup)
        currentGroup = []
      } else {
        // If adding the current file would exceed the limit, start a new group
        groups.push(currentGroup)
        currentGroup = []
        if (fileTokens > maxToken) {
          const trimmedFileDiff = fileDiff
            .split('\n')
            .filter(line => line.startsWith('+') || line.startsWith('-'))
            .join('\n')
          if (countTokensInDiff(trimmedFileDiff) > maxToken) {
            currentGroup = [] // Do not include the current file in the new group
            continue
          }
          currentGroup = [trimmedFileDiff] // Include the current file in the new group
          groups.push(currentGroup)
          currentGroup = []
        } else {
          currentGroup = [fileDiff] // Include the current file in the new group
        }
      }
    } else {
      currentGroup.push(fileDiff)
    }
  }

  // Add the last group (if not empty)
  if (currentGroup.length > 0) {
    groups.push(currentGroup)
  }

  return groups
}

// Calculate the sum of tokens in a group
function sumTokensInGroup(group: string[]): number {
  return group.reduce(
    (total, fileDiff) => total + countTokensInDiff(fileDiff),
    0
  )
}

// Implement token counting function (countTokensInDiff) to count tokens in a file's diff
function countTokensInDiff(diff: string): number {
  const enc = encoding_for_model('gpt-3.5-turbo')
  const encoded = enc.encode(diff)
  const tokens = encoded.length

  return tokens
}
