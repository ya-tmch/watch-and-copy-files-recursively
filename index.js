const chokidar = require('chokidar');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

let watch = false

const args = process.argv.slice(2).filter(arg => {
  if (arg === '--watch') {
    watch = true
    return false
  }

  return true
})

if (args.length < 2) {
  console.error('Not enough arguments: watch-and-copy-files-recursively <sources> <target>');
  process.exit(1);
}

const sources = args.slice(0, args.length - 1)
const target = args.slice(args.length - 1)[0]

function getTargetPath(fromPath) {
  const toPath = path.join(target, fromPath)
  mkdirp.sync(path.dirname(toPath))
  return toPath
}

function onAddDir(path) {

}

function onRemoveDir(path) {

}

function onRemove(path) {

}

function onChange(fromPath) {
  if (fs.statSync(fromPath).isDirectory()) {
    return;
  }

  fs.writeFileSync(
    getTargetPath(fromPath), fs.readFileSync(fromPath)
  );
}

const watcher = chokidar.watch(sources, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', onChange)
  .on('change', onChange)
  .on('unlink', onRemove)
  .on('addDir', onAddDir)
  .on('unlinkDir', onRemoveDir)
  .on('ready', () => {
    if (!watch) {
      process.exit(0)
    }
  })
  .on('error', error => {
    console.error(error);
    process.exit(1);
  });
