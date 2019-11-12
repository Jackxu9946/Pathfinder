import React, {Component} from 'react';
import Node from './Node/Node';

import './Path.css'
import {BFS} from './Algorithms/BFS';

const START_NODE_ROW = 5;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 25;
const GRID_ROW_LENGTH = 20;
const GRID_COL_LENGTH = 50;

export default class Path extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            nodes: [],
            mousePressed: false,
        };
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
                };
                currentRow.push(nodeObject)
            }
            nodes.push(currentRow)
        }
        this.setState({nodes});
    }

    handleMouseDown(row,col) {
        const newGrid = this.makeNewGridWithWall(row,col);
        const mousePressed = this.state.mousePressed;
        this.setState({nodes:newGrid, mousePressed:!mousePressed});
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
        console.log(visitedNode);
        this.animateBFS(visitedNode);
    }

    animateBFS(visitedNode) {
        for (let i =0; i < visitedNode.length; i++) {
            setTimeout(() => {
                const node = visitedNode[i];
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

    render() {
        const {nodes, mousePressed} = this.state;
        return (
            <>
            <button className="button" onClick={() => this.visualizeBFS()}>
                Visualize BFS
            </button>
            <ul className="iconList">
                <li className="iconList startNode">
                    <div className='box'>
                        <img src="arrow.jpg">
                        </img>
                    </div>
                    Start Node
                </li>
                <li className="iconList endNode">
                    End Node
                </li>
                <li className="iconList unvisitedNode">
                    Unvisited Node
                </li>
                <li className="iconList visitedNode">
                    Visited Node
                </li>
            </ul>
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {isStart, isFinish,isAnimated, row, col,isWall} = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        isStart = {isStart}
                                        isFinish = {isFinish}
                                        isAnimated = {isAnimated}
                                        isWall = {isWall}
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
            </>);
    }
}