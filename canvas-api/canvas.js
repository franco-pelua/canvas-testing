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

    // p_vector can be a Vector2D class or a plain literal object with x and y properties. 
    rect(tag, position_vector, w, h, color) {
        if(this.objects[tag]) return alert('There already exists an object with such tag! Tags must be unique.');

        const obj = {
            id: tag, 
            position: {
                x: position_vector.x,
                y: position_vector.y
            },
            height: h, 
            width: w,
            velocity: 0,
            updatePosition: (show_speed = false) => {         
                const obj_instance = this.objects[tag];

                if(obj_instance.velocity === 0) return;

                this.objects[tag] = {
                    ...obj_instance,
                    position: {
                        x: obj_instance.position.x + obj_instance.velocity.x * 0.01,
                        y: obj_instance.position.y + obj_instance.velocity.y * 0.01
                    },
                }  
                
                if(!show_speed) return;

                obj_instance.velocity.show(this.context, obj_instance);
            },
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
                this.context.fillRect(obj.position.x, obj.position.y, obj.width, obj.height);
                this.context.closePath();
                return this.objects[tag];
            }
        }

        this.objects[obj.id] = obj;
   
        return obj;
    }
}   