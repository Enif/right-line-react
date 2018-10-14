import React, { Component } from 'react';

class Main extends Component {

    constructor() {
        super();
        this.isMouseDown = false;

        this.state = {
            x: 0,
            y: 0    
        }
    }

    onDrawMode = (e) => {
        console.log(`onDrawMode (x:${e.clientX}, y:${e.clientY})`);
        this.isMouseDown = true;
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    offDrawMode = () => {
        this.isMouseDown = false
    }

    drawLine = (e) => {
        console.log(`DrawLine (x:${e.clientX}, y:${e.clientY})`);
        if(this.isMouseDown) {
            let context = e.target.getContext('2d');
            console.log(context);
            context.beginPath();
            context.moveTo(this.state.x - context.canvas.offsetLeft, this.state.y - context.canvas.offsetTop);
            context.lineTo(e.clientX - context.canvas.offsetLeft, e.clientY - context.canvas.offsetTop);
            context.strokeStyle = '#000000';
            context.stroke();
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
    }

    resetCanvas = () => {
        console.log('reset Canvas');
        let context = this.refs.canvas.getContext('2d');
        context.clearRect(0, 0, 500, 500);
    }

    render() {
        return (
            <div onMouseUp={() => this.offDrawMode()}>
                <h1>please draw the right line</h1>
                <canvas className="my-canvas" width="500px" height="500px" ref="canvas"
                    onMouseDown={(e) => this.onDrawMode(e)}
                    onMouseMove={(e) => this.drawLine(e)}
                    onMouseLeave={() => this.offDrawMode()}
                />
                <div className="button-wrapper">
                    <button onClick={() => this.resetCanvas()}>reset</button>
                    <button>submit</button>
                </div>
            </div>
        );
    }
}

export default Main;
