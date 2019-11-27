const board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];

solveSudoku(board);
console.log(board);

function solveSudoku(board) {
  for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[row].length; col++) {
            if(board[row][col] === '.') {
                for(let num = 1; num <= 9; num++) {
                    // Check if valid
                    if(isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if(solveSudoku(board)) {
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
};

function isValid(board, row, col, num) {
    for(let i = 0; i < 9; i++) {
        if(board[row][i] == num) {
            return false;
        } else if(board[i][col] == num) {
            return false;
        } else if(board[3 * (Math.floor(row / 3)) + Math.floor(i / 3)][3 * (Math.floor(col / 3)) + i % 3] == num) {
            return false;
        }
    }
    return true
}
