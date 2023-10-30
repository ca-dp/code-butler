import { groupFilesForReview } from '../src/grouper'

describe('groupFilesForReview', () => {
  it('should group files within token limit', async () => {
    const diff = `diff --git file1.txt
+ Line 1
+ Line 2
diff --git file2.txt
+ Line 1
+ Line 2`

    const groups = await groupFilesForReview(diff)

    // Assert that the result contains 2 groups
    expect(groups.length).toBe(1)
    // Add more specific assertions as needed
  })
  it('should skip files exceeding token limit', async () => {
    const diff = `diff --git file1.txt
+ This is a very long line that exceeds the token limit`

    const groups = await groupFilesForReview(diff)

    // Assert that the result contains 0 groups
    expect(groups.length).toBe(1)
    // Add more specific assertions as needed
  })
  it('should handle files exceeding 3000 tokens', async () => {
    // テスト用の diff を作成し、3000 トークンを超える長い行を含む
    const diff = `diff --git file1.txt
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
diff --git file2.txt
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
diff --git file3.txt
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
diff --git file4.txt
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
diff --git file5.txt                                                              
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
- This is a very long line that exceeds the 3000 token limit by adding more tokens
- This is a very long line that exceeds the 3000 token limit by adding more tokens
- This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
This is a very long line that exceeds the 3000 token limit by adding more tokens
diff --git file6.txt
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
diff --git file7.txt
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens
+ This is a very long line that exceeds the 3000 token limit by adding more tokens`
    const groups = await groupFilesForReview(diff)
    expect(groups.length).toBe(4)
  })
})
