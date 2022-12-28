import { Vector2D } from "./vector2d.js"

class Shape {
    constructor(id, canvas_context = document.getElementsByTagName('canvas')[0].getContext('2d'), position = {x: 0, y: 0 }, mass) {
        this.id = id, 
        this.canvas_context = canvas_context,
        this.position = {
            x: position.x, 
            y: position.y
        },
        this.mass = mass, 
        this.acceleration = new Vector2D(0, 0), // Must be updated with its setter
        this.velocity = new Vector2D(0, 0) // Must be updated with its setter
    }

    applyForce(force){
        // 2nd Newton Law of Motion: F = A * M || A = F / M
        const newton_force = Vector2D.divide(force, this.mass);
        this.acceleration.add(newton_force);
    }

    update(show_velocity = false) {
        this.velocity.add(this.acceleration);

        if(!this.velocity.x && !this.velocity.y) return; // Don't move if velocity is 0

        this.position = {
            x: this.position.x + this.velocity.x,
            y: this.position.y + this.velocity.y
        }
        
        if(show_velocity) this.velocity.show(undefined, this);
        
        this.acceleration.multiply(0);
    }

    // if you want to log changes in a stat, you should call this method after the modification and before the update method.
    stats(x, y) {
        this.canvas_context.font = '12px Arial';
        this.canvas_context.fillText(`${this.id}'s stats (SHAPE):`, x, y);
        this.canvas_context.fillText(`Position (X Y): ${this.position.x} - ${this.position.y}`, x, y + 15);        
        this.canvas_context.fillText(`Velocity (X Y): ${this.velocity.x} - ${this.velocity.y}`, 10, y + 30);
        this.canvas_context.fillText(`Acceleration (X Y): ${this.acceleration.x} - ${this.acceleration.y}`, 10, y + 45);
    }
}

export class Rectangle extends Shape {
    constructor(id, canvas_context, position, mass, height, width, color) {
        super(id, canvas_context, position, mass);
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
    constructor(id, canvas_context, position, mass, radius, color, startAngle = 0, endAngle = 2 * Math.PI, counterclockwise = false) {
        super(id, canvas_context, position, mass);
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