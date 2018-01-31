
class Game {

constructor() {
  this.board = new Board()
  this.points = 10000
  this.turns = 20
  $l('.points').append(`${this.points}`)
  $l('.turns').append(`${this.turns}`)
  this.match = false
  this.playerTurn = this.playerTurn.bind(this)
  this.board.remove3 = this.board.remove3.bind(this)
  this.board.refill = this.board.refill.bind(this)
  this.dialogUp = this.dialogUp.bind(this)
  this.round = this.round.bind(this)
  this.tinkle = new Sound('assets/sound/tinkle.mp3')
  // this.victory = new Sound('assets/sound/victory.mp3')
  // this.battle = new Sound('assets/sound/battle.mp3')
  // this.readyBoard = this.readyBoard.bind(this)
}


readyBoard() {
  let matches = true
  while (matches === true) {
    this.board.check3Horz()
    this.board.check3Vert()
    console.log(this.anyMatches(this.board))
    this.board.remove3()
    this.board.refill()
    matches = this.anyMatches(this.board)
  }
}

anyMatches() {
  for (var i = 0; i < this.board.grid.length; i++) {
    for (var j = 0; j < this.board.grid[i].length; j++) {
      if (this.board.grid[i][j] === 'match') {
        return true
      }
    }
  }
  return false
}

play() {
  this.readyBoard()
  // this.battle.play()
  $l('.gameboard').on('click', this.makeMove.bind(this))
  this.dialog('what\'s up?')


}

dialog(message) {
  this.dialogDown()
  this.dialogUp(message)
  setTimeout(this.dialogDown, 3000)

}

round() {
  this.board.check3Vert()
  this.score()
  this.board.check3Horz()
  this.score()
  this.match = this.confirmMatch()
  this.board.matchAnimation()
  setTimeout(() => {
    if (this.match === true) {
      const enemyTalk = ["Ow! Stop that!", 'Dude, quit it!', 'Can you not?']
      this.dialog(enemyTalk[Math.floor(Math.random() * 3)] )
      $l('#enemy').animate('shake')
      setTimeout(this.round, 1000)
    }
    this.board.remove3()
    this.board.refill()
  }, 1000)
}


playerTurn() {
  this.turns = this.turns - 1
  $l('.turns').empty()
  $l('.turns').append(`${this.turns}`)
  this.round()
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

makeMove(click) {
    let clickPos = click.target
    let pos
    if (!clickPos.id) {
       pos = clickPos.parentElement.id.split(',')
       console.log(pos)
    } else {
       pos = clickPos.id.split(',')
       console.log(pos)
    }
    this.board.move.push(pos)
    if (this.board.move.length === 2) {
      $l(`#${this.board.move[0][0]},${this.board.move[0][1]}`).children().animate('bounce')
      $l(`#${pos[0]},${pos[1]}`).children().animate('bounce')
      setTimeout(() => {this.board.swapHeroes(this.board.move[0], this.board.move[1])
      this.board.move = []
      game.playerTurn()
      if (this.points <= 0) {
        $l('.points').empty()
        $l('.points').append('000')

        this.dialog("Arrrrrrgggg! You have defated me!")
      } else if (this.turns == 0){
        this.dialog("Ha! Ha! Ha! Game Over!!!")
      }
    }, 1000)}
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
  // debugger
  return this.points
}

// NOTE: Helper METHODS

dialogUp(message) {
  $l('#message').append("<img id='speech-bubble' src='./assets/pixel-speech-bubble-favicon.png'/>")
  $l('#message').append(`<div class="message-text" id='message-text'>${message}</div>`)
}

dialogDown(){
  $l('#message').empty()
  $l('#message').children().empty()
}

} //class Game

class Sound {

constructor (src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("autoplay", "true");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
  }

    play() {
      $l('#audio').append(`${this.sound}`)

    }

    stop() {
      $l('#audio').empty()

    }

}

document.addEventListener('DOMContentLoaded', () => {
  const readyBoard = function () {
    let matches = true
    while (matches === true) {
      this.board.check3Horz()
      this.board.check3Vert()
      console.log(this.anyMatches(this.board))
      matches = this.anyMatches(this.board)
      this.board.remove3()
      this.board.refill()
    }
  }

  const game = new Game()
  // const ready = game.board.readyBoard()

  // game.board = ready
  window.game = game
  game.play()
})
