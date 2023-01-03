import fs from 'fs'

const copy = (filePath, copyTo) => {
    fs.copyFile(filePath, copyTo, (error) => {
      if (error) {
        console.error("can't copy", filePath, " to ", copyTo)
        return
      } else {
        console.log(filePath, ' has been moved to ', copyTo)
        return
      }
    })
}
copy('./package.json', './dist/package.json')
copy('./README.md', './dist/README.md')