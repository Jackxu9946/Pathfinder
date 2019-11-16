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
        } = this.props;
        const extraClassName = isFinish ? 'node-finish':
            isStart ? 'node-start':
            isShortestPathNode ? 'node-shortest-path':
            isAnimated ? 'node-visited':
            isWall ? 'node-wall':
            '';
        //console.log(extraClassName);
        return <div
            id = {`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown ={() => onMouseDown(row,col)}
            onMouseEnter ={() => onMouseEnter(row,col)}
            onMouseUp = {() => onMouseUp}>
        </div>;
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};

