export default class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    substract(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    multiply(factor) {
        return new Vector2D(this.x * factor, this.y * factor);
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