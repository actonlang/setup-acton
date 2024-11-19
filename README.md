# Setup Acton

This GitHub Action installs the [Acton programming language](https://acton-lang.org/) on your workflow runner. You can choose between the latest **stable** (default) release or the **tip** (development) version.

## Usage

```yaml
name: Build and Test

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actonlang/setup-acton@v1
      - name: Build Project
        run: acton build

      - name: Run Tests
        run: acton test
```
