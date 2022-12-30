export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;        
    }

    static add(vector1, vector2) {
        return new Vector2D(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    substract(vector) {
        this.x -= vector.x;
        this.y  -= vector.y;
    }

    static substract(vector1, vector2) {
        return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    multiply(factor) {
        this.x *= factor;
        this.y *= factor;    
    }

    static multiply(vector, factor) {
        return new Vector2D(vector.x * factor, vector.y * factor);
    }

    divide(factor) {
        this.x /= factor;
        this.y /= factor;
    }

    static divide(vector, factor) {
        return new Vector2D(vector.x / factor, vector.y / factor);
    }
   
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
        let starting_x_point = assigned_shape.position.x + (assigned_shape?.width / 2);
        let starting_y_point = assigned_shape.position.y + (assigned_shape?.height / 2);

        if(assigned_shape.radius) {
            starting_x_point = assigned_shape.position.x;
            starting_y_point = assigned_shape.position.y;
        }

        let final_x_point = starting_x_point + this.x;
        let final_y_point = starting_y_point + this.y;
        
        canvas_context.strokeStyle = 'black';
        canvas_context.beginPath();
        canvas_context.moveTo(starting_x_point, starting_y_point);
        canvas_context.lineTo(final_x_point, final_y_point);
        canvas_context.stroke();
    }
}