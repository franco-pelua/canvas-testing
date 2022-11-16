export default class Canvas {
    constructor(element) {
        this.canvas = element;
        this.context = element.getContext('2d');
        this.objects = {};
        this.rendering;
    }

    setup(fn) {
        return fn();
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

    rect(tag, px, py, w, h, color) {
        if(this.objects[tag]) return alert('There already exists an object with such tag! Tags must be unique.');

        const obj = {
            id: tag, 
            x: px, 
            y: py, 
            height: h, 
            width: w,
            update: (data) => {
                if(!this.objects[tag]) return alert('The instance for this object does not exist');

                if(data.id) return alert('IDs must not be changed');

                this.objects[tag] = {
                    ...this.objects[tag],
                    ...data
                }

                return this.objects;
            },
            draw: () => {
                const obj = this.objects[tag];
                this.context.beginPath();
                this.context.fillStyle = color;
                this.context.fillRect(obj.x, obj.y, obj.width, obj.height);
                this.context.closePath();
                return this.objects[tag];
            }
        }

        this.objects[obj.id] = obj;
   
        return obj;
    }
}   