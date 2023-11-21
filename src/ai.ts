import OpenAI from 'openai'

export async function completionRequest(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  model: string | undefined = undefined
): Promise<string> {
  try {
    const openai = new OpenAI({ apiKey })
    const requestTimeout = 300 * 1000 // 5 minutes
    const targetModel = model || 'gpt-3.5-turbo'
    const response = await openai.chat.completions.create(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: targetModel
      },
      {
        timeout: requestTimeout
      }
    )
    if (
      response.choices &&
      response.choices[0] &&
      response.choices[0].message
    ) {
      return response.choices[0].message.content || ''
    } else {
      console.log('%o', response)
      throw new Error('Response content is missing')
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.log(error.status)
      console.log(error.name)
      console.log(error.headers)
    } else {
      console.log('Error in completionRequest:', error)
    }
    return ''
  }
}
