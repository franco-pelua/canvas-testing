/*
---------------------
| MAIN CANVAS CLASS |
---------------------
*/

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
            velocity: new Vector2D(0, 0),
            updatePosition: (show_speed = false) => {         
                const obj_instance = this.objects[tag];

                if(!obj_instance.velocity || (!obj_instance.velocity.x && !obj_instance.velocity.y)) return;

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

/* 
------------------
| CLASS VECTOR2D |
------------------
*/ 

export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector2D((this.x + vector.x), (this.y + vector.y));
    }

    substract(vector) {
        return new Vector2D((this.x - vector.x), (this.y - vector.y));
    }

    multiply(factor) {
        return new Vector2D((this.x * factor), (this.y * factor));
    }
   
    // https://en.wikipedia.org/wiki/Pythagorean_theorem
    mag() { 
        return Math.sqrt(this.x**2 + this.y**2); // since it's exponential operation, the value will always be +

        // NOTE: Need to check because I don't think that just by x and y coordinates of the final point you can get the magnitude 
    }

    show(canvas_context, assigned_shape) { 
        const starting_x_point = assigned_shape.position.x + (assigned_shape.width / 2);
        const starting_y_point = assigned_shape.position.y + (assigned_shape.height / 2);
        let final_x_point;
        let final_y_point;

        if(this.x === 0) {
            final_x_point = starting_x_point;
        } else {
            final_x_point = this.x < 0 ? starting_x_point - this.mag() : starting_x_point + this.mag();
        }

        if(this.y === 0) {
            final_y_point = starting_y_point;
        } else {
            final_y_point = this.y < 0 ? starting_y_point - this.mag() : starting_y_point + this.mag();;
        }
        
        canvas_context.strokeStyle = 'black';
        canvas_context.beginPath();
        canvas_context.moveTo(starting_x_point, starting_y_point);
        canvas_context.lineTo(final_x_point, final_y_point);
        canvas_context.stroke();
    }
}

/*
    References:
        - https://en.wikipedia.org/wiki/Euclidean_vector#:~:text=In%20mathematics%2C%20physics%2C%20and%20engineering,vectors%20according%20to%20vector%20algebra.
        - https://processing.org/reference/PVector.html
*/
