import React, {Component} from 'react';
import Node from './Node/Node';

import './Path.css'
import {BFS} from './Algorithms/BFS';
import {DFS} from "./Algorithms/DFS";
import {Dijkstra, constructShortestPath} from "./Algorithms/Djikstra"

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 5;
const GRID_ROW_LENGTH = 25;
const GRID_COL_LENGTH = 60;

export default class Path extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            nodes: [],
            mousePressed: false,
            algorithm: "BFS",
            movingStartNode: false,
            previousStartNode: [START_NODE_ROW, START_NODE_COL],
            movingEndNode: false,
            previousEndNode: [FINISH_NODE_ROW, FINISH_NODE_COL],
            currentStartNode: [START_NODE_ROW, START_NODE_COL],
            currentEndNode: [FINISH_NODE_ROW, FINISH_NODE_COL],
        };
        this.selectAlgorithm = this.selectAlgorithm.bind(this);
        this.visualizeDFS = this.visualizeDFS.bind(this);
        this.visualizeBFS = this.visualizeBFS.bind(this);
    }

    componentDidMount() {
        const {currentStartNode, currentEndNode} = this.state;
        const nodes = [];
        for (let row = 0; row < GRID_ROW_LENGTH; row++) {
            const currentRow = [];
            for (let col = 0; col < GRID_COL_LENGTH; col++) {
                const nodeObject = {
                    row,
                    col,
                    isStart: row === currentStartNode[0] && col === currentStartNode[1],
                    isFinish: row === currentEndNode[0] && col === currentEndNode[1],
                    isTop: row === 0,
                    isBottom: row === GRID_ROW_LENGTH-1,
                    isLeft: col === 0,
                    isRight: col === GRID_COL_LENGTH-1,
                    isVisited: false,
                    isAnimated: false,
                    isWall: false,
                    distance: row === currentStartNode[0] && col === currentStartNode[1] ? 0 : "infinity",
                    previous : [null,null],
                    isShortestPathNode: false
                };
                currentRow.push(nodeObject)
            }
            nodes.push(currentRow)
        }
        // console.log(nodes);
        this.setState({nodes});
    }

    handleMouseDown(row,col) {
        const mousePressed = this.state.mousePressed;
        if (this.state.nodes[row][col].isStart) {
            // console.log("Start Node Move");
            this.setState({movingStartNode:true, previousStartNode: [row,col]});
            return;
        } else if (this.state.nodes[row][col].isFinish) {
            // console.log("End Node Move");
            this.setState({movingEndNode:true, previousEndNode: [row,col]});
            return;
        }
        this.setState({mousePressed: !mousePressed});
    }

    handleMouseUp(row,col) {
        // console.log("Handle Mouse Up");
        const {previousStartNode, previousEndNode} = this.state;
        if (this.state.movingStartNode) {
            // console.log("Moving start Node");
            const newGrid = this.state.nodes.slice();
            const currentNode = this.state.nodes[row][col];
            const newNode = {
                ...currentNode,
                isStart: true,
                distance: 0,
            };
            const oldStartNode = this.state.nodes[previousStartNode[0]][previousStartNode[1]];
            const oldNoLongerStartNode = {
                ...oldStartNode,
                isStart: false,
                distance: "infinity",
            };
            newGrid[row][col] = newNode;
            newGrid[previousStartNode[0]][previousStartNode[1]] = oldNoLongerStartNode;
            this.setState({nodes:newGrid, currentStartNode: [newNode.row,newNode.col]});
            this.clearBoard();
        } else if (this.state.movingEndNode) {
            // console.log("Moving End Node");
            const newGrid = this.state.nodes.slice();
            const currentNode = this.state.nodes[row][col];
            const newNode = {
                ...currentNode,
                isFinish: true
            };
            const oldEndNode = this.state.nodes[previousEndNode[0]][previousEndNode[1]];
            const oldNoLongerEndNode = {
                ...oldEndNode,
                isFinish: false,
            };
            newGrid[row][col] = newNode;
            newGrid[previousEndNode[0]][previousEndNode[1]] = oldNoLongerEndNode;
            this.setState({nodes:newGrid, currentEndNode:[newNode.row, newNode.col]});
            this.clearBoard();
        }
        this.setState({mousePressed:false, movingStartNode:false, movingEndNode:false});
    }

    handleMouseEnter(row,col) {
        // console.log("MousePressed " + this.state.mousePressed);
        if (!this.state.mousePressed) return;
        const newGrid = this.makeNewGridWithWall(row,col);
        this.setState({nodes:newGrid});
    }

    makeNewGridWithWall(row,col) {
        const newGrid = this.state.nodes.slice();
        const currentNode = this.state.nodes[row][col];
        const newNode = {
            ...currentNode,
            isWall: !currentNode['isWall']
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    visualizeBFS() {
        const {nodes, currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        const visitedNode = BFS(nodes, startNode, endNode);
        this.animate(visitedNode);
    }

    visualizeDFS() {
        const {nodes, currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        const visitedNode = DFS(nodes, startNode, endNode);
        this.animate(visitedNode);
    }

    visualizeDjikstra() {
        const {nodes,initialAnimationFinished,currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        console.log("StartNode "+ startNode.row + ',' + startNode.col);
        console.log("endNode" + endNode.row + ',' + endNode.col);
        const visitedNode = Dijkstra(nodes,startNode,endNode);
        const beforeTimeStartInterval = this.animate(visitedNode) + 35;
        var shortestPath = constructShortestPath(nodes, startNode, endNode);
        if (shortestPath === "No path exist") {
            console.log("No path exist");
            return;
        }
        shortestPath = shortestPath.reverse();
        this.animateShortestPath(shortestPath,beforeTimeStartInterval);
    }

    animateShortestPath(visitedNode, beforeTimeStartInterval) {
        for (let i = 0; i < visitedNode.length; i++)
        {
            setTimeout(() => {
                    const node = visitedNode[i];
                    const newGrid = this.state.nodes.slice();
                    const newNode = {
                        ...node,
                        isShortestPathNode: true,
                    };
                    newGrid[node.row][node.col] = newNode;
                    this.setState({nodes: newGrid})},
                65*(i+beforeTimeStartInterval));
        }
    }

    animate(visitedNode) {
        for (let i =0; i < visitedNode.length; i++) {
            const node = visitedNode[i];
            const currentFinalNode = this.state.currentEndNode;
            if (node.row === currentFinalNode[0] && node.col === currentFinalNode[1]) {
                return i;
            }
            setTimeout(() => {
                    const newGrid = this.state.nodes.slice();
                    const newNode = {
                        ...node,
                        isAnimated: true,
                    };
                    newGrid[node.row][node.col] = newNode;
                    this.setState({nodes: newGrid})},
                65*i);
        }
    }

    // instantAnimationWithShortestPath() {
    //     const {nodes,initialAnimationFinished,currentStartNode, currentEndNode} = this.state;
    //     const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
    //     const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
    //     const visitedNode = Dijkstra(nodes,startNode,endNode);
    //     const newGrid = this.state.nodes.slice();
    //     for (let i =0; i < visitedNode.length; i++) {
    //         const node = visitedNode[i];
    //         const currentFinalNode = this.state.currentEndNode;
    //         if (node.row === currentFinalNode[0] && node.col === currentFinalNode[1]) {
    //             return i;
    //         }
    //         const newNode = {
    //             ...node,
    //             isAnimated: true,
    //         };
    //         newGrid[node.row][node.col] = newNode;
    //     }
    //     var shortestPath = constructShortestPath(nodes, startNode, endNode);
    //     if (shortestPath === "No path exist") {
    //         console.log("No path exist");
    //         return;
    //     }
    //     shortestPath = shortestPath.reverse();
    //     this.animateShortestPath(shortestPath,beforeTimeStartInterval);
    //
    //     setTimeOut( () => {
    //         this.setState({nodes:newGrid})
    //     }, 45);
    //
    // }

    clearBoard() {
        const {nodes} = this.state;
        const newGrid = this.state.nodes.slice();
        for ( var row=0; row < nodes.length; row++) {
            const column = nodes[row];
            for (var col =0; col < column.length; col ++) {
                var currentNode = column[col];
                if (!currentNode['isStart'] || !currentNode['isFinish']) {
                    currentNode['isWall'] = false;
                    currentNode['isAnimated'] = false;
                    currentNode['isVisited'] = false;
                    currentNode['isShortestPathNode'] = false;
                    newGrid[row][col] = currentNode
                }
            }
        }
        this.setState({nodes:newGrid})
    }


    visualizeAlgorithm() {
        const {algorithm} = this.state;
        if (algorithm === "BFS") {
            this.visualizeBFS();
        } else if (algorithm === "DFS") {
            this.visualizeDFS();
        } else if (algorithm === "Djikstra") {
            this.visualizeDjikstra()
        }
    }

    selectAlgorithm(event) {
        this.setState({algorithm: event.target.value});
        this.clearBoard();
    }

    render() {
        const {nodes, mousePressed,algorithm} = this.state;
        return (
            <div className ="outerContainer">
            <button className="button" onClick={() => this.visualizeAlgorithm()}>
                Visualize {algorithm}
            </button>
            <button className="button" onClick={() => this.clearBoard()}>
                Clear Board
            </button>
            <ul className="iconList">
                <li className="iconList">
                    <div className='box startNode'>
                    </div>
                    Start Node
                </li>
                <li className="iconList">
                    <div className='box endNode'>
                    </div>
                    End Node
                </li>
                <li className="iconList">
                    <div className='box'>
                    </div>
                    Unvisited Node
                </li>
                <li className="iconList">
                    <div className='box visitedNode'>
                    </div>
                    Visited Node
                </li>
                <li className="iconList">
                    <div className='box Wall'>
                    </div>
                    Wall
                </li>
                <li className='iconList'>
                    <select className ="AlgorithmSelect" onChange={this.selectAlgorithm}>
                        <option value="BFS"> BFS</option>
                        <option value="DFS"> DFS</option>
                        <option value="Djikstra"> Djikstra </option>
                    </select>
                </li>
            </ul>
            <div className="grid">
            {nodes.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className={`row-${rowIdx}`}>
                        {row.map((node, nodeIdx) => {
                            const {isStart, isFinish,isAnimated, row, col,isWall, isShortestPathNode} = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    isStart = {isStart}
                                    isFinish = {isFinish}
                                    isAnimated = {isAnimated}
                                    isWall = {isWall}
                                    isShortestPathNode = {isShortestPathNode}
                                    onMouseDown={(row,col) => this.handleMouseDown(row,col)}
                                    onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
                                    mousePressed ={mousePressed}
                                    onMouseUp= {() => this.handleMouseUp(row,col)}
                                    row={row}
                                    col={col}
                                >
                                </Node>
                            );
                        })}
                </div>
                );
            })}
        </div>
        </div>);
    }
}