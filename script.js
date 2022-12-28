import { Canvas } from './canvas-api/canvas.js';
import { Vector2D }  from './canvas-api/vector2d.js'
import Controller2D from './canvas-api/controller2d.js';

const c = new Canvas(document.getElementById('canvas'));
const myController = new Controller2D(c.canvas);

c.setup();

c.arc('myCircle', {x: 300, y: 300}, 2, 20, 'red'); 

function onKeyDown(acceleration) {
    const myCircle = c.getObject('myCircle');
    console.log(acceleration)
    myCircle.applyForce(acceleration);
}

const acceleration = 0.1;
const gravity = new Vector2D(0, 0.01);

myController.assign({
    'ArrowUp': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: [new Vector2D(0, -acceleration)]
        }
        
    ],
    'ArrowDown': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: [new Vector2D(0, acceleration)]
        }
    ],
    'ArrowLeft': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: [new Vector2D(-acceleration, 0)]
        },
    ],
    'ArrowRight': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: [new Vector2D(acceleration, 0)]
        },
    ]
});

myController.execute();

c.render(function() {
    c.edges('rebound');
    c.draw();
    
    const myCircle = c.getObject('myCircle');    
    myController.move();
    
    // this is because Fg = m1 * m2 * G / d^2, if we assume m1, G and d^2 to be constant, then Fg = C * m2. 
    // Given 2nd Newton Law, A = Fn / m, we know that a force's effect on a object will be inversely proportional to the object's mass 
    // which means that for instance, gravity should react diffently on objects with different masses, but we know for a fact that it doesnt happen that way when we have two objects with a huge difference in mass interact with each other, i. e Earth and a human.
    // because of that, when applying gravity to an object, we should always multiply our gravity magnitude by a factor of our object mass, that way, when 2dn Newton Law is enforced, gravity will be unaffected.
    myCircle.applyForce(Vector2D.multiply(gravity, myCircle.mass));

    myCircle.stats(10, 20);
    myCircle.update(true);
}) 