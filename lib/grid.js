

const EMPTYGRID = [
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
  [null, null, null, null, null, null, null, null]
];

const CLASSES = ["F", "W", "C", "R", "X"]

let Plyrclass = CLASSES[Math.floor(Math.random()*CLASSES.length)]

const fill = () => {
  EMPTYGRID.forEach((column) => {
    column.forEach((space) => {
      if (space === null) {
        space = CLASSES[Plyrclass]
      }
    })
  })
}
