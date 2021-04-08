const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { game } = require('./game')

const LAUNCH_ERROR = { code: 'LAUNCH_ERROR', errno: 2 }

class LaunchError extends Error {
  constructor(message, error) {
    super(message)
    this.name = 'LaunchError'
    this.code = error.code
    this.errno = error.errno
  }
  toString() {
    return `${this.name} ${this.code}: ${this.message}`
  }
}

// Check command
if (process.argv.length !== 3) {
  console.log(chalk.blue('usage: node main.js name'))
  process.exit(1)
}

// Log

// Launch game

const launch = () => {
  try {

    const firstName = process.argv[2]
    let isRunning = true
    console.log(`Hello ${firstName}, welcome to Monty Hall !`)

    if (readlineSync.keyInYNStrict('Ready to play ?')) {
      game()
    } else {
      console.log(`Goodbye ${firstName} !`)
      isRunning = false
      process.exit(0)
    }
    while (isRunning) {
      if (readlineSync.keyInYNStrict(`${firstName}, do you want to play again ?`)) {
        game()
      } else {
        console.log(`Goodbye ${firstName} !`)
        isRunning = false
        process.exit(0)
      }
    }

  } catch (e) {
    throw new LaunchError(e.message, LAUNCH_ERROR)
  }
}
launch()
