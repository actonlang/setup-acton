# Setup Acton

This GitHub Action installs the [Acton programming language](https://acton-lang.org/) on your workflow runner. You can choose between the latest **stable** (default) release or the **tip** (development) version.

## Usage

Write the following to `.github/workflows/test.yml` in your repo:
```yaml
name: Test

on:
  push:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actonlang/setup-acton@v1
      - uses: actions/checkout@v4
      - name: Build Project
        run: acton build

      - name: Run Tests
        run: acton test
```
