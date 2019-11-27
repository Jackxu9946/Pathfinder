// export function Dijkstra(grid, startNode, endNode) {
//     const {row,col} = startNode;
//     const endRow = endNode['row'];
//     const endCol = endNode['col'];
//     const queueOfVisited = [];
//     // console.log(grid);
//     const visitedInOrder = [];
//     if (grid != null && startNode != null) {
//         queueOfVisited.push(startNode);
//     }
//     while (queueOfVisited.length > 0) {
//         findMinimumDistanceInGrid(grid);
//         const currentNode = queueOfVisited.shift();
//         visitedInOrder.push(currentNode);
//         // if (currentNode['col'] === 4) {
//         //     if(currentNode['row'] === 2) {
//         //         console.log('2,4');
//         //     }
//         //     if (currentNode['row'] === 3) {
//         //         console.log('3,4');
//         //     }
//         // }
//         if (!currentNode['isVisited']) {
//             const currentRow = currentNode['row'];
//             const currentCol = currentNode['col'];
//             const currentDistance = currentNode['distance'];
//             // var nextDistance = currentDistance + currentNode['nodeWeight'];
//             if (currentNode['isTop'] === false) {
//                 const aboveNode = grid[currentRow - 1][currentCol];
//                 if (!aboveNode['isWall']) {
//                     if (aboveNode['isVisited'] === false) {
//                         queueOfVisited.push(aboveNode);
//                     }
//                     const aboveNodeDistance = aboveNode['distance'];
//                     const nextDistance = currentDistance + aboveNode['nodeWeight'];
//                     if (currentNode['row'] === 3 && currentNode['col'] === 4) {
//                         console.log("Above node weight is " + aboveNode['nodeWeight']);
//                         console.log("From current to above node is " + nextDistance);
//                         console.log("Top node current distance is " + aboveNodeDistance);
//                         console.log("Current distance is " + currentDistance);
//                     }
//                     if ( nextDistance < aboveNodeDistance) {
//                         aboveNode['distance'] = nextDistance;
//                         aboveNode['previous'] = [currentRow, currentCol];
//                     }
//                 }
//             }
//             if (currentNode['isBottom'] === false) {
//                 const belowNode = grid[currentRow + 1][currentCol];
//                 if (!belowNode['isWall']) {
//                     if (belowNode['isVisited'] === false) {
//                         queueOfVisited.push(belowNode);
//                     }
//                     const belowNodeDistance = belowNode['distance'];
//                     const nextDistance = currentDistance + belowNode['nodeWeight'];
//                     if (nextDistance < belowNodeDistance) {
//                         belowNode['distance'] = nextDistance;
//                         belowNode['previous'] = [currentRow, currentCol];
//                     }
//                 }
//             }
//             if (currentNode['isLeft'] === false) {
//                 const leftNode = grid[currentRow][currentCol - 1];
//                 if (!leftNode['isWall']) {
//                     if (leftNode['isVisited'] === false) {
//                         queueOfVisited.push(leftNode);
//                     }
//                     const leftNodeDistance = leftNode['distance'];
//                     const nextDistance = currentDistance + leftNode['nodeWeight'];
//                     if (nextDistance < leftNodeDistance) {
//                         leftNode['distance'] = nextDistance;
//                         leftNode['previous'] = [currentRow, currentCol];
//                     }
//                 }
//             }
//             if (currentNode['isRight'] === false) {
//                 const rightNode = grid[currentRow][currentCol + 1];
//                 if (!rightNode['isWall']) {
//                     if (rightNode['isVisited'] === false) {
//                         queueOfVisited.push(rightNode);
//                     }
//                     const rightNodeDistance = rightNode['distance'];
//                     const nextDistance = currentDistance + rightNode['nodeWeight'];
//                     if (nextDistance < rightNodeDistance) {
//                         rightNode['distance'] = nextDistance;
//                         rightNode['previous'] = [currentRow, currentCol];
//                     }
//                 }
//             }
//             currentNode['isVisited'] = true;
//         }
//     }
//     return visitedInOrder;
// }

export function Dijkstra(grid, startNode, endNode) {
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
        const minDistanceCoordinate = findMinimumDistanceInGrid(grid);
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
                        if (toTopNodeDistance < aboveNodeDistance) {
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
                        if (toBottomNodeDistance < bottomNodeDistance) {
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
                        if (toLeftNodeDistance < leftNodeDistance) {
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
                        if (toRightNodeDistance < rightNodeDistance) {
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

function findMinimumDistanceInGrid(grid) {
    var currentMinimumDistance = 99999999999;
    var currentMinDistanceCoordinate = [];
    for (let row = 0; row < grid.length; row ++) {
        const currentRow = grid[row];
        for (let col = 0; col < currentRow.length; col ++) {
            const currentNode = currentRow[col];
            if (!currentNode['isVisited'] && !currentNode['isWall']) {
                const currentDistance = currentNode['distance'];
                if (currentDistance < currentMinimumDistance) {
                    currentMinimumDistance = currentDistance;
                    currentMinDistanceCoordinate = [currentNode['row'], currentNode['col']]
                }
            }
        }
    }
    console.log("current smallest distance in grid is " + currentMinimumDistance);
    console.log("The coordinate is " + currentMinDistanceCoordinate);
    return currentMinDistanceCoordinate;
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
        if (currentNode['distance'] === 99999999) {
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