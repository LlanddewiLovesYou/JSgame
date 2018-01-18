
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
    this.col1 = this.grid[0]
    this.col2 = this.grid[1]
    this.col3 = this.grid[2]
    this.col4 = this.grid[3]
    this.col5 = this.grid[4]
    this.col6 = this.grid[5]
    this.col7 = this.grid[6]
    this.col8 = this.grid[7]
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
    return this.grid.map((column, i) => {
      return column.map((element, i) => {
        if (element === column[i+1] && element === column[i+2]) {
          column[i+1] = false
          column[i+2] = false
          return false
        } else {
          return element
        }
      })
      })
    }


  check3Horz(){
    //checks the board for combinations of three in each ROW
    debugger
    let transposed = this
    transposed.grid = transposed.grid.transpose()
    debugger
    let checked = transposed.check3Vert()
    debugger
    return checked.transpose()
  }

  remove3() {
    //removes 3 matching pieces from the board
  }

  refill() {
    //refills a column or row with new random heros
  }




} //class Grid

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
