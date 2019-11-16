export function Dijkstra(grid, startNode, endNode) {
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
        visitedInOrder.push(currentNode);
        if (!currentNode['isVisited']) {
            const currentRow = currentNode['row'];
            const currentCol = currentNode['col'];
            const currentDistance = currentNode['distance'];
            var nextDistance = currentDistance + 1;
            if (currentNode['isTop'] === false) {
                const aboveNode = grid[currentRow - 1][currentCol];
                if (aboveNode['isVisited'] === false && !aboveNode['isWall']) {
                    queueOfVisited.push(aboveNode);
                    const aboveNodeDistance = aboveNode['distance'];
                    if (aboveNodeDistance === "infinity" || nextDistance < aboveNodeDistance) {
                        aboveNode['distance'] = nextDistance;
                        aboveNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            if (currentNode['isBottom'] === false) {
                const belowNode = grid[currentRow + 1][currentCol];
                if (belowNode['isVisited'] === false && !belowNode['isWall']) {
                    queueOfVisited.push(belowNode);
                    const belowNodeDistance = belowNode['distance'];
                    if (belowNodeDistance === "infinity" || nextDistance < belowNodeDistance) {
                        belowNode['distance'] = nextDistance;
                        belowNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            if (currentNode['isLeft'] === false) {
                const leftNode = grid[currentRow][currentCol - 1];
                if (leftNode['isVisited'] === false && !leftNode['isWall']) {
                    queueOfVisited.push(leftNode);
                    const leftNodeDistance = leftNode['distance'];
                    if (leftNodeDistance === "infinity" || nextDistance < leftNodeDistance) {
                        leftNode['distance'] = nextDistance;
                        leftNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            if (currentNode['isRight'] === false) {
                const rightNode = grid[currentRow][currentCol + 1];
                if (rightNode['isVisited'] === false && !rightNode['isWall']) {
                    queueOfVisited.push(rightNode);
                    const rightNodeDistance = rightNode['distance'];
                    if (rightNodeDistance === "infinity" || nextDistance < rightNodeDistance) {
                        rightNode['distance'] = nextDistance;
                        rightNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            currentNode['isVisited'] = true;
        }
    }
    return visitedInOrder;
}

export function constructShortestPath(grid,StartNode,endNode) {
    const startRow = StartNode['row'];
    const startCol = StartNode['col'];
    var currentNode = endNode;
    var visitedStack = [];
    while (currentNode != null) {
        if (currentNode['distance'] === "infinity") {
            return "No path exist";
        } else {
            const currentRow = currentNode['row'];
            const currentCol = currentNode['col'];
            if (currentRow === startRow && currentCol === startCol) {
                return visitedStack;
            } else {
                const previousNodeCoords = currentNode['previous'];
                currentNode = grid[previousNodeCoords[0]][previousNodeCoords[1]]
            }
            visitedStack.push(currentNode);
        }
    }
    return visitedStack;
}