import { completionRequest } from '../src/ai'
import nock from 'nock'

describe('completionRequest', () => {
  afterEach(() => {
    nock.cleanAll() // Clean up nock after each test
  })

  it('should return completed content', async () => {
    const apiKey = 'test-api-key'
    const systemPrompt = 'System prompt'
    const userPrompt = 'User prompt'

    // Mock the OpenAI API request
    // Mock the OpenAI API request
    nock('https://api.openai.com')
      .post('/v1/chat/completions', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-3.5-turbo'
      })
      .reply(200, {
        choices: [
          {
            message: {
              content: 'Expected completed content'
            }
          }
        ]
      })

    // Call the completionRequest function to test it
    const result = await completionRequest(apiKey, systemPrompt, userPrompt)

    // Assert based on the expected result
    expect(result).toBe('Expected completed content')
  })

  it('should handle missing response content', async () => {
    const apiKey = 'your-api-key'
    const systemPrompt = 'System prompt'
    const userPrompt = 'User prompt'

    // Mock the OpenAI API request
    nock('https://api.openai.com')
      .post('/v1/engines/davinci/completions')
      .reply(200, {
        choices: undefined // Set response.choices to undefined
      })

    // Call the completionRequest function to test it
    const result = await completionRequest(apiKey, systemPrompt, userPrompt)

    // Ensure that error handling works correctly
    expect(result).toBe('')
  })

  it('should throw an error when response content is missing', async () => {
    nock('https://api.openai.com').post('/v1/chat/completions').reply(200, {})

    const consoleLogSpy = jest.spyOn(console, 'log')

    await completionRequest('your-api-key', 'system-prompt', 'user-prompt')
    const expectedError = new Error('Response content is missing')
    expectedError.name = 'Error' // Set the name property to match the expected error
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Error in completionRequest:',
      expectedError
    )
    consoleLogSpy.mockRestore()
  })

  it('model gpt4 should be used', async () => {
    const apiKey = 'test-api-key'
    const systemPrompt = 'System prompt'
    const userPrompt = 'User prompt'
    const model = 'gpt-4'

    // Mock the OpenAI API request
    // Mock the OpenAI API request
    nock('https://api.openai.com')
      .post('/v1/chat/completions', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-4'
      })
      .reply(200, {
        choices: [
          {
            message: {
              content: 'Expected completed content'
            }
          }
        ]
      })

    // Call the completionRequest function to test it
    const result = await completionRequest(
      apiKey,
      systemPrompt,
      userPrompt,
      model
    )

    // Assert based on the expected result
    expect(result).toBe('Expected completed content')
  })
})
