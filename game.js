const readlineSync = require('readline-sync')
const { randomInt, randomIntEx } = require('./tools')

const GAME_ERROR = { code: 'GAME_ERROR', errno: 2 }

const gates = ['goat', 'goat', 'goat']
let result = ''

class GameError extends Error {
  constructor(message, error) {
    super(message)
    this.name = 'GameError'
    this.code = error.code
    this.errno = error.errno
  }
  toString() {
    return `${this.name} ${this.code}: ${this.message}`
  }
}

const game = () => {
  try {
    // Initialisation : choose a gate for the car
    const c = randomInt(1, 3)
    gates[c - 1] = 'car'
    console.log(gates)
    // Player choose a gate
    const g1 = Number(readlineSync.question('Choose a gate [1; 2; 3] : '))
    // Presentator choose a gate
    const p = randomIntEx(1, 3, c, g1)
    console.log(`The presentator tells you that there is a goat behind gate ${p}.`)
    // Decide to change or keep gate
    if (readlineSync.keyInYNStrict(`Do you want to change gate ?`)) {
      // Y : Change gate
      const g2 = randomIntEx(1, 3, g1, p)
      console.log(`You change for gate ${g2}.`)
      if (g2 === c) { result = 'win' } else { result = 'loose' }
    } else {
      // N : Keep gate
      console.log(`You keep gate ${g1}.`)
      if (g1 === c) { result = 'win' } else { result = 'loose' }
    }
    return console.log(`You ${result} the car !`)
  } catch (e) {
    throw new GameError(e.message, GAME_ERROR)
  }
}

exports.game = game


