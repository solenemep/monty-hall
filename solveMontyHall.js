const chalk = require('chalk')
const { randomInt, randomIntEx } = require('./tools')


// Check command
if (process.argv.length !== 2) {
  console.log(chalk.blue('usage: node solveMontyHall.js'))
  process.exit(1)
}

let resultChange = ''
let resultKeep = ''

const changeGate = () => {
  const cC = randomInt(1, 3)
  const g1C = randomInt(1, 3)
  const pC = randomIntEx(1, 3, cC, g1C)
  // Decide to change gate
  const g2C = randomIntEx(1, 3, g1C, pC)
  if (g2C === cC) { resultChange = 'win' } else { resultChange = 'loose' }
  return resultChange
}

const keepGate = () => {
  const cK = randomInt(1, 3)
  const g1K = randomInt(1, 3)
  const pK = randomIntEx(1, 3, cK, g1K)
  // Decide to keep gate
  if (g1K === cK) { resultKeep = 'win' } else { resultKeep = 'loose' }
  return resultKeep
}

// Launch stats
let winChange = 0
let winKeep = 0
let sample = 1000000

for (i = 0; i < sample; i++) {
  changeGate()
  if (resultChange === 'win') { winChange++ }
}

for (i = 0; i < sample; i++) {
  keepGate()
  if (resultKeep === 'win') { winKeep++ }
}

console.log(`Calculated on a range of ${sample} tentatives, 
if you change gate you have a probability of ${winChange * 100 / sample} to win, whereas 
if you keep gate you have a probability of ${winKeep * 100 / sample} to win.`)
