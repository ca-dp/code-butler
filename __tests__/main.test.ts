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
  })

  it('should handle empty AI response message', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'GITHUB_TOKEN':
          return 'token'
        case 'OPENAI_API_KEY':
          return 'mocked-api-key'
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

    // Call the function under test
    await main.run()

    // Ensure the error message was set correctly
    expect(setFailedMock).toHaveBeenCalledWith('Response content is missing')

    // Clear environment variables
    delete process.env.OPENAI_API_KEY
  })

  // Additional test cases for other error scenarios can be added
})
