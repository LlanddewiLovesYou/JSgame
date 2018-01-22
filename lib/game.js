
class Game {

constructor(){
  this.board = new Board()
  this.points = 10000
  this.turns = 20
  $l('.points').append(`${this.points}`)
  $l('.turns').append(`${this.turns}`)
}

start() {
  while (this.turns > 0 || this.points > 0) {
    this.board.makeMove()
  } console.log('Game Over')
}


playerTurn() {
  this.turns = this.turns - 1
  $l('.turns').empty()
  $l('.turns').append(`${this.turns}`)
  let match = true
  while (match) {
    this.board.check3Vert()
    this.score()
    this.board.check3Horz()
    this.score()
    match = this.confirmMatch()
    this.board.remove3()
    this.board.refill()
    debugger
  }
}

confirmMatch() {
  let count = 0
  this.board.grid.forEach((column) => {
    column.forEach((element) => {
      if (element === 'match') {
        count ++
      }
    })
  })
  if (count/3 > 0) {
    console.log(count/3)
    return true
  } else {
    return false
  }
}

score() {
  let count = 0
  this.board.grid.forEach((column) => {
    column.forEach((element) => {
      if (element === 'match') {
        count ++
      }
    })
  })
  console.log(this.points)
  this.points = this.points - ((count/3) * 250)
  $l('.points').empty()
  $l('.points').append(`${this.points}`)
  return this.points
}


} //class Game

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  window.game = game
  game.start
})
