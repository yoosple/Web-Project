export function generateRandomMaze(rows, cols) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
  
    const stack = [];
    const visited = [];
  
    function isValidCell(row, col) {
      return row >= 0 && row < rows && col >= 0 && col < cols;
    }
  
    function getNeighbours(row, col) {
      const neighbours = [];
      const directions = [
        { row: -2, col: 0 }, // 위
        { row: 2, col: 0 }, // 아래
        { row: 0, col: -2 }, // 왼쪽
        { row: 0, col: 2 }, // 오른쪽
      ];
  
      directions.forEach((direction) => {
        const newRow = row + direction.row;
        const newCol = col + direction.col;
  
        if (isValidCell(newRow, newCol) && !visited[newRow][newCol]) {
          neighbours.push({ row: newRow, col: newCol });
        }
      });
  
      return neighbours;
    }
  
    function removeWall(currentCell, neighbourCell) {
      const wallRow = (currentCell.row + neighbourCell.row) / 2;
      const wallCol = (currentCell.col + neighbourCell.col) / 2;
      maze[wallRow][wallCol] = 0;
    }
  
    function generateMaze(row, col) {
      visited[row][col] = true;
  
      const neighbours = getNeighbours(row, col);
  
      while (neighbours.length > 0) {
        const randomIndex = Math.floor(Math.random() * neighbours.length);
        const randomNeighbour = neighbours[randomIndex];
  
        removeWall({ row, col }, randomNeighbour);
  
        generateMaze(randomNeighbour.row, randomNeighbour.col);
  
        neighbours.splice(randomIndex, 1);
      }
    }
  
    for (let i = 0; i < rows; i++) {
      visited.push(Array(cols).fill(false));
    }
  
    generateMaze(0, 0);
  
    return maze;
  }