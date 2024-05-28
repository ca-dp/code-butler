import * as core from '@actions/core'
import * as prompt from './prompt'
import * as ai from './ai'
import * as github from './github'
import * as grouper from './grouper'
import * as exclude from './diff'

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
        const excludeFiles = core.getInput('exclude_files', { required: false })
        const excludeExtensions = core.getInput('exclude_extensions', {
          required: false
        })

        let updatedDiff = diff

        if (excludeFiles !== '') {
          const files = excludeFiles.split(',')
          updatedDiff = exclude.removeTargetFileFromDiff(updatedDiff, files)
          if (updatedDiff === '') {
            core.setFailed('All files are excluded')
          }
        }

        if (excludeExtensions !== '') {
          const extensions = excludeExtensions.split(',')
          updatedDiff = exclude.removeFilesWithExtensionsFromDiff(
            updatedDiff,
            extensions
          )
          if (updatedDiff === '') {
            core.setFailed('All files are excluded')
          }
        }

        const model = core.getInput('model', { required: false })
        const lang = core.getInput('lang', { required: false }) || 'en'

        if (!(lang === 'ja' || lang === 'en')) {
          core.setFailed('Language is not supported')
        }
        if (model === 'gpt-4-1106-preview') {
          const sysPrompt = prompt.getCodeReviewSystemPrompt(lang)
          const messagePromise = ai.completionRequest(
            core.getInput('OPENAI_API_KEY', { required: true }),
            sysPrompt,
            updatedDiff,
            model
          )

          const message = await messagePromise
          if (message === '') {
            core.setFailed('[review]Response content is missing')
          }

          await github.createGitHubComment(message)
        } else {
          const groups = await grouper.groupFilesForReview(updatedDiff)
          const sysPrompt = prompt.getCodeReviewSystemPrompt(lang)
          let aggregatedMessages = "";

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

            aggregatedMessages += message + "\n\n---\n\n";
          }

          if (aggregatedMessages !== "") {
            await github.createGitHubComment(aggregatedMessages)
          }
        }
        break
      }
      case 'chat': {
        const comment = core.getInput('comment_body', { required: false })

        if (comment === '') {
          core.setFailed('Comment body is missing')
        }

        const lang = core.getInput('lang', { required: false }) || 'en'
        if (!(lang === 'ja' || lang === 'en')) {
          core.setFailed('Language is not supported')
        }

        const chatSystemPrompt = prompt.getChatSystemPrompt(lang)
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
      default:
        core.setFailed('Unknown command')
        break
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
