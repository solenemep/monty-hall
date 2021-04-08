const randomInt = (min, max) => {
  return int = Math.floor(Math.random() * max) + min
}

const randomIntEx = (min, max, ex1, ex2) => {
  let int = randomInt(min, max)
  while (int === ex1 || int === ex2) {
    int = randomInt(min, max)
  }
  return int
}

exports.randomInt = randomInt
exports.randomIntEx = randomIntEx