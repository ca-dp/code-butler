import * as core from '@actions/core'
import * as prompt from './prompt'
import * as ai from './ai'
import * as github from './github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const diff = await github.getPullRequestDiff()

    const apiKey = core.getInput('OPENAI_API_KEY', { required: true })

    const sysPrompt = prompt.getCodeReviewSystemPrompt()
    const messagePromise = ai.completionRequest(apiKey, sysPrompt, diff)
    const message = await messagePromise

    if (message === '') {
      core.setFailed('Response content is missing')
    }

    await github.createGitHubComment(message)

    console.log(message)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
