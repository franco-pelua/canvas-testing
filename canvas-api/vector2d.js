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
   
    mag() { // https://en.wikipedia.org/wiki/Pythagorean_theorem
        return Math.sqrt(this.x**2 + this.y**2); 
        // NOTE: Need to check because I don't think that just by x and y coordinates of the final point you can get the magnitude 
    }

    show(canvas_context, assigned_shape) { // color must be a string indicating a color
        const starting_x_point = assigned_shape.position.x + (assigned_shape.width / 2);
        const starting_y_point = assigned_shape.position.y + (assigned_shape.height / 2);

        canvas_context.strokeStyle = 'black';
        canvas_context.beginPath();
        canvas_context.moveTo(starting_x_point, starting_y_point);
        canvas_context.lineTo(starting_x_point + this.mag(), starting_y_point + this.mag());
        canvas_context.stroke();
    }
}

/*
    References:
        - https://en.wikipedia.org/wiki/Euclidean_vector#:~:text=In%20mathematics%2C%20physics%2C%20and%20engineering,vectors%20according%20to%20vector%20algebra.
        - https://processing.org/reference/PVector.html
*/