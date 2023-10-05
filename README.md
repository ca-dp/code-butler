# Code-Butler

[![GitHub Super-Linter](https://github.com/ca-dp/code-butler/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/ca-dp/code-butler/actions/workflows/ci.yml/badge.svg)
![Coverage](https://github.com/ca-dp/code-butler/blob/main/badges/coverage.svg)

GitHub Action for performing code reviews using the OpenAI API.

## Initial Setup

`code-butler` works with GitHub Actions.
Please refer to the following example to set up `.github/workflows/code-butler.yml`.

```yaml
name: Code Butler

permissions:
  contents: read
  issues: write
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
- comment_body
  - This is the body of the comment that will be added to the pull request. This is only used when `cmd` is set to `chat`.
  - This is an optional parameter. The body of the comment that triggered the GitHub Action will be used.

## License

This project is licensed under the MIT License.  
see the [LICENSE](LICENSE) file for details.
