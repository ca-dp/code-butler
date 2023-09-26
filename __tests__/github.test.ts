import * as core from '@actions/core'
import * as github from '@actions/github'
import nock from 'nock' // Import nock for mocking HTTP requests

import { getPullRequestDiff, createGitHubComment } from '../src/github' // Please specify the path to your module

const getInputMock = jest.spyOn(core, 'getInput')
// Set the GITHUB_REPOSITORY environment variable for testing
process.env['GITHUB_REPOSITORY'] = 'test-org/test-repo'

beforeEach(() => {
  nock.cleanAll()
})

describe('getPullRequestDiff', () => {
  it('should return the PR diff as a string', async () => {
    // Mock the GitHub Actions inputs
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'GITHUB_TOKEN':
          return 'token'
        default:
          return ''
      }
    })
    // Set the context directly
    github.context.payload = {
      issue: {
        number: 2 // Mock the pull request number
      }
    }
    // Mock the GitHub context
    nock('https://api.github.com', {
      reqheaders: {
        accept: 'application/vnd.github.v3.diff',
        'user-agent': 'octokit-core.js/3.6.0 Node.js/20.7.0 (darwin; arm64)',
        authorization: 'token token',
        'accept-encoding': 'gzip,deflate'
      }
    })
      .get('/repos/test-org/test-repo/pulls/2')
      .reply(200, 'Response Data')
    const diff = await getPullRequestDiff()
    expect(diff).toEqual('Response Data') // Test the expected result
  })
})

describe('createGitHubComment', () => {
  it('should create a GitHub comment', async () => {
    // Mock the GitHub Actions inputs
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'GITHUB_TOKEN':
          return 'token'
        default:
          return ''
      }
    })
    // Set the context directly
    github.context.payload = {
      issue: {
        number: 2 // Mock the pull request number
      }
    }
    nock('https://api.github.com', {
      reqheaders: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': 'octokit-core.js/3.6.0 Node.js/20.7.0 (darwin; arm64)',
        authorization: 'token token',
        'content-type': 'application/json; charset=utf-8',
        'content-length': '23',
        'accept-encoding': 'gzip,deflate'
      }
    })
      .post('/repos/test-org/test-repo/issues/2/comments')
      .reply(201)
    await createGitHubComment('Test comment')
    // Test that the GitHub API request is successful
  })
})
