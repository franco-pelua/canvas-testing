export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;        
    }

    substract(vector) {
        this.x -= vector.x;
        this.y  -= vector.y;
    }

    multiply(factor) {
        this.x *= factor;
        this.y *= factor;    
    }
   
    // https://en.wikipedia.org/wiki/Pythagorean_theorem
    mag() { 
        return Math.sqrt(this.x**2 + this.y**2); // since it's exponential operation, the value will always be +
    }

    normalize() {
        const x = this.x < 0 ? -(this.x / this.x) : this.x / this.x;
        const y = this.y < 0 ? -(this.y / this.y) : this.y / this.y;
        this.x = isNaN(x) ? 0 : x;
        this.y = isNaN(y) ? 0 : y;
    }

    limit(value) {
        if(!value) return;
        this.x > value ? this.x = value : this.x;
        this.x < -value ? this.x = -value : this.x;
        this.y > value ? this.y = value : this.y
        this.y < -value ? this.y = -value : this.y
    }

    show(canvas_context = document.getElementsByTagName('canvas')[0].getContext('2d'), assigned_shape) { 
        let starting_x_point = assigned_shape.position.x + (assigned_shape.width / 2);
        let starting_y_point = assigned_shape.position.y + (assigned_shape.height / 2);

        if(assigned_shape.radius) {
            starting_x_point = assigned_shape.position.x;
            starting_y_point = assigned_shape.position.y;
        }

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
            final_y_point = this.y < 0 ? starting_y_point - this.mag() : starting_y_point + this.mag();
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
