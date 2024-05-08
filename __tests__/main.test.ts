/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as github from '../src/github'
import * as ai from '../src/ai'
import * as process from 'process'
import * as prompt from '../src/prompt'
import * as main from '../src/main'
import * as grouper from '../src/grouper'

const getInputMock = jest.spyOn(core, 'getInput')
// Set the GITHUB_REPOSITORY environment variable for testing
process.env['GITHUB_REPOSITORY'] = 'test-org/test-repo'

describe('run', () => {
  it('should run the action successfully', async () => {
    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('Mocked AI response')

    const createGitHubCommentMock = jest.spyOn(github, 'createGitHubComment')
    createGitHubCommentMock.mockResolvedValue(undefined)

    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'model':
          return 'mock ai model'
        default:
          return ''
      }
    })

    // Set a dummy prompt
    const getCodeReviewSystemPromptMock = jest.spyOn(
      prompt,
      'getCodeReviewSystemPrompt'
    )
    getCodeReviewSystemPromptMock.mockReturnValue('Mocked system prompt')

    const groupFilesForReviewMock = jest.spyOn(grouper, 'groupFilesForReview')
    const groupMockRes: string[][] = [['Mocked PR diff'], ['Mocked PR diff']]
    groupFilesForReviewMock.mockResolvedValue(groupMockRes)

    // Call the function under test
    await main.run()

    // Ensure each function was called correctly
    expect(getPullRequestDiffMock).toHaveBeenCalled()
    expect(completionRequestMock).toHaveBeenCalledWith(
      'mocked-api-key',
      'Mocked system prompt',
      'Mocked PR diff',
      'mock ai model'
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')
  })

  it('should run the action successfully jp', async () => {
    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('Mocked AI response')

    const createGitHubCommentMock = jest.spyOn(github, 'createGitHubComment')
    createGitHubCommentMock.mockResolvedValue(undefined)

    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'model':
          return 'mock ai model'
        case 'lang':
          return 'ja'
        default:
          return ''
      }
    })

    // Set a dummy prompt
    const getCodeReviewSystemPromptMock = jest.spyOn(
      prompt,
      'getCodeReviewSystemPrompt'
    )
    getCodeReviewSystemPromptMock.mockReturnValue('Mocked system prompt')

    const groupFilesForReviewMock = jest.spyOn(grouper, 'groupFilesForReview')
    const groupMockRes: string[][] = [['Mocked PR diff'], ['Mocked PR diff']]
    groupFilesForReviewMock.mockResolvedValue(groupMockRes)

    // Call the function under test
    await main.run()

    // Ensure each function was called correctly
    expect(getPullRequestDiffMock).toHaveBeenCalled()
    expect(completionRequestMock).toHaveBeenCalledWith(
      'mocked-api-key',
      'Mocked system prompt',
      'Mocked PR diff',
      'mock ai model'
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')
  })

  it('should run the action successfully en', async () => {
    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('Mocked AI response')

    const createGitHubCommentMock = jest.spyOn(github, 'createGitHubComment')
    createGitHubCommentMock.mockResolvedValue(undefined)

    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'model':
          return 'mock ai model'
        case 'lang':
          return 'en'
        default:
          return ''
      }
    })

    // Set a dummy prompt
    const getCodeReviewSystemPromptMock = jest.spyOn(
      prompt,
      'getCodeReviewSystemPrompt'
    )
    getCodeReviewSystemPromptMock.mockReturnValue('Mocked system prompt')

    const groupFilesForReviewMock = jest.spyOn(grouper, 'groupFilesForReview')
    const groupMockRes: string[][] = [['Mocked PR diff'], ['Mocked PR diff']]
    groupFilesForReviewMock.mockResolvedValue(groupMockRes)

    // Call the function under test
    await main.run()

    // Ensure each function was called correctly
    expect(getPullRequestDiffMock).toHaveBeenCalled()
    expect(completionRequestMock).toHaveBeenCalledWith(
      'mocked-api-key',
      'Mocked system prompt',
      'Mocked PR diff',
      'mock ai model'
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')
  })

  it('should handle empty AI response message', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'GITHUB_TOKEN':
          return 'token'
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        default:
          return ''
      }
    })

    // Set up a spy to capture the error message
    const setFailedMock = jest.spyOn(core, 'setFailed')

    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    // Mock AI response with an empty message
    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('')

    const groupFilesForReviewMock = jest.spyOn(grouper, 'groupFilesForReview')
    const groupMockRes: string[][] = [['Mocked PR diff'], ['Mocked PR diff']]
    groupFilesForReviewMock.mockResolvedValue(groupMockRes)

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith(
      '[review]Response content is missing'
    )

    // Clear environment variables
    delete process.env.OPENAI_API_KEY
  })

  it('should handle unknown command', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'GITHUB_TOKEN':
          return 'token'
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'unknown'
        default:
          return ''
      }
    })
    const setFailedMock = jest.spyOn(core, 'setFailed')
    await main.run()
    expect(setFailedMock).toHaveBeenCalledWith('Unknown command')
  })

  it('should run the action successfully on chat', async () => {
    // Create mock functions

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('Mocked AI response')

    const createGitHubCommentMock = jest.spyOn(github, 'createGitHubComment')
    createGitHubCommentMock.mockResolvedValue(undefined)

    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'chat'
        case 'comment_body':
          return 'Mocked issue comment'
        default:
          return ''
      }
    })

    // Set a dummy prompt
    const getChatSystemPromptMock = jest.spyOn(prompt, 'getChatSystemPrompt')
    getChatSystemPromptMock.mockReturnValue('Mocked system prompt')

    // Call the function under test
    await main.run()

    // Ensure each function was called correctly
    expect(completionRequestMock).toHaveBeenCalledWith(
      'mocked-api-key',
      'Mocked system prompt',
      'Mocked issue comment',
      ''
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')
  })

  it('should handle empty AI response message on chat', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'GITHUB_TOKEN':
          return 'token'
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'chat'
        case 'comment_body':
          return 'Mocked issue comment'
        default:
          return ''
      }
    })

    // Set up a spy to capture the error message
    const setFailedMock = jest.spyOn(core, 'setFailed')

    // Mock AI response with an empty message
    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('')

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith(
      '[chat]Response content is missing'
    )

    // Clear environment variables
    delete process.env.OPENAI_API_KEY
  })

  it('should send the entire diff to OpenAI when model is gpt-4-1106-preview', async () => {
    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'model':
          return 'gpt-4-1106-preview'
        default:
          return ''
      }
    })

    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('Mocked AI response')

    const createGitHubCommentMock = jest.spyOn(github, 'createGitHubComment')
    createGitHubCommentMock.mockResolvedValue(undefined)

    // Set a dummy prompt
    const getCodeReviewSystemPromptMock = jest.spyOn(
      prompt,
      'getCodeReviewSystemPrompt'
    )
    getCodeReviewSystemPromptMock.mockReturnValue('Mocked system prompt')

    // Call the function under test
    await main.run()

    // Ensure each function was called correctly
    expect(getPullRequestDiffMock).toHaveBeenCalled()
    expect(completionRequestMock).toHaveBeenCalledWith(
      'mocked-api-key',
      'Mocked system prompt',
      'Mocked PR diff',
      'gpt-4-1106-preview'
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')
  })

  it('should handle missing pull request diff', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        default:
          return ''
      }
    })

    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('')

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith('Pull request diff is missing')
  })

  it('should handle missing AI response message in review', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        default:
          return ''
      }
    })

    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('')

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith(
      '[review]Response content is missing'
    )
  })

  it('missing lang to review', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'lang':
          return 'pa'
        default:
          return ''
      }
    })

    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith('Language is not supported')
  })

  it('missing lang to chat', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'chat'
        case 'lang':
          return 'pa'
        case 'comment_body':
          return 'Mocked issue comment'
        default:
          return ''
      }
    })

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith('Language is not supported')
  })

  it('should handle missing comment body in chat', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'chat'
        default:
          return ''
      }
    })

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith('Comment body is missing')
  })

  it('should handle error in run function', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        default:
          return ''
      }
    })

    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockRejectedValue(new Error('Mocked error'))

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith('Mocked error')
  })

  it('should handle missing AI response message when model is gpt-4-1106-preview', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'model':
          return 'gpt-4-1106-preview'
        default:
          return ''
      }
    })

    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue('Mocked PR diff')

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('')

    const setFailedMock = jest.spyOn(core, 'setFailed')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith(
      '[review]Response content is missing'
    )
  })

  it('should run main.run() with diff functionality', async () => {
    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'exclude_files':
          return 'file1.js,file2.ts'
        case 'exclude_extensions':
          return 'js'
        case 'model':
          return 'mock ai model'
        default:
          return ''
      }
    })

    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue(
      'diff --git a/file1.js b/file1.js\n' +
        'diff --git a/file2.ts b/file2.ts\n' +
        'diff --git a/file3.txt b/file3.txt\n' +
        'diff --git a/file4.js b/file4.js\n'
    )

    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('Mocked AI response')

    const createGitHubCommentMock = jest.spyOn(github, 'createGitHubComment')
    createGitHubCommentMock.mockResolvedValue(undefined)

    // Set a dummy prompt
    const getCodeReviewSystemPromptMock = jest.spyOn(
      prompt,
      'getCodeReviewSystemPrompt'
    )
    getCodeReviewSystemPromptMock.mockReturnValue('Mocked system prompt')

    const groupFilesForReviewMock = jest.spyOn(grouper, 'groupFilesForReview')
    const groupMockRes: string[][] = [['diff --git a/file3.txt b/file3.txt\n']]
    groupFilesForReviewMock.mockResolvedValue(groupMockRes)

    // Call the function under test
    await main.run()

    // Ensure each function was called correctly
    expect(getPullRequestDiffMock).toHaveBeenCalled()
    expect(completionRequestMock).toHaveBeenCalledWith(
      'mocked-api-key',
      'Mocked system prompt',
      'diff --git a/file3.txt b/file3.txt\n',
      'mock ai model'
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')
  })

  it('should handle all files excluded in main.run()', async () => {
    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'exclude_files':
          return 'file1.js,file2.ts'
        case 'exclude_extensions':
          return 'js,ts,txt'
        case 'model':
          return 'mock ai model'
        default:
          return ''
      }
    })

    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue(
      'diff --git a/file1.js b/file1.js\n' +
        'diff --git a/file2.ts b/file2.ts\n' +
        'diff --git a/file3.txt b/file3.txt\n' +
        'diff --git a/file4.js b/file4.js\n'
    )

    const setFailedMock = jest.spyOn(core, 'setFailed')

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith('All files are excluded')
  })

  it('should handle all files excluded by removeTargetFileFromDiff', async () => {
    // Set required environment variables
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
        case 'cmd':
          return 'review'
        case 'exclude_files':
          return 'file1.js,file2.ts,file3.txt,file4.js'
        case 'model':
          return 'mock ai model'
        default:
          return ''
      }
    })

    // Create mock functions
    const getPullRequestDiffMock = jest.spyOn(github, 'getPullRequestDiff')
    getPullRequestDiffMock.mockResolvedValue(
      'diff --git a/file1.js b/file1.js\n' +
        'diff --git a/file2.ts b/file2.ts\n' +
        'diff --git a/file3.txt b/file3.txt\n' +
        'diff --git a/file4.js b/file4.js\n'
    )

    const setFailedMock = jest.spyOn(core, 'setFailed')

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith('All files are excluded')
  })

  // Additional test cases for other error scenarios can be added
})
