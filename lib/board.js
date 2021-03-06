// import  DOMNodeCollection from "./YayQuery/dom_node_collection";
// import YayQuery from "./YayQuery/main";


let emptyGrid = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null]
];

const classes = ["F", "W", "C", "R", "X"]


class Board {

  constructor() {
    this.grid = this.fill()
    this.fill = this.fill.bind(this)
    this.check3Vert = this.check3Vert.bind(this)
    this.remove3 = this.remove3.bind(this)
    this.refill = this.refill.bind(this)
    this.columnGravity = this.columnGravity.bind(this)
    this.moves = 20
    this.points = 10000
    this.move = []
    this.limit = new Sound('assets/sound/limit.mp3')

  }


// NOTE: BOARD SETUP
  fill() {
    let newGrid = emptyGrid.slice(0);
    this.grid = newGrid
    this.grid = newGrid.map((column) => {
      return column.map((space) => {
        if (space === null) {
          return space = classes[Math.floor(Math.random()*classes.length)]
        }
      })
    })
    this.addHeroes()

    return this.grid
  }


  // readyBoard() {
  //   let matches = true
  //   while (matches === true) {
  //     this.check3Horz()
  //     this.check3Vert()
  //     console.log(this.anyMatches(this))
  //     matches = this.anyMatches(this)
  //     this.remove3()
  //     this.refill()
  //   }
  // }
  //
  //
  // anyMatches(board) {
  //   board.grid.forEach((column) => {
  //     column.forEach((space) => {
  //       if (space === 'match') {
  //         return true
  //       }
  //     })
  //   })
  //   return false
  // }

  // makeMove(click) {
  //     let clickPos = click.target
  //     let pos
  //     if (!clickPos.id) {
  //        pos = clickPos.parentElement.id.split(',')
  //        console.log(pos)
  //     } else {
  //        pos = clickPos.id.split(',')
  //        console.log(pos)
  //     }
  //     this.move.push(pos)
  //     if (this.move.length === 2) {
  //       // $l(`#${pos[0]}, ${pos[1]}`).addClass('animate flip')
  //       this.swapHeroes(this.move[0], this.move[1])
  //       this.move = []
  //       setTimeout(game.playerTurn(), 3000)
  //     }
  // }

  addHeroes() {
    let DOMel
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        let heroClass = this.grid[i][j]
        let pos = [i,j]
        this.addHero(heroClass, pos)
      }
    }
  }

addHero(heroClass, pos, animation = '') {
  const i = pos[0]
  const j = pos[1]
  let DOMel
  switch (heroClass) {
    case 'F':
    DOMel = $l(`#${i},${j}`)
    DOMel.append(`<img class="hero animated ${animation}" src="./assets/fighter.png"></img>`)
    break
    case 'W':
    DOMel = $l(`#${i},${j}`)
    DOMel.append(`<img class="hero animated ${animation}" src="./assets/blackmage.png"></img>`)
    break
    case 'C':
    DOMel = $l(`#${i},${j}`)
    DOMel.append(`<img class="hero animated ${animation}" src="./assets/cleric.png"></img>`)
    break
    case 'R':
    DOMel = $l(`#${i},${j}`)
    DOMel.append(`<img class="hero animated ${animation}" src="./assets/rogue.png"></img>`)
    break
    case 'X':
    DOMel = $l(`#${i},${j}`)
    DOMel.append(`<img class="hero animated ${animation}" src="./assets/chocobo.png"></img>`)
    break
  }
}

// NOTE: MATCH CHECKING
  check3Vert(grid){
    //checks the board for combinations of three in each COLUMN
    let newGrid = this.grid.slice(0)
    return newGrid.map((column, i) => {
      return column.map((element, j) => {
        if (element === column[j+1] && element === column[j+2]) {
          column[j] = 'match'
          column[j+1] = 'match'
          column[j+2] = 'match'
          return 'match'
        } else {
          return element
        }
      })
      })
      this.grid = newGrid
    }


  check3Horz(){
    //checks the board for combinations of three in each ROW
    this.grid = this.grid.transpose()
    this.check3Vert()
    this.grid = this.grid.transpose()
    return this.grid
  }

  remove3() {
    //removes 3 matching pieces from the board
    let newGrid = this.grid.map((column, i) => {
      column = column.removeMatches(i)
      return column
    })
    this.grid = newGrid
  }

  matchAnimation(){
    this.grid.forEach((column, i) => {
      column.forEach((el, j) => {
        if (el === 'match') {
          this.limit.play()
          $l(`#${i},${j}`).children().animate('zoomOut')
        }
      })
    })
  }

  columnGravity() {
    for (let i = 0; i < 8; i++) {
      if (this.grid[i].length < 8) {
        for (let j = 0; j < 8; j++) {
          $l(`#${i},${j}`).empty()
            if (this.grid[i][j]) {
              this.addHero(this.grid[i][j], [i,j])
            }
        }
      }
    }
  }

  refill() {
    let newGrid = this.grid.slice(0)
    this.columnGravity()
    this.grid.map((column, i) => {
        while (column.length < 8) {
          let heroClass = classes[Math.floor(Math.random()*classes.length)]
          column.push(heroClass)
          this.addHero(heroClass,[i, column.length - 1], 'lightSpeedIn')
        }
    })
  }


// NOTE: MOVE HANDLING, GIT TEST
  swapHeroes (select1, select2) {
    let space1 = this.grid[select1[0]][select1[1]].slice(0)
    let space2 = this.grid[select2[0]][select2[1]].slice(0)
      this.grid[select1[0]][select1[1]] = space2
      this.grid[select2[0]][select2[1]] = space1
      $l(`#${select2[0]},${select2[1]}`).empty()
      $l(`#${select1[0]},${select1[1]}`).empty()
      this.addHero(space1, select2)
      this.addHero(space2, select1)
  }


} //class Board


//NOTE: HELPER METHODS


Array.prototype.removeMatches = function (i) {
  let newArray = []
  this.forEach((el, j) => {
    if (el !== 'match') {
      newArray.push(el)
    } else {
      $l(`#${i},${j}`).empty()
    }
  })
  return newArray
}


Array.prototype.transpose = function() {
  const columns = Array.from(
    { length: this[0].length },
    () => Array.from({ length: this.length })
  );
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      columns[j][i] = this[i][j];
    }
  }
  return columns;
};


// export.module Board;
