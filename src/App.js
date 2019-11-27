import React from 'react';
import './App.sass';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { board: [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
      ]
    };
  }

  createTable = () => {
    let table = [];

    for(let row = 0; row < this.state.board.length; row++) {
      let children = [];

      for(let col = 0; col < this.state.board[0].length; col++) {
        children.push(<td>{this.state.board[row][col]}</td>)
      }
      table.push(<tr>{children}</tr>)
    }
    return table
  }

  solveSudoku = (board) => {
    for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[row].length; col++) {
          if(board[row][col] === '.') {
            for(let num = 1; num <= 9; num++) {
              // Check if valid
              if(this.isValid(board, row, col, num)) {
                board[row][col] = num.toString();

                if(this.solveSudoku(board)) {
                  this.setState(board);
                  return true;
                } else {
                  board[row][col] = '.';
                }
              }
            }
            return false;
          }
        }
      }
      return true;
  }

  isValid = (board, row, col, num) => {
    for(let i = 0; i < 9; i++) {
      // Check row
      if(parseInt(board[row][i]) === num) {
        return false;
      // Check column
      } else if(parseInt(board[i][col]) === num) {
        return false;
      // Check Subgrid
      } else if(parseInt(board[3 * (Math.floor(row / 3)) + Math.floor(i / 3)][3 * (Math.floor(col / 3)) + i % 3]) === num) {
        return false;
      }
    }
    return true
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            {this.createTable()}
          </tbody>
        </table>
        <button onClick={() => this.solveSudoku(this.state.board)}>Solve</button>
      </div>
    );
  }
}
