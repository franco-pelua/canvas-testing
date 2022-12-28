import { Circle, Rectangle } from "./shapes.js";

export class Canvas {
    constructor(element) {
        this.canvas = element;
        this.context = element.getContext('2d');
        this.objects = {};
        this.rendering;
    }

    setup(width = document.documentElement.clientWidth - 20, height = document.documentElement.clientHeight - 20) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.focus();
    }

    #clear() { 
        return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    getObject(id) {
        return this.objects[id];
    }

    render = (fn) => { 
        if(typeof this.rendering == 'undefined') this.rendering = fn;
        this.#clear();
        this.rendering();
        requestAnimationFrame(this.render);
    }

    edges(mode) {
        switch(mode) {
            case 'rebound':
                for(let key in this.objects) {
                    let object = this.objects[key];
                    if(object.position.x > this.canvas.width) { 
                        this.objects[key].position.x = this.canvas.width;
                        this.objects[key].velocity.x *= -1; 
                    }
                    if(object.position.x < 0) {
                        this.objects[key].position.x = 0;
                        this.objects[key].velocity.x *= -1;
                    }
                    if(object.position.y > this.canvas.height) { 
                        this.objects[key].position.y = this.canvas.height;
                        this.objects[key].velocity.y *= -1; 
                    }
                    if(object.position.y < 0) {
                        this.objects[key].position.y = 0;
                        this.objects[key].velocity.y *= -1;
                    }
                } 
            break;
            default:
                for (let key in this.objects) {
                    let object = this.objects[key];
                    if(object.position.x > this.canvas.width) this.objects[key].position.x = 0;
                    if(object.position.x < 0) this.objects[key].position.x = this.canvas.width;
                    if(object.position.y > this.canvas.height) this.objects[key].position.y = 0;
                    if(object.position.y < 0) this.objects[key].position.y = this.canvas.height; 
                }
                break;
        }
    }
    
    draw() {    
        for (let key in this.objects) {
            this.objects[key].draw();
        }
    }

    // position_vector can be a Vector2D class or a plain literal object with x and y properties. 
    rect(id, position_vector = {x: 0, y: 0}, mass = 0, h, w, color) { // need to check if there is a missing parameter
        if(this.objects[id]) return alert('There already exists an object with such id! ids must be unique.');

        this.objects[id] = new Rectangle(id, this.context, position_vector, mass, h, w, color);
    }
    
    arc(id, position = {x: 0, y: 0}, mass = 0, radius = 1, color, startAngle = 0, endAngle = 2*Math.PI, counterclockwise = false) { // need to check if there is a missing parameter
        if(this.objects[id]) return alert('There already exists an object with such id! ids must be unique.');

        this.objects[id] = new Circle(id, this.context, position, mass, radius, color, startAngle, endAngle, counterclockwise);
    }
}   

