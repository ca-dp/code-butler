import * as core from '@actions/core'
import * as github from '@actions/github'

export async function getPullRequestDiff(): Promise<string> {
  const token = core.getInput('GITHUB_TOKEN', { required: true })
  const octokit = github.getOctokit(token)

  const { data: diff } = await octokit.rest.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.issue.number,
    mediaType: {
      format: 'diff'
    }
  })

  return diff as unknown as string
}

export async function createGitHubComment(message: string): Promise<void> {
  const token = core.getInput('GITHUB_TOKEN', { required: true })
  const octokit = github.getOctokit(token)

  await octokit.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: github.context.issue.number,
    body: message
  })
}

export async function editGitHubComment(message: string, commentId: number): Promise<void> {
  const token = core.getInput('GITHUB_TOKEN', { required: true })
  const octokit = github.getOctokit(token)

  await octokit.rest.issues.updateComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    comment_id: commentId,
    body: message
  })
}