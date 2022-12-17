import { Vector2D } from "./vector2d.js"

// 
// Shape class
// 

class Shape {
    constructor(id, canvas_context = document.getElementsByTagName('canvas')[0].getContext('2d'), position = {x: 0, y: 0 }, height, width) {
        this.id = id, 
        this.canvas_context = canvas_context,
        this.position = {
            x: position.x, 
            y: position.y
        },
        this.height = height, 
        this.width = width, 
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

    move(show_velocity = false) {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.max_velocity);

        // => Once key is freed, velocity is instantly set to 0
        if(!this.acceleration.x) this.setVelocity(new Vector2D(0, this.velocity.y));
        if(!this.acceleration.y) this.setVelocity(new Vector2D(this.velocity.x, 0));

        if(!this.velocity.x && !this.velocity.y) return; // Don't move if velocity is 0

        this.position = {
            x: this.position.x + this.velocity.x,
            y: this.position.y + this.velocity.y
        }

        if(show_velocity) this.velocity.show(undefined, this);
    }
}

export class Rectangle extends Shape {
    constructor(id, canvas_context, position, height, width, color) {
        super(id, canvas_context, position, height, width);
        this.color = color
    }

    draw() {
        this.canvas_context.beginPath();
        this.canvas_context.fillStyle = this.color;
        this.canvas_context.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.canvas_context.closePath();
    }
}