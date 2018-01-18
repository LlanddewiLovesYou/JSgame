
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
    // this.col1 = this.grid[0]
    // this.col2 = this.grid[1]
    // this.col3 = this.grid[2]
    // this.col4 = this.grid[3]
    // this.col5 = this.grid[4]
    // this.col6 = this.grid[5]
    // this.col7 = this.grid[6]
    // this.col8 = this.grid[7]
    this.fill = this.fill.bind(this)
    this.check3Vert = this.check3Vert.bind(this)

}


  fill() {
    let newGrid = emptyGrid.slice(0);
    this.grid = newGrid
    return newGrid.map((column) => {
      return column.map((space) => {
        if (space === null) {
          return space = classes[Math.floor(Math.random()*classes.length)]
        }
    })
  })
}

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



} //class Grid


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
