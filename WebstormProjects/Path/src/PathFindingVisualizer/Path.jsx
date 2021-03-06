import React, {Component} from 'react';
import Node from './Node/Node';
import Tutorial from './Tutorial';

import './Path.css'
import {BFS} from './Algorithms/BFS';
import {DFS} from "./Algorithms/DFS";
import {constructShortestPath, Dijkstra} from "./Algorithms/Djikstra"
import {AStar} from "./Algorithms/AStar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
// import Popup from "reactjs-popup";
import wallCreation from './Resources/WallCreation.gif'
import Modal from "react-bootstrap/Modal";


const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 3;
const FINISH_NODE_COL = 0;
const GRID_ROW_LENGTH = 30;
const GRID_COL_LENGTH = 60;
// const GRID_ROW_LENGTH = 10;
// const GRID_COL_LENGTH = 10;
var TIME_OUT_CONST = 25;


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
            alreadyVisualized: false,
            inAnimation: false,
            addingWeight: false,
            currentSlide: 0,
        };
        this.selectAlgorithm = this.selectAlgorithm.bind(this);
        this.visualizeDFS = this.visualizeDFS.bind(this);
        this.visualizeBFS = this.visualizeBFS.bind(this);
        this.setAddingWeight = this.setAddingWeight.bind(this);
        this.instantNonAnimation = this.instantNonAnimation.bind(this);
        this.incrementCurrentSlide = this.incrementCurrentSlide.bind(this);
        this.decrementCurrentSlide = this.decrementCurrentSlide.bind(this);
    }

    setAddingWeight() {
        this.setState({addingWeight:!this.state.addingWeight});
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
                    distance: row === currentStartNode[0] && col === currentStartNode[1] ? 0 : 99999999,
                    previous : [null,null],
                    isShortestPathNode: false,
                    instantAnimation: false,
                    nodeWeight: 1,
                    distanceSum: row === currentStartNode[0] && col === currentStartNode[1] ? 0 : 99999999,
                };
                currentRow.push(nodeObject)
            }
            nodes.push(currentRow)
        }
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
        const {previousStartNode, previousEndNode} = this.state;
        this.setState({mousePressed:false, movingStartNode:false, movingEndNode:false});
    }

    handleMouseOver(row,col) {
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
                distance: 99999999,
            };
            newGrid[row][col] = newNode;
            newGrid[previousStartNode[0]][previousStartNode[1]] = oldNoLongerStartNode;
            this.setState({nodes:newGrid, currentStartNode: [newNode.row,newNode.col], previousStartNode:[newNode.row, newNode.col]});
            this.clearBoard();

            // console.log("Start node instant animation");
            // console.log("Current algorithm is" + this.state.algorithm + " alreadyVisualized = " + this.state.alreadyVisualized);
            if ((this.state.algorithm === "Djikstra" || this.state.algorithm === "AStar") && this.state.alreadyVisualized) {
                setTimeout(() => {
                    // this.clearBoard();
                    this.instantAnimationWithShortestPath();
                }, 0)
            } else if ((this.state.algorithm === "DFS" || this.state.algorithm === "BFS") && this.state.alreadyVisualized) {
                this.instantNonAnimation();
            }
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
            this.setState({nodes:newGrid, currentEndNode:[newNode.row, newNode.col], previousEndNode: [newNode.row, newNode.col]});
            this.clearBoard();
            // console.log("end node instant animation ");
            if ((this.state.algorithm === "Djikstra" || this.state.algorithm === "AStar") && this.state.alreadyVisualized) {
                setTimeout(() => {
                    // this.clearBoard();
                    this.instantAnimationWithShortestPath();
                }, 0)
            } else if ((this.state.algorithm === "DFS" || this.state.algorithm === "BFS") && this.state.alreadyVisualized) {
                this.instantNonAnimation();
            }
        }
    }


    handleMouseEnter(row,col) {
        // console.log("MousePressed " + this.state.mousePressed);
        if (!this.state.mousePressed) return;
        if (!this.state.addingWeight) {
            const newGrid = this.makeNewGridWithWall(row, col);
            this.setState({nodes:newGrid});
        }
        else {
            if (this.state.algorithm === "Djikstra") {
                const newGrid = this.makeNewGridWithWeight(row, col);
                this.setState({nodes: newGrid});
            }
        }
    }

    makeNewGridWithWeight(row,col) {
        const newGrid = this.state.nodes.slice();
        const currentNode = this.state.nodes[row][col];
        if (!currentNode.isWall) {
            const newNode = {
                ...currentNode,
                nodeWeight: currentNode.nodeWeight === 1 ? 10: 1
            };
            newGrid[row][col] = newNode;
        }
        return newGrid;
    }

    // This function is used to make 'walls' in the grid
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

    // Determine if there is a path from start to end via BFS
    visualizeBFS() {
        const {nodes, currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        const visitedNode = BFS(nodes, startNode, endNode);
        this.animate(visitedNode);
        setTimeout( () => {
            this.setState({alreadyVisualized:true});
        }, TIME_OUT_CONST * (visitedNode.length + 10)
        )
    }

    // Determine if there is a path from start to end via DFS
    visualizeDFS() {
        const {nodes, currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        const visitedNode = DFS(nodes, startNode, endNode);
        this.animate(visitedNode);
        setTimeout( () => {
            this.setState({alreadyVisualized:true});
        }, TIME_OUT_CONST * (visitedNode.length + 10)
        )
    }

    //This function will find the shortest path from start to end via Djikstra
    visualizeDjikstra() {
        const {nodes,initialAnimationFinished,currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        const visitedNode = Dijkstra(nodes,startNode,endNode);
        // const visitedNode = AStar(nodes, startNode, endNode);
        const beforeTimeStartInterval = this.animate(visitedNode) + 35;
        this.setState({inAnimation: true});
        var shortestPath = constructShortestPath(nodes, startNode, endNode);
        if (shortestPath === "No path exist") {
            console.log("No path exist");
            return;
        }
        shortestPath = shortestPath.reverse();
        console.log(nodes);
        this.animateShortestPath(shortestPath,beforeTimeStartInterval,true);
        const setTimeoutAgainFk = shortestPath.length + beforeTimeStartInterval;
        setTimeout(() => {
            this.setState({alreadyVisualized: true, inAnimation:false})
        }, TIME_OUT_CONST * (setTimeoutAgainFk + 50))
    }

    visualizeAStar() {
        const {nodes,initialAnimationFinished,currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        const visitedNode = AStar(nodes, startNode, endNode);
        const beforeTimeStartInterval = this.animate(visitedNode) + 35;
        this.setState({inAnimation: true});
        var shortestPath = constructShortestPath(nodes, startNode, endNode);
        if (shortestPath === "No path exist") {
            console.log("No path exist");
            return;
        }
        shortestPath = shortestPath.reverse();
        console.log(nodes);
        this.animateShortestPath(shortestPath,beforeTimeStartInterval,true);
        const setTimeoutAgainFk = shortestPath.length + beforeTimeStartInterval;
        setTimeout(() => {
            this.setState({alreadyVisualized: true, inAnimation:false})
        }, TIME_OUT_CONST * (setTimeoutAgainFk + 50))
    }

    // visitedNode(List) = All of the nodes that makes the shortest path from start to end
    // beforeTimeStartInterval(Integer) = How many nodes are visited before we found our end node
    // shouldSetTimeout(Boolean) = determines if we should be using instant animation or not.
    animateShortestPath(visitedNode, beforeTimeStartInterval, shouldSetTimeout) {
        const newGrid = this.state.nodes.slice();
        // this.setState({inAnimation:true});
        // console.log("Setting shortest path inAnimation to true");
        if (shouldSetTimeout) {
            for (let i = 0; i < visitedNode.length; i++) {
                const node = visitedNode[i];
                const newNode = {
                    ...node,
                    isShortestPathNode: true,
                };
                setTimeout(() => {
                    newGrid[node.row][node.col] = newNode;
                    this.setState({nodes: newGrid});
                }, TIME_OUT_CONST * (i + beforeTimeStartInterval));
            }
        }
    }

    instantNonAnimation() {
        const {nodes, currentStartNode, currentEndNode} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        let visitedNode;
        if (this.state.algorithm === "BFS") {
            visitedNode = BFS(nodes, startNode, endNode);
        } else if (this.state.algorithm === "DFS") {
            visitedNode = DFS(nodes, startNode, endNode);
        }
        const newGrid = this.state.nodes.slice();
        for (let i =0; i < visitedNode.length; i++) {
            const node = visitedNode[i];
            const currentFinalNode = this.state.currentEndNode;
            if (node['nodeWeight'] === 1) {
                const newNode = {
                    ...node,
                    isAnimated: true,
                };
                newGrid[node.row][node.col] = newNode;
            }
        }
        this.setState({nodes:newGrid});
    }

    animate(visitedNode) {
        this.setState({inAnimation:true});
        // console.log(visitedNode.length);
        for (let i =0; i < visitedNode.length; i++) {
            const node = visitedNode[i];
            const currentFinalNode = this.state.currentEndNode;
            if (node.row === currentFinalNode[0] && node.col === currentFinalNode[1]) {
                setTimeout(() => {
                    this.setState({inAnimation:false});
                }, (i+20)*TIME_OUT_CONST);
                return i;
            }
            if (node['nodeWeight'] === 1) {
                setTimeout(() => {
                        const newGrid = this.state.nodes.slice();
                        const newNode = {
                            ...node,
                            isAnimated: true,
                        };
                        newGrid[node.row][node.col] = newNode;
                        this.setState({nodes: newGrid})
                    },
                    TIME_OUT_CONST * i);
            }
        }
    }

    instantAnimationWithShortestPath() {
        const {nodes,initialAnimationFinished,currentStartNode, currentEndNode, algorithm} = this.state;
        const startNode = nodes[currentStartNode[0]][currentStartNode[1]];
        const endNode = nodes[currentEndNode[0]][currentEndNode[1]];
        var visitedNode;
        if (algorithm === "Djikstra") {
            visitedNode = Dijkstra(nodes, startNode, endNode);
        } else if (algorithm ==="AStar") {
            visitedNode = AStar(nodes,startNode, endNode);
        }
        const newGrid = this.state.nodes.slice();
        for (let i =0; i < visitedNode.length; i++) {
            const node = visitedNode[i];
            const currentFinalNode = this.state.currentEndNode;
            if (node.row === currentFinalNode[0] && node.col === currentFinalNode[1]) {
                break;
            }
            const newNode = {
                ...node,
                isAnimated: true,
            };
            newGrid[node.row][node.col] = newNode;
        }
        // console.log("Before shortest path");
        var shortestPath = constructShortestPath(nodes, startNode, endNode);
        if (shortestPath === "No path exist") {
            console.log("No path exist");
            return;
        }
        shortestPath = shortestPath.reverse();
        for (let i = 0; i < shortestPath.length; i++) {
            const node = shortestPath[i];
            const newNode = {
                ...node,
                isShortestPathNode: true,
            };
            newGrid[newNode.row][newNode.col] = newNode;
        };
        this.setState({nodes:newGrid});
    }

    clearBoard(resetAlreadyVisualized) {
        const {nodes,currentStartNode,currentEndNode, inAnimation} = this.state;
        const newGrid = this.state.nodes.slice();
        if (!inAnimation) {
            for (var row = 0; row < nodes.length; row++) {
                const column = nodes[row];
                for (var col = 0; col < column.length; col++) {
                    var currentNode = column[col];
                    if (currentNode['isStart']) {
                        // currentNode['isWall'] = false;
                        currentNode['isAnimated'] = false;
                        currentNode['isVisited'] = false;
                        currentNode['isShortestPathNode'] = false;
                        currentNode['distance'] = 0;
                        currentNode['distanceSum'] = 0;
                        newGrid[row][col] = currentNode
                    } else {
                        // currentNode['isWall'] = false;
                        currentNode['isAnimated'] = false;
                        currentNode['isVisited'] = false;
                        currentNode['isShortestPathNode'] = false;
                        currentNode['distance'] = 99999999;
                        currentNode['distanceSum'] = 99999999;
                        newGrid[row][col] = currentNode
                    }
                }
            }
            console.log("After clearing board");
            // console.log(newGrid);
            this.setState({nodes:newGrid});
            if (resetAlreadyVisualized) {
                this.setState({alreadyVisualized:false})
            }
        }
    }

    clearWall() {
        const {nodes,inAnimation} = this.state;
        if (!inAnimation) {
            const newGrid = this.state.nodes.slice();
            for (var row = 0; row < nodes.length; row++) {
                const column = nodes[row];
                for (var col = 0; col < column.length; col++) {
                    var currentNode = column[col];
                    currentNode['isWall'] = false;
                    currentNode['nodeWeight'] = 1;
                }
            }
            this.setState({nodes: newGrid})
        }
    }


    visualizeAlgorithm() {
        const {algorithm} = this.state;
        this.clearBoard(true);
        // this.setState({alreadyVisualized:false});
        if (algorithm === "BFS") {
            this.visualizeBFS();
        } else if (algorithm === "DFS") {
            this.visualizeDFS();
        } else if (algorithm === "Djikstra") {
            this.visualizeDjikstra()
            // this.instantAnimationWithShortestPath();
        } else if (algorithm === "AStar") {
            this.visualizeAStar();
        }
    }

    selectSpeed(event) {
        if (event.target.value === "Fast") {
            TIME_OUT_CONST = 20;
        } else if (event.target.value === "Average") {
            TIME_OUT_CONST = 50;
        } else if (event.target.value === "Slow") {
            TIME_OUT_CONST = 100;
        }
    }

    selectAlgorithm(event) {
        this.setState({algorithm: event.target.value});
        this.clearBoard(true);
    }

    incrementCurrentSlide() {
        // console.log(this.state.currentScale);
        var currentVal = this.state.currentSlide;
        currentVal += 1;
        this.setState({currentSlide: currentVal});
        // this.setState({currentSlide: this.state.currentSlide + 1 });
        // console.log(this.state.currentSlide)
    }

    decrementCurrentSlide() {
        var currentVal = this.state.currentSlide;
        currentVal -= 1;
        this.setState({currentSlide: currentVal});
        // this.setState({currentSlide: this.state.currentSlide - 1 });
        console.log()
    }

    generateNextSectionButtons() {
        return (
            <div className='backOrNextSection'>
                <Button className='backButton' onClick={() => this.decrementCurrentSlide()}>
                    Back
                </Button>
                <Button className='nextButton' onClick={() => this.incrementCurrentSlide()}>
                    Next
                </Button>
            </div>
        )
    }

    initialTutorialSlideShow() {
        var chosenSlide = this.state.currentSlide;
        if (chosenSlide === 0 ) {
            return (
                <div className="tutorial">
                    Welcome to my pathfinding visualizer.<br></br>
                    This was a side project inspired by Clement Mihailescu's pathfinding visualizer. <br></br>
                    The goal is to show how the algorithm make their decision to reach the end point through visualization. <br></br>
                    Press next to begin the tutorial on how to navigate this visualizer. <br></br>
                    Click anywhere outside the modal to exit the tutorial and begin visualizing!
                    {this.generateNextSectionButtons()}
                    {/*I used this project as an opportunity to learn reactJS, front-end development and learn more about algorithms.*/}
                    {/*Welcome to my pathfinding visualizer. This was a side project inspired by Clement Mihailescu's pathfinding visualizer.*/}
                    {/*/!*The goal is to show what path the algorithms take before reaching their destination*!/*/}
                    {/*<Button className='skipButton'>*/}
                        {/*Skip*/}
                    {/*</Button>*/}
                </div>
            )
        } else if (chosenSlide === 1) {
            return (
            <div className='tutorial'>
                <div className='tutorialButtonContainer'>
                    <Button className="button tutorialMenu">
                        Visualize BFS
                    </Button>
                        Visualize BFS is used to start the path finding animation
                    <br></br>
                    <Button className="button tutorialMenu">
                        Clear Board
                    </Button>
                        Clear Board is used to reset the board to its initial state(no walls/no weights)
                    <br></br>
                    <Button className="button tutorialMenu">
                        Clear Wall
                    </Button>
                        Clear Wall is used to clear all the walls that were created
                    <br></br>
                    <Button className="button tutorialMenu">
                        Add Weight
                    </Button>
                        Add weight is used to add weight to a specific node
                    <br></br>
                    <Button className="button tutorialMenu">
                        BFS
                    </Button>
                        The BFS dropdown menu is used to select which algorithm to visualize
                    <br></br>
                    <Button className="button tutorialMenu">
                        Speed:
                    </Button>
                        The speed dropdown menu is used to select how fast you want the algorithm to run
                    <br></br>
                </div>
                {this.generateNextSectionButtons()}
            </div>
            )
        } else if (chosenSlide == 2) {
            return (
                <div className='tutorial'>
                    Walls can be made by clicking on any node and then dragging it across the grid as shown in the video below.
                    <br></br>
                    {/*<video controls autoPlay={true} loop={true}>*/}
                        {/*<source src={"src/traffic.mp4"} type={"video/mp4"}>*/}
                        {/*</source>*/}
                    {/*</video>*/}
                    {/*<iframe width={200} height={200} src="https://www.youtube.com/watch?v=K79n-yRmTR0">*/}
                    {/*</iframe>*/}
                    {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/sLAO2QartWk" frameBorder="0"*/}
                            {/*allow="accelerometer; autoplay=enabled; encrypted-media; gyroscope; picture-in-picture"*/}
                            {/*allowFullScreen>*/}
                    {/*</iframe>*/}
                    <img src={wallCreation}>
                    </img>
                    {/*<img src={"src/PathFindingVisualizer/Resources/WallCreation.gif"}>*/}
                    {/*</img>*/}
                    {this.generateNextSectionButtons()}
                </div>
            )
        }
    }

    render() {
        console.log(this.state.currentSlide);
        const {nodes, mousePressed,algorithm, alreadyVisualized, addingWeight} = this.state;
        var message = "Add Weight";
        if (addingWeight) {
            message = "Stop Adding Weight";
        }
        return (
            <div className ="outerContainer">
                {/*<Popup className={'popupSizing'}*/}
                    {/*modal={true}*/}
                    {/*defaultOpen={true}*/}
                       {/*position = "center center"*/}
                {/*>*/}
                    {/*{this.initialTutorialSlideShow()}*/}
                {/*</Popup>*/}
                <Tutorial>
                </Tutorial>
                <nav className="navbar navbar-expand-lg navbar-light bg-light centerNavbar">
                    <Button className="button" onClick={() => this.visualizeAlgorithm()}>
                        Visualize {algorithm}
                    </Button>
                    <Button className="button" onClick={() => this.clearBoard(true)}>
                        Clear Board
                    </Button>
                    <Button className="button" onClick={() => this.clearWall()}>
                        Clear Wall
                    </Button>
                    <Button className="button" onClick={() => this.setAddingWeight()}>
                        {message}
                    </Button>
                    <Button className="button">
                        <div className ="dropdown">
                            <select className ="AlgorithmSelect" onChange={this.selectAlgorithm}>
                                <option value="BFS"> BFS</option>
                                <option value="DFS"> DFS</option>
                                <option value="Djikstra"> Djikstra </option>
                                <option value="AStar"> A* </option>
                            </select>
                        </div>
                    </Button>
                    <Button className="button">
                        <div className ="dropdown">
                            Speed:
                            <select className = "AlgorithmSelect" onChange = {this.selectSpeed} >
                                <option value="Fast"> Fast </option>
                                <option value="Slow"> Slow </option>
                                <option value="Average"> Average </option>
                            </select>
                        </div>
                    </Button>
                </nav>
                <div className = "iconListDiv">
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
                        <li className="iconList">
                            <div className='box weightedNode'>
                            </div>
                            Weighted Node
                        </li>
                    </ul>
                </div>
                <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className={`row-${rowIdx}`}>
                            {row.map((node, nodeIdx) => {
                                const {isStart, isFinish,isAnimated, row, col,isWall, isShortestPathNode,nodeWeight} = node;
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
                                        onMouseOver={ () => this.handleMouseOver(row,col)}
                                        row={row}
                                        col={col}
                                        instantAnimation = {alreadyVisualized}
                                        nodeWeight = {nodeWeight}
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
