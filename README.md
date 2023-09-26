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
  pull-requests: write

on:
  issue_comment:
    types: [created]

jobs:
    code-butler:
        if: startsWith(github.event.comment.body, '/review')
        runs-on: ubuntu-latest
        steps:
        - uses: ca-dp/code-butler@latest
          with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

- GITHUB_TOKEN
  - This should already be available to the GitHub Action environment. This is used to add comments to the pull request.
- OPENAI_API_KEY
  - use this to authenticate with OpenAI API. You can get one here. Please add this key to your GitHub Action secrets.

## License

This project is licensed under the MIT License.  
see the [LICENSE](LICENSE) file for details.
