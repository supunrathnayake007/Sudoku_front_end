def is_valid(board, row, col, num):
    # Check if the current number is valid in the row
    for i in range(9):
        if board[row][i] == num:
            return False

    # Check if the current number is valid in the column
    for i in range(9):
        if board[i][col] == num:
            return False

    # Check if the current number is valid in the 3x3 subgrid
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(3):
        for j in range(3):
            if board[start_row + i][start_col + j] == num:
                return False

    return True

def find_empty_cell(board):
    # Find an empty cell on the Sudoku board (marked with 0)
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                return row, col
    return None, None

def solve_sudoku(board):
    row, col = find_empty_cell(board)

    # Base case: if there are no empty cells, the puzzle is solved
    if row is None or col is None:
        return True

    # Try filling the empty cell with each number from 1 to 9
    for num in range(1, 10):
        if is_valid(board, row, col, num):
            board[row][col] = num

            # Recursively solve the rest of the puzzle
            if solve_sudoku(board):
                return True

            # If the current number doesn't lead to a solution, backtrack and try another number
            board[row][col] = 0

    # If no number leads to a solution, return False
    return False

# Example usage:
# Define the Sudoku board as a 2D list, where empty cells are represented by 0
sudoku_board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

if solve_sudoku(sudoku_board):
    for row in sudoku_board:
        print(row)
else:
    print("No solution exists for the given Sudoku puzzle.")
