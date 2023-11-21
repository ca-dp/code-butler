<div align="center">
  
<img src="https://github.com/ca-dp/code-butler/assets/11391317/d9efe235-2f6a-4036-b6b2-be18d4c444c1" width="180px">

[![GitHub Super-Linter](https://github.com/ca-dp/code-butler/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/ca-dp/code-butler/actions/workflows/ci.yml/badge.svg)
![Coverage](https://github.com/ca-dp/code-butler/blob/main/badges/coverage.svg)

GitHub Action for performing code reviews using the OpenAI API.

</div>

#

## Initial Setup

`code-butler` works with GitHub Actions.  
Please refer to the following example to set up `.github/workflows/code-butler.yml`.

```yaml
name: Code Butler

permissions:
  contents: read
  pull-requests: write

on:
  issue_comment:
    types: [created]

jobs:
  review:
    if: startsWith(github.event.comment.body, '/review')
    runs-on: ubuntu-latest
    steps:
      - uses: ca-dp/code-butler@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          cmd: review
  chat:
    if: startsWith(github.event.comment.body, '/chat')
    runs-on: ubuntu-latest
    steps:
      - uses: ca-dp/code-butler@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          cmd: chat
          comment_body: ${{ github.event.comment.body }}
```

- GITHUB_TOKEN
  - This should already be available to the GitHub Action environment. This is used to add comments to the pull request.
- OPENAI_API_KEY
  - use this to authenticate with OpenAI API. You can get one here. Please add this key to your GitHub Action secrets.
- cmd
  - This is the command to run. Currently, `review` and `chat` are supported.
  - `review` will add a comment to the pull request with a code review.
  - `chat` will add a comment to the pull request with a chat message.
- model
  - This is the model to use. default is `gpt-3.5-turbo`.
- comment_body
  - This is the body of the comment that will be added to the pull request. This is only used when `cmd` is set to `chat`.
  - This is an optional parameter. The body of the comment that triggered the GitHub Action will be used.

## Features

### Code Review

<img src="https://github.com/ca-dp/code-butler/assets/11391317/351bc422-24a5-4606-b550-8338ebea78da" width="600px">

When you comment `/review` within a pull request, the AI will perform a code review for you.  
The PR Analysis section will describe the main theme, a summary of the PR, and what type of PR it is.  
The PR Feedback section provides suggestions and constructive feedback on the code.  
The Security concerns section will also point out any security concerns you may have.  

### Chat

![スクリーンショット 2023-10-05 午後2 06 20](https://github.com/ca-dp/code-butler/assets/11391317/543c3340-0174-421b-b916-3e08542df0aa)

When you comment `/chat` within a pull request, the AI will respond to your comment.  
Basically any question can be answered.  
You will be able to communicate with ChatGPT on PR as well.  

## License

This project is licensed under the MIT License.  
see the [LICENSE](LICENSE) file for details.
