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

### Getting the version of Acton installed

The action outputs the installed version in the `version` output variable. You
may use it later steps where Acton version is needed, for example creating a
cache key:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actonlang/setup-acton@v1
        id: setup-acton
      - uses: actions/checkout@v4
      - uses: actions/cache@v4
        path: |
          ~/.cache/acton
        key: acton-${{ hashFiles('**/build.act.json') }}-${{ steps.setup-acton.version }}
````
