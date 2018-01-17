const fs = require('fs')
const path = require('path')

const summaryFile = path.join(__dirname, '../SUMMARY.md')

if (fs.existsSync(summaryFile)) {
  fs.unlinkSync(summaryFile)
}

const packageSort = (a, b) => {
  if (a === 'redux-subspace') {
    return -1
  } else if (b === 'redux-subspace') {
    return 1
  } else {
    return a.localeCompare(b)
  }
}

const summary = fs.readdirSync(path.join(__dirname, '../packages'))
  .sort(packageSort)
  .reduce((current, package) => {
    const packageSummaryFile = path.join(__dirname, '../packages', package, 'docs', 'README.md')

    if (fs.existsSync(packageSummaryFile)) {

      console.log(`Adding summary for ${package} from ${packageSummaryFile}`)
      const packageSummary = fs.readFileSync(packageSummaryFile).toString().trim()
      return `${current}\n\n### ${package}\n\n${packageSummary}`
    } else {
      return current
    }
  }, fs.readFileSync(path.join(__dirname, '../docs', 'README.md')).toString().trim())

fs.writeFileSync(path.join(__dirname, '../SUMMARY.md'), summary)
