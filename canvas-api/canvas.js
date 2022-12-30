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
        if(this.objects.length < 1) return;

        switch(mode) {
            case 'rebound':
                for(let key in this.objects) {
                    let object = this.objects[key];
                    if(object.position.x > this.canvas.width || object.position.x < 0) { 
                        this.objects[key].velocity.x *= -1; 
                    }
                    if(object.position.y > this.canvas.height || object.position.y < 0) { 
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
        if(this.objects.length < 1) return;

        for (let key in this.objects) {
            this.objects[key].draw();
        }
    }
 
    rect(config) { 
        const { id, position_vector = {x: 0, y: 0}, mass = 0, h = 10, w = 10, color = black } = config;

        if(typeof id === 'undefined') throw new Error('Rect shape could not be instantiated. ID property is missing')

        if(this.objects[id]) throw new Error('There already exists an object with such id! ids must be unique.');

        this.objects[id] = new Rectangle(id, this.context, position_vector, mass, h, w, color);
    }
    
    arc(config) {
        const { id, position = {x: 0, y: 0}, mass = 0, radius = 1, color = 'black', startAngle = 0, endAngle = 2*Math.PI, counterclockwise = false } = config;

        if(typeof id === 'undefined') throw new Error('Arc shape could not be instantiated. ID property is missing')
        
        if(this.objects[id]) throw new Error('There already exists an object with such id! ids must be unique.');

        this.objects[id] = new Circle(id, this.context, position, mass, radius, color, startAngle, endAngle, counterclockwise);
    }
}   

