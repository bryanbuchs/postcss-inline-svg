const { dirname, resolve } = require('path')
const { existsSync } = require('fs')

module.exports = function resolveId(file, url, opts) {
  if (opts.paths && opts.paths.length) {
    let absolutePath

    // first try to resolve the url relative to the file
    if (file) {
      relativePath = resolve(dirname(file), url)

      if (existsSync(relativePath)) {
        return relativePath
      }
    }

    // then try to resolve the url relative to the paths
    for (let path of opts.paths) {
      absolutePath = resolve(path, url)

      if (existsSync(absolutePath)) {
        return absolutePath
      }
    }

    return absolutePath
  }

  // if `paths` option not provided, resolve the url relative to the file
  if (file) {
    return resolve(dirname(file), url)
  }

  return resolve(url)
}
