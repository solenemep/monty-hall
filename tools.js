const TOOLS_ERROR = { code: 'TOOLS_ERROR', errno: 3 }

class ToolsError extends Error {
  constructor(message, error) {
    super(message)
    this.name = 'ToolsError'
    this.code = error.code
    this.errno = error.errno
  }
  toString() {
    return `${this.name} ${this.code}: ${this.message}`
  }
}

const randomInt = (min, max) => {
  try {
    return int = Math.floor(Math.random() * max) + min
  } catch (e) {
    throw new ToolsError(e.message, TOOLS_ERROR)
  }
}

const randomIntEx = (min, max, ex1, ex2) => {
  try {
    let int = randomInt(min, max)
    while (int === ex1 || int === ex2) {
      int = randomInt(min, max)
    }
    return int
  } catch (e) {
    throw new ToolsError(e.message, TOOLS_ERROR)
  }
}

exports.randomInt = randomInt
exports.randomIntEx = randomIntEx