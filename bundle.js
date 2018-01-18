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

var emptyGrid = [[null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null]];

var classes = ["F", "W", "C", "R", "X"];

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.grid = this.fill();
    // this.col1 = this.grid[0]
    // this.col2 = this.grid[1]
    // this.col3 = this.grid[2]
    // this.col4 = this.grid[3]
    // this.col5 = this.grid[4]
    // this.col6 = this.grid[5]
    // this.col7 = this.grid[6]
    // this.col8 = this.grid[7]
    this.fill = this.fill.bind(this);
    this.check3Vert = this.check3Vert.bind(this);
  }

  _createClass(Board, [{
    key: "fill",
    value: function fill() {
      var newGrid = emptyGrid.slice(0);
      this.grid = newGrid;
      return newGrid.map(function (column) {
        return column.map(function (space) {
          if (space === null) {
            return space = classes[Math.floor(Math.random() * classes.length)];
          }
        });
      });
    }
  }, {
    key: "check3Vert",
    value: function check3Vert() {
      //checks the board for combinations of three in each COLUMN
      var newGrid = this.grid.slice(0);
      return newGrid.map(function (column, i) {
        return column.map(function (element, i) {
          if (element === column[i + 1] && element === column[i + 2]) {
            column[i] = 'match';
            column[i + 1] = 'match';
            column[i + 2] = 'match';
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
      var transposed = this;
      transposed.grid = transposed.grid.transpose();
      var checked = transposed.check3Vert();
      return checked.transpose();
    }
  }, {
    key: "remove3",
    value: function remove3() {
      //removes 3 matching pieces from the board
      var newGrid = this.grid.map(function (column) {
        column = column.removeMatches();
        return column;
      });
      this.grid = newGrid;
    }
  }, {
    key: "refill",
    value: function refill() {
      var newGrid = this.grid.slice(0);
      this.grid.map(function (column) {
        while (column.length < 8) {
          column.push(classes[Math.floor(Math.random() * classes.length)]);
        }
      });
    }
  }]);

  return Board;
}(); //class Grid


//HELPER METHODS


Array.prototype.removeMatches = function () {
  var newArray = [];
  this.forEach(function (el) {
    if (el !== 'match') {
      newArray.push(el);
    }
  });
  return newArray;
};

Array.prototype.transpose = function () {
  var _this = this;

  var columns = Array.from({ length: this[0].length }, function () {
    return Array.from({ length: _this.length });
  });
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      columns[j][i] = this[i][j];
    }
  }
  return columns;
};
// export default Board;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map