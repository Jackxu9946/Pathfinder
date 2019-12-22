import {Button} from "react-bootstrap";
import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import './Tutorial.css';
import rightArrow from "./Resources/right_arrow.jpg"
import leftArrow from "./Resources/left_arrow.jpg"
import wallCreation from "./Resources/WallCreation.gif"
import instantUpdate from "./Resources/InstantUpdate.gif"
// import React from "react";

export default class Tutorial extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            currentSlide: 0,
            show:true,
            alreadyHidden: false,
        };
        this.handleClose = this.handleClose.bind(this);
    }

    incrementCurrentSlide() {
        var currentVal = this.state.currentSlide;
        currentVal += 1;
        this.setState({currentSlide: currentVal});
    }

    decrementCurrentSlide() {
        var currentVal = this.state.currentSlide;
        currentVal -= 1;
        this.setState({currentSlide: currentVal});
        console.log()
    }

    handleKeyPress = event => {
        if (this.state.show) {
            if (event.key === "ArrowLeft") {
                this.decrementCurrentSlide()
            } else if (event.key === "ArrowRight") {
                this.incrementCurrentSlide()
            }
        }
        // console.log(event.key);
    };
    generateNextSectionButtons() {
        return (
            <div className='backOrNextSection'>
                <Button className='backButton' onClick={() => this.decrementCurrentSlide()}>
                <img src={leftArrow} height={50} width={50}>
                </img>
                </Button>
                <Button className='nextButton' onClick={() => this.incrementCurrentSlide()}>
                <img src={rightArrow} height={50} width={50}>
                </img>
                </Button>
             </div>
        )
    }

    generateBody() {
        if (this.state.currentSlide === 0) {
            return (
                <div>
                    Welcome to my pathfinding visualizer. The goal of this website is to demonstrate how path algorithms arrive at their destination by illustrating the steps they take.
                </div>
            )
        } else if (this.state.currentSlide === 1) {
            return (
                <div>
                    A Pathfinding algorithms are usually an attempt to solve the shortest path problem. They try to find the best path given a starting point and ending point based on some predefined criteria.
                    <br></br>
                    Different pathfinding algorithm have different purposes. For example, Djikstra is used to find the shortest path with positive weights while
                    Bellman-Ford is used to find the shortest path in a graph with negative weights.
                </div>
            )
        } else if(this.state.currentSlide === 2) {
            return (
                <div>
                    All of the boxes on this grid represents a node and the default value to move from one node to another is 1. This can be changed via add weight option when an algorithm allows it.
                </div>
            )
        } else if (this.state.currentSlide ===3) {
            return (
                <div className='tutorialLayout'>
                    <Button className="button">
                        Visualize
                    </Button>
                    <p>
                    Used to begin the animation
                    </p>
                    <Button className="button">
                        Clear Board
                    </Button>
                    <p>
                    Used to clear all the visited node
                    </p>
                    <Button className="button">
                        Clear Wall
                    </Button>
                    <p>
                    Used to clear wall
                    </p>
                    <Button className="button">
                        Add Weight
                    </Button>
                    <p>
                    Used to switch from adding wall to adding weight
                    </p>
                </div>
            )
        } else if (this.state.currentSlide === 4) {
            return (
                <div className="tutorialLayout">
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
                    <p>
                        Used to select which algorithm to visualize
                    </p>
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
                    <p>
                        Used to how fast the visualization runs
                    </p>
                </div>
            )
        } else if (this.state.currentSlide === 5) {
            return (
                <p>
                    You can make walls by holding down left click and hovering over any node.
                    <br></br>
                    Stop making wall by letting go of left click.
                    <br></br>
                    Convert any wall back to normal node by hovering over the wall node while holding left click.
                    <br></br>
                    <img className ="tutorialVideo"src={wallCreation}>
                    </img>
                </p>
            )
        } else if (this.state.currentSlide === 6) {
            return (
                <p>
                    After the pathfinding algorithm has found it's destination. You can click on the start/end node
                    to move them and the path will instantly update.
                    <br></br>
                    <img className ="tutorialVideo" src={instantUpdate}>
                    </img>
                </p>
            )
        } else if (!this.state.alreadyHidden) {
            this.setState({alreadyHidden:true, show:false})
        }
    }

    generateTitle() {
        if (this.state.currentSlide === 0) {
            return (
                <div>
                    Introduction
                </div>
            )
        } else if (this.state.currentSlide === 1) {
            return (
                <div>
                    What are pathfinding algorithms?
                </div>
            )
        } else if (this.state.currentSlide === 2) {
            return (
                <div>
                    Grid layout
                </div>
            )
        } else if (this.state.currentSlide === 3) {
            return (
                <div>
                    Buttons
                </div>
            )
        } else if (this.state.currentSlide === 4) {
            return (
                <div>
                    Dropdown
                </div>
            )
        } else if(this.state.currentSlide === 5) {
            return (
                <div>
                    Wall making!
                </div>
            )
        } else if(this.state.currentSlide === 6) {
            return (
                <div>
                    Instant path update!
                </div>
            )
        }
    }


    handleClose() {
        this.setState({show:false});
    }

    render() {
        const {show} = this.state;
        return (
            <>
                <div tabIndex="0" onKeyDown={this.handleKeyPress}>
                    <Modal show={show} centered={true} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.generateTitle()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.generateBody()}</Modal.Body>
                        <Modal.Footer>
                            {this.generateNextSectionButtons()}
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }
}