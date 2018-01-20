
class Game {

constructor(){
  this.board = new Board()
}

playerTurn() {

  // this.board.makeMove()
  this.board.check3Vert()
  this.board.check3Horz()
  this.board.remove3()
  this.board.refill()
}





} //class Game

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  window.game = game
})
