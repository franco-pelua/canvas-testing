import { Vector2D } from "./vector2d.js"

class Shape {
    constructor(id, canvas_context = document.getElementsByTagName('canvas')[0].getContext('2d'), position = {x: 0, y: 0 }) {
        this.id = id, 
        this.canvas_context = canvas_context,
        this.position = {
            x: position.x, 
            y: position.y
        },
        this.acceleration = new Vector2D(0, 0), // Must be updated with its setter
        this.velocity = new Vector2D(0, 0), // Must be updated with its setter
        this.max_velocity = 1 // Must be updated with its setter
    }

    setAcceleration(vector) { // TODO: Must implement type check to ensure that a Vector2D class is given as argument
        this.acceleration = vector;
    }

    setVelocity(vector) { // TODO: Must implement type check to ensure that a Vector2D class is given as argument
        this.velocity = vector;
    }

    setMaxVelocity(value) {
        this.max_velocity = value;
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    update(show_velocity = false) {
        // Assuming that 2nd Newton Law of Motion says F = A
        // ISSUE: If I add forces to acceleration before limiting shape's own motion velocity, then external forces will lose their effect on velocity after reaching that max speed.

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.max_velocity);

        if(!this.velocity.x && !this.velocity.y) return; // Don't move if velocity is 0

        this.position = {
            x: this.position.x + this.velocity.x,
            y: this.position.y + this.velocity.y
        }
        
        if(show_velocity) this.velocity.show(undefined, this);
        
        this.acceleration.multiply(0);
    }

    stats(x, y) {
        this.canvas_context.font = '12px Arial';
        this.canvas_context.fillText(`${this.id}'s stats (SHAPE):`, x, y);
        this.canvas_context.fillText(`Position (X Y): ${this.position.x} - ${this.position.y}`, x, y + 15);        
        this.canvas_context.fillText(`Velocity (X Y): ${this.velocity.x} - ${this.velocity.y}`, 10, y + 30);
        this.canvas_context.fillText(`Acceleration (X Y): ${this.acceleration.x} - ${this.acceleration.y}`, 10, y + 45);

    }
}

export class Rectangle extends Shape {
    constructor(id, canvas_context, position, height, width, color) {
        super(id, canvas_context, position);
        this.height = height,
        this.width = width,
        this.color = color
    }

    draw() {
        this.canvas_context.beginPath();
        this.canvas_context.fillStyle = this.color;
        this.canvas_context.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.canvas_context.closePath();
    }
}

export class Circle extends Shape { 
    constructor(id, canvas_context, position, radius, color, startAngle = 0, endAngle = 2 * Math.PI, counterclockwise = false) {
        super(id, canvas_context, position);
        this.radius = Math.abs(radius),
        this.color = color,
        this.startAngle = startAngle,
        this.endAngle = endAngle,
        this.counterclockwise = counterclockwise
    }

    draw() {
        this.canvas_context.beginPath();
        this.canvas_context.fillStyle = this.color;
        this.canvas_context.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, this.counterclockwise);
        this.canvas_context.fill();
    }

    // REFERENCE: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
}