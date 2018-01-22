/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

alert('Helloworld');

debugger;
console.log(_board2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import  DOMNodeCollection from "./YayQuery/dom_node_collection";
// import YayQuery from "./YayQuery/main";


var emptyGrid = [[null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null]];

var classes = ["F", "W", "C", "R", "X"];

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.grid = this.fill();
    this.fill = this.fill.bind(this);
    this.check3Vert = this.check3Vert.bind(this);
    this.remove3 = this.remove3.bind(this);
    this.refill = this.refill.bind(this);
    this.columnGravity = this.columnGravity.bind(this);
    this.move = [];
  }

  // NOTE: BOARD SETUP


  _createClass(Board, [{
    key: "fill",
    value: function fill() {
      var newGrid = emptyGrid.slice(0);
      this.grid = newGrid;
      this.grid = newGrid.map(function (column) {
        return column.map(function (space) {
          if (space === null) {
            return space = classes[Math.floor(Math.random() * classes.length)];
          }
        });
      });
      this.addHeroes();
      $l('.gameboard').on('click', this.makeMove.bind(this));
      return this.grid;
    }
  }, {
    key: "makeMove",
    value: function makeMove(click) {
      var clickPos = click.target;
      var pos = void 0;
      if (!clickPos.id) {
        pos = clickPos.parentElement.id.split(',');
        console.log(pos);
      } else {
        pos = clickPos.id.split(',');
        console.log(pos);
      }
      this.move.push(pos);
      if (this.move.length === 2) {
        this.swapHeroes(this.move[0], this.move[1]);
        this.move = [];
        setInterval(game.playerTurn(), 1000);
      }
    }
  }, {
    key: "addHeroes",
    value: function addHeroes() {
      var DOMel = void 0;
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
          var heroClass = this.grid[i][j];
          var pos = [i, j];
          this.addHero(heroClass, pos);
        }
      }
    }
  }, {
    key: "addHero",
    value: function addHero(heroClass, pos) {
      var i = pos[0];
      var j = pos[1];
      var DOMel = void 0;
      switch (heroClass) {
        case 'F':
          DOMel = $l("#" + i + "," + j);
          DOMel.append('<img class="hero" src="./assets/fighter.png"></img>');
          break;
        case 'W':
          DOMel = $l("#" + i + "," + j);
          DOMel.append('<img class="hero" src="./assets/blackmage.png"></img>');
          break;
        case 'C':
          DOMel = $l("#" + i + "," + j);
          DOMel.append('<img class="hero" src="./assets/cleric.png"></img>');
          break;
        case 'R':
          DOMel = $l("#" + i + "," + j);
          DOMel.append('<img class="hero" src="./assets/rogue.png"></img>');
          break;
        case 'X':
          DOMel = $l("#" + i + "," + j);
          DOMel.append('<img class="hero" src="./assets/chocobo.png"></img>');
          break;
      }
    }

    // NOTE: MATCH CHECKING

  }, {
    key: "check3Vert",
    value: function check3Vert(grid) {
      //checks the board for combinations of three in each COLUMN
      var newGrid = this.grid.slice(0);
      return newGrid.map(function (column, i) {
        return column.map(function (element, j) {
          if (element === column[j + 1] && element === column[j + 2]) {
            column[j] = 'match';
            column[j + 1] = 'match';
            column[j + 2] = 'match';
            return 'match';
          } else {
            return element;
          }
        });
      });
      this.grid = newGrid;
    }
  }, {
    key: "check3Horz",
    value: function check3Horz() {
      //checks the board for combinations of three in each ROW
      this.grid = this.grid.transpose();
      this.check3Vert();
      this.grid = this.grid.transpose();
      return this.grid;
    }
  }, {
    key: "remove3",
    value: function remove3() {
      //removes 3 matching pieces from the board
      var newGrid = this.grid.map(function (column, i) {
        column = column.removeMatches(i);
        return column;
      });
      this.grid = newGrid;
    }
  }, {
    key: "columnGravity",
    value: function columnGravity() {
      for (var i = 0; i < 8; i++) {
        if (this.grid[i].length < 8) {
          for (var j = 0; j < 8; j++) {
            $l("#" + i + "," + j).empty();
            if (this.grid[i][j]) {
              this.addHero(this.grid[i][j], [i, j]);
            }
          }
        }
      }
    }
  }, {
    key: "refill",
    value: function refill() {
      var _this = this;

      var newGrid = this.grid.slice(0);
      this.columnGravity();
      this.grid.map(function (column, i) {
        while (column.length < 8) {
          var heroClass = classes[Math.floor(Math.random() * classes.length)];
          column.push(heroClass);
          _this.addHero(heroClass, [i, column.length - 1]);
        }
      });
    }

    // NOTE: MOVE HANDLING, GIT TEST

  }, {
    key: "swapHeroes",
    value: function swapHeroes(select1, select2) {
      var space1 = this.grid[select1[0]][select1[1]].slice(0);
      var space2 = this.grid[select2[0]][select2[1]].slice(0);
      this.grid[select1[0]][select1[1]] = space2;
      this.grid[select2[0]][select2[1]] = space1;
      $l("#" + select2[0] + "," + select2[1]).empty();
      $l("#" + select1[0] + "," + select1[1]).empty();
      this.addHero(space1, select2);
      this.addHero(space2, select1);
    }
  }]);

  return Board;
}(); //class Board


//HELPER METHODS


Array.prototype.removeMatches = function (i) {
  var newArray = [];
  this.forEach(function (el, j) {
    if (el !== 'match') {
      newArray.push(el);
    } else {

      $l("#" + i + "," + j).empty();
    }
  });
  return newArray;
};

Array.prototype.transpose = function () {
  var _this2 = this;

  var columns = Array.from({ length: this[0].length }, function () {
    return Array.from({ length: _this2.length });
  });
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      columns[j][i] = this[i][j];
    }
  }
  return columns;
};

// export.module Board;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map