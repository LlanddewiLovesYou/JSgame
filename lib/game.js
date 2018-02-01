
class Game {

constructor() {
  this.board = new Board()
  this.points = 12000
  this.turns = 20
  $l('.points').append(`${this.points}`)
  $l('.turns').append(`${this.turns}`)
  this.match = false
  this.playerTurn = this.playerTurn.bind(this)
  this.board.remove3 = this.board.remove3.bind(this)
  this.board.refill = this.board.refill.bind(this)
  this.dialog = this.dialog.bind(this)
  this.dialogUp = this.dialogUp.bind(this)
  this.round = this.round.bind(this)
  this.play = this.play.bind(this)
  // this.tinkle = new Sound('assets/sound/tinkle.mp3')
  this.victorySound = new Sound('assets/sound/victory.mp3')
  this.battle = new Sound('assets/sound/battle.mp3')
  this.limit = new Sound('assets/sound/limit.mp3')
  this.win = false
  // this.readyBoard = this.readyBoard.bind(this)
}


readyBoard() {
  // this.battle.play()
  this.victorySound.stop()
  // this.tinkle.play()
  this.turns = 20
  this.points = 12000
  $l('#enemy').empty()
  $l('#enemy').append("<img src='./assets/Tiamat-ff1-gba.png' id='enemy' class='animated'>")
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

anyMatches(board) {
  for (var i = 0; i < board.grid.length; i++) {
    for (var j = 0; j < board.grid[i].length; j++) {
      if (board.grid[i][j] === 'match') {
        this.limit.play()
        return true
      }
    }
  }
  return false
}

play() {
  this.victorySound.stop()
  this.readyBoard()

  this.battle.play()
  $l('.gameboard').on('click', this.makeMove.bind(this))
  this.dialog('Who dares to challenge me!?')
  setTimeout(() => this.dialog('Foolish Mortals!!!'), 3000)
  setTimeout(() => this.dialog('All of your base are belong to me!'), 6500)


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
    if (this.checkVictory() === true){
      this.victory()
    }
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
      if (this.turns === 0) {
        setTimeout( ()=> {
        $l('#enemy').on('click', () => {
          location.reload()
        })
        this.dialog("Ha! Ha! Ha! Game Over!!!")
          setTimeout(() => { this.dialogUp("Click me to play again if you DARE!!!")}, 3500)
          $l('#enemy').addClass('infinite')
          $l('#enemy').addClass('bounce')}, 5000)
      }
    }, 1000)}
}

checkVictory(){
  if (this.points <= 0) {
    return true
  } else
  return false
}

victory(boolean) {
  // if(this.win === true) {break}
  console.log(this.win)
  if (this.points <= 0 && this.win === false) {
    this.battle.stop()
    this.victorySound.play()

    $l('.points').empty()
    $l('.points').append('0')

    this.dialog("Arrrrrrgggg! You have defated me!")
    $l('#enemy').on('click', () => {
      location.reload()
    })
    setTimeout(() => $l('#enemy').animate('zoomOutUp'), 3000)
    setTimeout(() => $l('#enemy').empty(), 4000)
    setTimeout(() => $l('#enemy').append(`<img src='assets/grave.png' id='enemy' class="animate bounceIn"/>`), 4500)
    setTimeout(() => this.dialogUp('Play Again? Click my headstone and resurrect me.'), 3000)
    this.win = true
  } else if (this.turns === 0) {

    this.dialog("Ha! Ha! Ha! Game Over!!!")
    setTimeout(() => $l('#enemy').animate('infinite bounce'), 3000)
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
    // this.sound.setAttribute("autoplay", "false");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
  }

    play(sound) {
      this.sound.play()

    }

    stop(sound) {
      this.sound.pause()

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
