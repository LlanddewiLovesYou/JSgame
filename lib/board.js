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

    this.move = []

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
    $l('.gameboard').on('click', (click) => {
      let clickPos = click.target
      let pos
      if (!clickPos.id) {
         pos = clickPos.parentElement.id.split(',')
         console.log(pos)
      } else {
         pos = clickPos.id.split(',')
         console.log(pos)
      }
      this.move.push(pos)
      if (this.move.length === 2) {
        this.swapHeroes(this.move[0], this.move[1])
        this.move = []
      }
    })
    return this.grid
  }

  addHeroes() {
    let DOMel
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        let hero = this.grid[i][j]
        switch (hero) {
          case 'F':
          DOMel = $l(`#${i},${j}`)
          DOMel.append('<img class="hero" src="./assets/fighter.png"></img>')
          break
          case 'W':
          DOMel = $l(`#${i},${j}`)
          DOMel.append('<img class="hero" src="./assets/blackmage.png"></img>')
          break
          case 'C':
          DOMel = $l(`#${i},${j}`)
          DOMel.append('<img class="hero" src="./assets/cleric.png"></img>')
          break
          case 'R':
          DOMel = $l(`#${i},${j}`)
          DOMel.append('<img class="hero" src="./assets/rogue.png"></img>')
          break
          case 'X':
          DOMel = $l(`#${i},${j}`)
          DOMel.append('<img class="hero" src="./assets/chocobo.png"></img>')
          break
        }
      }
    }
  }


// NOTE: MATCH CHECKING
  check3Vert(){
    //checks the board for combinations of three in each COLUMN
    let newGrid = this.grid.slice(0)
    return newGrid.map((column, i) => {
      return column.map((element, i) => {
        if (element === column[i+1] && element === column[i+2]) {
          column[i] = 'match'
          column[i+1] = 'match'
          column[i+2] = 'match'
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
    let transposed = this
    transposed.grid = transposed.grid.transpose()
    let checked = transposed.check3Vert()
    return checked.transpose()
  }

  remove3() {
    //removes 3 matching pieces from the board
    let newGrid = this.grid.map((column) => {
      column = column.removeMatches()
      return column
    })
    this.grid = newGrid
  }

  refill() {
    let newGrid = this.grid.slice(0)
    this.grid.map((column) => {
      while (column.length < 8) {
        column.push(classes[Math.floor(Math.random()*classes.length)])
      }
    })
  }


// NOTE: MOVE HANDLING
  swapHeroes (select1, select2) {
    let space1 = this.grid[select1[0]][select1[1]]
    let space2 = this.grid[select2[0]][select2[1]]
    let hero1 = $l(`#${select1[0]},${select1[1]}`).children()
    let hero2 = $l(`#${select2[0]},${select2[1]}`).children()
    let movedHero1 = $l(`#${select2[0]},${select2[1]}`).children()
    let movedHero2 = $l(`#${select1[0]},${select1[1]}`).children()
      this.grid[select1[0]][select1[1]] = space2
      this.grid[select2[0]][select2[1]] = space1

      hero1 = movedHero1
      hero2 = movedHero2
      // $l(`#${select1[0]}, ${select1[1]}`).children() = hero1
      // $l(`#${select2[0]}, ${select2[1]}`).children() = hero2
  }


} //class Board


//HELPER METHODS


Array.prototype.removeMatches = function () {
  let newArray = []
  this.forEach((el) => {
    if (el !== 'match') {
      newArray.push(el)
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
// export default Board;
