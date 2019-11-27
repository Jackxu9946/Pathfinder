export function Dijkstra(grid, startNode, endNode) {
    const {row,col} = startNode;
    const endRow = endNode['row'];
    const endCol = endNode['col'];
    const queueOfVisited = [];
    // console.log(grid);
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
            // var nextDistance = currentDistance + currentNode['nodeWeight'];
            if (currentNode['isTop'] === false) {
                const aboveNode = grid[currentRow - 1][currentCol];
                if (!aboveNode['isWall']) {
                    if (aboveNode['isVisited'] === false) {
                        queueOfVisited.push(aboveNode);
                    }
                    const aboveNodeDistance = aboveNode['distance'];
                    const nextDistance = currentDistance + aboveNode['nodeWeight'];
                    if (currentNode['row'] === 5 && currentNode['col'] === 3) {
                        console.log("Above node weight is " + aboveNode['nodeWeight']);
                        console.log("From current to above node is " + nextDistance);
                        console.log("Top node current distance is " + aboveNodeDistance);
                    }
                    if (aboveNodeDistance === "infinity" || nextDistance < aboveNodeDistance) {
                        aboveNode['distance'] = nextDistance;
                        aboveNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            if (currentNode['isBottom'] === false) {
                const belowNode = grid[currentRow + 1][currentCol];
                if (!belowNode['isWall']) {
                    if (belowNode['isVisited'] === false) {
                        queueOfVisited.push(belowNode);
                    }
                    const belowNodeDistance = belowNode['distance'];
                    const nextDistance = currentDistance + belowNode['nodeWeight'];
                    if (belowNodeDistance === "infinity" || nextDistance < belowNodeDistance) {
                        belowNode['distance'] = nextDistance;
                        belowNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            if (currentNode['isLeft'] === false) {
                const leftNode = grid[currentRow][currentCol - 1];
                if (!leftNode['isWall']) {
                    if (leftNode['isVisited'] === false) {
                        queueOfVisited.push(leftNode);
                    }
                    const leftNodeDistance = leftNode['distance'];
                    const nextDistance = currentDistance + leftNode['nodeWeight'];
                    if (leftNodeDistance === "infinity" || nextDistance < leftNodeDistance) {
                        leftNode['distance'] = nextDistance;
                        leftNode['previous'] = [currentRow, currentCol];
                    }
                }
            }
            if (currentNode['isRight'] === false) {
                const rightNode = grid[currentRow][currentCol + 1];
                if (!rightNode['isWall']) {
                    if (rightNode['isVisited'] === false) {
                        queueOfVisited.push(rightNode);
                    }
                    const rightNodeDistance = rightNode['distance'];
                    const nextDistance = currentDistance + rightNode['nodeWeight'];
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
    const currentRow = endNode['row'];
    const currentCol = endNode['col'];
    if (!endNode['isTop']) {
        const topNode = grid[currentRow - 1][currentCol];
        const topNodeDistancePlusOne = topNode['distance'] + 1;
        if (topNodeDistancePlusOne < endNode['distance']) {
            endNode['distance'] = topNodeDistancePlusOne;
            endNode['previous'] = [topNode['row'], topNode['col']];
        }
    }
    if (!endNode['isBottom']) {
        const bottomNode = grid[currentRow + 1][currentCol];
        const bottomNodeDistancePlusOne = bottomNode['distance'] + 1;
        if (bottomNodeDistancePlusOne < endNode['distance']) {
            endNode['distance'] = bottomNodeDistancePlusOne;
            endNode['previous'] = [bottomNode['row'], bottomNode['col']];
        }
    }
    if (!endNode['isLeft']){
        const leftNode = grid[currentRow][currentCol - 1];
        const leftNodeDistancePlusOne = leftNode['distance'] + 1;
        if (leftNodeDistancePlusOne < endNode['distance']) {
            endNode['distance'] = leftNodeDistancePlusOne;
            endNode['previous'] = [leftNode['row'], leftNode['col']];
        }
    }
    if (!endNode['isRight']) {
        const rightNode = grid[currentRow][currentCol + 1];
        const rightNodeDistancePlusOne = rightNode['distance'] + 1;
        if (rightNodeDistancePlusOne < endNode['distance']) {
            endNode['distance'] = rightNodeDistancePlusOne;
            endNode['previous'] = [rightNode['row'], rightNode['col']];
        }
    }
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