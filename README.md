# watch-and-copy-files-recursively

## Install

```sh
npm i watch-and-copy-files-recursively
```

## Usage

```sh
watch-and-copy-files-recursively <from> [<from>, <from>, ...] [to]
```

### In your `package.json`

Script in package.json

```json
{
  "scripts": {
    "build": "watch-and-copy-files-recursively src/**/*.{sql,json} dist",
    "watch": "watch-and-copy-files-recursively --watch src/**/*.{sql,json} dist"
  }
}
```