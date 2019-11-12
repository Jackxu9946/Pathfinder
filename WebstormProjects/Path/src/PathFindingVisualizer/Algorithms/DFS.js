export function DFS(grid, startNode, endNode) {
    const{row,col} = startNode;
    const endRow = endNode['row'];
    const endCol = endNode['col'];
    var stack =[];
    var returnVisitedStack = [];
    if (grid != null && startNode != null) {
        stack.push(startNode);
    }
    console.log(stack);
    while (stack.length > 0) {
        const currentNode = stack.pop();
        returnVisitedStack.push(currentNode);
        if (currentNode['isVisited'] === false) {
            currentNode['isVisited'] = true;
            const currentRow = currentNode['row'];
            const currentCol = currentNode['col'];
            if (currentRow === endRow && currentCol === endCol) {
                return returnVisitedStack;
            } else {
                if (currentNode['isTop'] === false) {
                    const topNode = grid[currentRow - 1][currentCol];
                    if (topNode['isVisited'] === false && !topNode['isWall']) {
                        stack.push(topNode);
                    }
                }
                if (currentNode['isBottom'] === false) {
                    const bottomNode = grid[currentRow + 1][currentCol];
                    if (bottomNode['isVisited'] === false && !bottomNode['isWall']) {
                        stack.push(bottomNode);
                    }
                }
                if (currentNode['isLeft'] === false) {
                    const leftNode = grid[currentRow][currentCol - 1];
                    if (leftNode['isVisited'] === false && !leftNode['isWall']) {
                        stack.push(leftNode);
                    }
                }
                if (currentNode['isRight'] === false) {
                    const rightNode = grid[currentRow][currentCol + 1];
                    if (rightNode['isVisited'] === false && !rightNode['isWall']) {
                        stack.push(rightNode);
                    }
                }
            }
        }
    }
    return returnVisitedStack;
}