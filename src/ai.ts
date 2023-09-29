import OpenAI from 'openai'

export async function completionRequest(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  try {
    const openai = new OpenAI({ apiKey })
    const response = await openai.chat.completions.create(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-3.5-turbo'
      },
      {
        timeout: 60 * 1000 // 60s
      }
    )
    if (
      response.choices &&
      response.choices[0] &&
      response.choices[0].message
    ) {
      return response.choices[0].message.content || ''
    } else {
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
