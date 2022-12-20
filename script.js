import { Canvas } from './canvas-api/canvas.js';
import { Vector2D }  from './canvas-api/vector2d.js'
import Controller2D from './canvas-api/controller2d.js';

const c = new Canvas(document.getElementById('canvas'));
const myController = new Controller2D(c.canvas);

c.setup();

// c.rect('myRect', {x: 400, y: 400}, 30, 30, 'blue');

c.arc('myRect', {x: 300, y: 300}, 20, '');

c.getObject('myRect').setMaxVelocity(1);   

function onKeyDown(keyName, acceleration) {
    const myRect = c.getObject('myRect');
    
    myRect.applyForce(acceleration);
}

function onKeyUp(keyName, acceleration) {
    const myRect = c.getObject('myRect'); 
    
    myRect.applyForce(acceleration);       
}

const acceleration = 0.1;

myController.assign({
    'ArrowUp': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowUp', new Vector2D(0, -acceleration)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowUp', new Vector2D(0, -acceleration)]
        }
    ],
    'ArrowDown': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowDown', new Vector2D(0, acceleration)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowDown', new Vector2D(0, acceleration)]
        }
    ],
    'ArrowLeft': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowLeft', new Vector2D(-acceleration, 0)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowLeft', new Vector2D(-acceleration, 0)]
        }
    ],
    'ArrowRight': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowRight', new Vector2D(acceleration, 0)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowRight', new Vector2D(acceleration, 0)]
        }
    ]
});

myController.execute();



c.render(function() {
    c.edges();
    c.draw();
    
    const myRect = c.getObject('myRect');    
    // myRect.applyForce(new Vector2D(0, 0.001))
    myRect.stats(10, 20);
    
    myRect.update(true);
}) 