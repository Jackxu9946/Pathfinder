// Note to self:
// Implementing AStar according to this website
// https://www.geeksforgeeks.org/a-search-algorithm/
// node.distance = g
// h does not exist as a field but is calculated at run time.(manhattanDistanceHeuristic)
// node.distanceSum = f
// Their open list, I will denote as visited or unvisited as a property of the node
// So open list = node.visited = false
// closed list = node.visited = true
export function AStar(grid, startNode, endNode) {
    const {row,col} = startNode;
    const endRow = endNode['row'];
    const endCol = endNode['col'];
    var countOfNodeNotVisited = grid.length * grid[0].length;
    const queueOfVisited = [];
    const visitedInOrder = [];
    if (grid != null && startNode != null) {
        queueOfVisited.push(startNode);
    }
    while (countOfNodeNotVisited > 0) {
        const minDistanceCoordinate = findMinimumFDistance(grid);
        if (minDistanceCoordinate.length > 0) {
            const currentNode = grid[minDistanceCoordinate[0]][minDistanceCoordinate[1]];
            const currentNodeDistance = currentNode['distance'];
            const currentRow = minDistanceCoordinate[0];
            const currentCol = minDistanceCoordinate[1];
            if (!currentNode['isWall']) {
                if (!currentNode['isTop']) {
                    const aboveNode = grid[currentRow - 1][currentCol];
                    if (!aboveNode['isWall']) {
                        const aboveNodeDistance = aboveNode['distance'];
                        const aboveNodeWeight = aboveNode['nodeWeight'];
                        const toTopNodeDistance = currentNodeDistance + aboveNodeWeight;
                        // if (toTopNodeDistance < aboveNodeDistance) {
                        //     aboveNode['distance'] = toTopNodeDistance;
                        //     aboveNode['previous'] = [currentRow, currentCol];
                        // }
                        // g = toTopNodeDistance
                        // h = manhattanDistanceHeuristic
                        const estimatedCostToEnd = manhattanDistanceHeuristic(aboveNode, endNode) + toTopNodeDistance;
                        if (estimatedCostToEnd < aboveNode['distanceSum']) {
                            aboveNode['distanceSum'] = estimatedCostToEnd;
                            aboveNode['distance'] = toTopNodeDistance;
                            aboveNode['previous'] = [currentRow, currentCol];
                        }
                    }
                }
                if (!currentNode['isBottom']) {
                    const bottomNode = grid[currentRow + 1][currentCol];
                    if (!bottomNode['isWall']) {
                        const bottomNodeDistance = bottomNode['distance'];
                        const bottomNodeWeight = bottomNode['nodeWeight'];
                        const toBottomNodeDistance = currentNodeDistance + bottomNodeWeight;
                        // if (toBottomNodeDistance < bottomNodeDistance) {
                        //     bottomNode['distance'] = toBottomNodeDistance;
                        //     bottomNode['previous'] = [currentRow, currentCol];
                        // }
                        const estimatedCostToEnd = manhattanDistanceHeuristic(bottomNode, endNode) + toBottomNodeDistance;
                        if (estimatedCostToEnd < bottomNode['distanceSum']) {
                            bottomNode['distanceSum'] = estimatedCostToEnd;
                                bottomNode['distance'] = toBottomNodeDistance;
                                bottomNode['previous'] = [currentRow, currentCol];
                        }
                    }
                }
                if (!currentNode['isLeft']) {
                    const leftNode = grid[currentRow][currentCol - 1];
                    if (!leftNode['isWall']) {
                        const leftNodeDistance = leftNode['distance'];
                        const leftNodeWeight = leftNode['nodeWeight'];
                        const toLeftNodeDistance = currentNodeDistance + leftNodeWeight;
                        // if (toLeftNodeDistance < leftNodeDistance) {
                        //     leftNode['distance'] = toLeftNodeDistance;
                        //     leftNode['previous'] = [currentRow, currentCol];
                        // }
                        const estimatedCostToEnd = manhattanDistanceHeuristic(leftNode, endNode) + toLeftNodeDistance;
                        if (estimatedCostToEnd < leftNode['distanceSum']) {
                            leftNode['distanceSum'] = estimatedCostToEnd;
                            leftNode['distance'] = toLeftNodeDistance;
                            leftNode['previous'] = [currentRow, currentCol];
                        }
                    }
                }
                if (!currentNode['isRight']) {
                    const rightNode = grid[currentRow][currentCol + 1];
                    if (!rightNode['isWall']) {
                        const rightNodeDistance = rightNode['distance'];
                        const rightNodeWeight = rightNode['nodeWeight'];
                        const toRightNodeDistance = currentNodeDistance + rightNodeWeight;
                        // if (toRightNodeDistance < rightNodeDistance) {
                        //     rightNode['distance'] = toRightNodeDistance;
                        //     rightNode['previous'] = [currentRow, currentCol];
                        // }
                        const estimatedCostToEnd = manhattanDistanceHeuristic(rightNode, endNode) + toRightNodeDistance;
                        if (estimatedCostToEnd < rightNode['distanceSum']) {
                            rightNode['distanceSum'] = estimatedCostToEnd;
                            rightNode['distance'] = toRightNodeDistance;
                            rightNode['previous'] = [currentRow, currentCol];
                        }
                    }
                }
                visitedInOrder.push(currentNode);
                currentNode['isVisited'] = true;
            }
        }
        countOfNodeNotVisited -= 1;
    }
    console.log("finished the loop");
    console.log(grid);
    return visitedInOrder;
}

function findMinimumFDistance(grid) {
    var currentMinimumDistance = 99999999999;
    var currentMinDistanceCoordinate = [];
    for (let row =0; row < grid.length; row ++) {
        const currentRow = grid[row];
        for (let col = 0; col < currentRow.length; col ++) {
            const currentNode = currentRow[col];
            if (!currentNode['isVisited'] && !currentNode['isWall']) {
                const currentDistance = currentNode['distanceSum'];
                if (currentDistance < currentMinimumDistance) {
                    currentMinimumDistance = currentDistance;
                    currentMinDistanceCoordinate = [currentNode['row'], currentNode['col']]
                }
            }
        }
    }
    return currentMinDistanceCoordinate;
}

function manhattanDistanceHeuristic(currentNode, endNode) {
    return (Math.abs(currentNode['row'] - endNode['row']) + Math.abs(currentNode['col'] - endNode['col']))
}