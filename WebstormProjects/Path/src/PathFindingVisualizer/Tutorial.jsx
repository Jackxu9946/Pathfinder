import {Button} from "react-bootstrap";
import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import './Tutorial.css';
import rightArrow from "./Resources/right_arrow.jpg"
import leftArrow from "./Resources/left_arrow.jpg"
// import React from "react";

export default class Tutorial extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            currentSlide: 0,
            show:true
        }
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
        }
    }

    handleClose() {
        this.setState({show:false});
    }

    render() {
        const {show} = this.state;
        return (
            <>
            <Modal show={show} centered={true} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.generateTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.generateBody()}</Modal.Body>
                <Modal.Footer>
                    {this.generateNextSectionButtons()}
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}