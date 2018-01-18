
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
    this.grid = emptyGrid
    this.col1 = this.grid[1]
    this.col2 = this.grid[2]
    this.col3 = this.grid[3]
    this.col4 = this.grid[4]
    this.col5 = this.grid[5]
    this.col6 = this.grid[6]
    this.col7 = this.grid[7]
    this.col8 = this.grid[8]

  }

  fill() {
    emptyGrid.forEach((column) => {
      column.map((space) => {
        if (space === null) {
          space = classes[randClass]
        }
        return emptyGrid
      })
    })
  }








  //helper methods

  //helper for Grid.fill
  randClass(){
    return classes[Math.floor(Math.random()*classes.length)]
  }

} //class Grid
// export default Board;
