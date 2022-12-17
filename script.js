import { Canvas } from './canvas-api/canvas.js';
import { Vector2D }  from './canvas-api/vector2d.js'
import Controller2D from './canvas-api/controller2d.js';

const c = new Canvas(document.getElementById('canvas'));
const myController = new Controller2D(c.canvas);

c.setup();

c.rect('myRect', {x: 400, y: 400}, 30, 30, 'blue');


c.getObject('myRect').setMaxVelocity(5);   

function onKeyDown(keyName, acceleration) {
    const myRect = c.getObject('myRect');
    const isKeyPressed = myController.active_keys.includes(keyName); 

    if(isKeyPressed) return null;

    myController.active_keys.push(keyName);

    myRect.acceleration.add(acceleration);
}

function onKeyUp(keyName, acceleration) {
    const myRect = c.getObject('myRect'); 
    const isKeyPressed = myController.active_keys.includes(keyName); 

    if(isKeyPressed) {
        myRect.acceleration.substract(acceleration) 
    }                 
    
    const keyIndex = myController.active_keys.indexOf(keyName);

    if(keyIndex != -1) myController.active_keys.splice(keyIndex, 1);
}

myController.assign({
    'ArrowUp': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowUp', new Vector2D(0, -0.01)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowUp', new Vector2D(0, -0.01)]
        }
    ],
    'ArrowDown': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowDown', new Vector2D(0, 0.01)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowDown', new Vector2D(0, 0.01)]
        }
    ],
    'ArrowLeft': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowLeft', new Vector2D(-0.01, 0)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowLeft', new Vector2D(-0.01, 0)]
        }
    ],
    'ArrowRight': [
        {
            event: 'keydown',
            callback: onKeyDown,
            arguments: ['ArrowRight', new Vector2D(0.01, 0)]
        },
        {
            event: 'keyup',
            callback: onKeyUp,
            arguments: ['ArrowRight', new Vector2D(0.01, 0)]
        }
    ]
});

myController.execute();

c.render(function() {
    const myRect = c.getObject('myRect');
    console.log(myRect.velocity)
    myRect.draw();
    myRect.move(true);
}) 