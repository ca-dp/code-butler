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
import * as main from '../src/main' // Import the main module

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
    process.env.OPENAI_API_KEY = 'mocked-api-key'

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
      'Mocked PR diff'
    )
    expect(createGitHubCommentMock).toHaveBeenCalledWith('Mocked AI response')

    // Clear environment variables
    delete process.env.OPENAI_API_KEY
  })

  it('should handle missing OPENAI_API_KEY', async () => {
    // Clear required environment variables
    delete process.env.OPENAI_API_KEY

    // Set up a spy to capture the error message
    const setFailedMock = jest.spyOn(core, 'setFailed')

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith('OPENAI_API_KEY is not defined')
  })
  it('should handle empty AI response message', async () => {
    // Clear required environment variables
    process.env.OPENAI_API_KEY = 'mocked-api-key'

    // Set up a spy to capture the error message
    const setFailedMock = jest.spyOn(core, 'setFailed')

    // Mock AI response with an empty message
    const completionRequestMock = jest.spyOn(ai, 'completionRequest')
    completionRequestMock.mockResolvedValue('')

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith('Response content is missing')

    // Clear environment variables
    delete process.env.OPENAI_API_KEY
  })

  // Additional test cases for other error scenarios can be added
})
