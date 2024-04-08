import * as core from '@actions/core'
import * as prompt from './prompt'
import * as ai from './ai'
import * as github from './github'
import * as grouper from './grouper'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const cmd = core.getInput('cmd', { required: true })
    switch (cmd) {
      case 'review': {
        const diff = await github.getPullRequestDiff()
        if (diff === '') {
          core.setFailed('Pull request diff is missing')
        }
        const model = core.getInput('model', { required: false })
        if (model === 'gpt-4-1106-preview') {
          const sysPrompt = prompt.getCodeReviewSystemPrompt()
          const messagePromise = ai.completionRequest(
            core.getInput('OPENAI_API_KEY', { required: true }),
            sysPrompt,
            diff,
            model
          )

          const message = await messagePromise
          if (message === '') {
            core.setFailed('[review]Response content is missing')
          }

          await github.createGitHubComment(message)
        } else {
          const groups = await grouper.groupFilesForReview(diff)
          const sysPrompt = prompt.getCodeReviewSystemPrompt()

          for (const group of groups) {
            const diffToSend = group.join('')
            const messagePromise = ai.completionRequest(
              core.getInput('OPENAI_API_KEY', { required: true }),
              sysPrompt,
              diffToSend,
              model
            )

            const message = await messagePromise
            if (message === '') {
              core.setFailed('[review]Response content is missing')
            }

            await github.createGitHubComment(message)
          }
        }
        break
      }
      case 'chat': {
        const comment = core.getInput('comment_body', { required: false })

        if (comment === '') {
          core.setFailed('Comment body is missing')
        }

        const chatSystemPrompt = prompt.getChatSystemPrompt()
        const model = core.getInput('model', { required: false })
        const responseMessage = ai.completionRequest(
          core.getInput('OPENAI_API_KEY', { required: true }),
          chatSystemPrompt,
          comment,
          model
        )
        const response = await responseMessage
        if (response === '') {
          core.setFailed('[chat]Response content is missing')
        }

        await github.createGitHubComment(response)

        break
      }
      case 'translate': {
        const commentId = core.getInput('comment_id', { required: false })
        const comment = core.getInput('comment_body', { required: false })

        if (comment === '') {
          core.setFailed('Comment body is missing')
        }

        const systemPrompt = prompt.getTranslateSystemPrompt()
        const responseMessage = ai.completionRequest(
          core.getInput('OPENAI_API_KEY', { required: true }),
          systemPrompt,
          comment
        )
        const response = await responseMessage
        if (response === '') {
          core.setFailed('Response content is missing')
        }
        if (response === 'NO_REPLY') {
          console.log('Skipping comment')
          break
        }

        await github.editGitHubComment(
          comment + '\n\n' + response,
          parseInt(commentId)
        )

        break
      }
      default:
        core.setFailed('Unknown command')
        break
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
