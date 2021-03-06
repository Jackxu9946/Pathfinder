import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {isFinish,
            isStart,
            isAnimated,
            row,
            col,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            isShortestPathNode,
            instantAnimation,
            onMouseOver,
            nodeWeight,
        } = this.props;
        var extraClassName = isFinish ? 'node-finish':
            isStart ? 'node-start':
            isShortestPathNode ? 'node-shortest-path':
            isAnimated ? 'node-visited':
            isWall ? 'node-wall':
            nodeWeight !== 1 ? 'node-weight':
            '';
        if (instantAnimation && !isStart && !isFinish) {
            if (extraClassName === "node-shortest-path" || extraClassName === "node-visited") {
                extraClassName += "-instant-animation"
            }
        }
        return <div
            id = {`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown ={() => onMouseDown(row,col)}
            onMouseEnter ={() => onMouseEnter(row,col)}
            onMouseOver = {() => onMouseOver(row,col)}
            onMouseUp = {() => onMouseUp(row,col)}>
        </div>;
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};

