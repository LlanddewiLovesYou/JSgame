
class Game {

constructor(){
  this.board = new Board()
  this.points = 10000
  this.turns = 20
}

start() {
  while (this.turns > 0 || this.points > 0) {
    this.board.makeMove()
  } console.log('Game Over')
}


playerTurn() {
  this.board.check3Vert()
  this.score()
  this.board.check3Horz()
  this.score()
  debugger
  this.board.remove3()
  debugger
  this.board.refill()
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
  return this.points
}


} //class Game

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  window.game = game
})
