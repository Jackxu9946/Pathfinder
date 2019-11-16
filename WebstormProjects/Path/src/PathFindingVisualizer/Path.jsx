import React, {Component} from 'react';
import Node from './Node/Node';

import './Path.css'
import {BFS} from './Algorithms/BFS';
import {DFS} from "./Algorithms/DFS";
import {Dijkstra, constructShortestPath} from "./Algorithms/Djikstra"

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 10;
const GRID_ROW_LENGTH = 20;
const GRID_COL_LENGTH = 35;

export default class Path extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            nodes: [],
            mousePressed: false,
            algorithm: "BFS",
        };
        this.selectAlgorithm = this.selectAlgorithm.bind(this);
        this.visualizeDFS = this.visualizeDFS.bind(this);
        this.visualizeBFS = this.visualizeBFS.bind(this);
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < GRID_ROW_LENGTH; row++) {
            const currentRow = [];
            for (let col = 0; col < GRID_COL_LENGTH; col++) {
                const nodeObject = {
                    row,
                    col,
                    isStart: row === START_NODE_ROW && col === START_NODE_COL,
                    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                    isTop: row === 0,
                    isBottom: row === GRID_ROW_LENGTH-1,
                    isLeft: col === 0,
                    isRight: col === GRID_COL_LENGTH-1,
                    isVisited: false,
                    isAnimated: false,
                    isWall: false,
                    distance: row === START_NODE_ROW && col === START_NODE_COL ? 0 : "infinity",
                    previous : [null,null],
                    isShortestPathNode: false
                };
                currentRow.push(nodeObject)
            }
            nodes.push(currentRow)
        }
        this.setState({nodes});
    }

    handleMouseDown(row,col) {
        //const newGrid = this.makeNewGridWithWall(row,col);
        const mousePressed = this.state.mousePressed;
        this.setState({mousePressed:true});
    }

    handleMouseUp() {
        this.setState({mousePressed:false});
    }

    handleMouseEnter(row,col) {
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
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const endNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNode = BFS(nodes, startNode, endNode);
        this.animate(visitedNode);
    }

    visualizeDFS() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const endNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNode = DFS(nodes, startNode, endNode);
        this.animate(visitedNode);
    }

    visualizeDjikstra() {
        const {nodes,initialAnimationFinished} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const endNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNode = Dijkstra(nodes,startNode,endNode);
        const beforeTimeStartInterval = this.animate(visitedNode) + 35;
        var shortestPath = constructShortestPath(nodes, startNode, endNode);
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
                45*(i+beforeTimeStartInterval));
        }
    }

    animate(visitedNode) {
        for (let i =0; i < visitedNode.length; i++) {
            const node = visitedNode[i];
            if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
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
                45*i);
        }
    }

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
                                    onMouseUp= {() => this.handleMouseUp()}
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