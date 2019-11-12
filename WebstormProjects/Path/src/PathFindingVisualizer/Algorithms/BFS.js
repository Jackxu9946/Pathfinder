
export function BFS(grid, startNode, endNode) {
    const {row,col} = startNode;
    const endRow = endNode['row'];
    const endCol = endNode['col'];
    const queueOfVisited = [];
    const visitedInOrder = [];
    if (grid != null && startNode != null) {
        queueOfVisited.push(startNode);
    }
    while (queueOfVisited.length > 0) {
        const currentNode = queueOfVisited.shift();
        const currentRow = currentNode['row'];
        const currentCol = currentNode['col'];
        visitedInOrder.push(currentNode);
        currentNode['isVisited'] = true;
        if (currentRow === endRow && currentCol === endCol) {
            return visitedInOrder;
        }
        if (currentNode['isTop'] === false) {
            const aboveNode = grid[currentRow-1][currentCol];
            if (aboveNode['isVisited'] === false && !aboveNode['isWall']) {
                queueOfVisited.push(aboveNode);
                aboveNode['isVisited'] = true;
            }
        }
        if (currentNode['isBottom'] === false) {
            const belowNode = grid[currentRow+1][currentCol];
            if (belowNode['isVisited'] === false && !belowNode['isWall']) {
                queueOfVisited.push(belowNode);
                belowNode['isVisited'] = true;
            }
        }
        if (currentNode['isLeft'] === false) {
            const leftNode = grid[currentRow][currentCol-1];
            if (leftNode['isVisited'] === false && !leftNode['isWall']) {
                queueOfVisited.push(leftNode);
                leftNode['isVisited'] = true;
            }
        }
        if (currentNode['isRight'] === false) {
            const rightNode = grid[currentRow][currentCol+1];
            if (rightNode['isVisited'] === false && !rightNode['isWall']) {
                queueOfVisited.push(rightNode);
                rightNode['isVisited'] = true;
            }
        }
    }
    return visitedInOrder;
}

