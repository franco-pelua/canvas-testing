import { Vector2D } from "./vector2d.js";
import { Rectangle } from "./shapes.js";

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

    render = (fn) => { 
        if(typeof this.rendering == 'undefined') this.rendering = fn;
        this.#clear();
        this.rendering();
        requestAnimationFrame(this.render);
    }

    #clear() { 
        return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getObject(id) {
        return this.objects[id];
    }

    // position_vector can be a Vector2D class or a plain literal object with x and y properties. 
    rect(id, position_vector, h, w, color) {
        if(this.objects[id]) return alert('There already exists an object with such id! ids must be unique.');

        this.objects[id] = new Rectangle(id, this.context, position_vector, h, w, color);
    }
}   

