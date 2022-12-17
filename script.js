import { Canvas } from './canvas-api/canvas.js';
import { Vector2D }  from './canvas-api/vector2d.js'
import Controller2D from './canvas-api/controller2d.js';

const c = new Canvas(document.getElementById('canvas'));
const myController = new Controller2D(c.canvas);

c.setup();

c.rect('myRect', {x: 400, y: 400}, 30, 30, 'blue');

c.circle('myCircle', {x: 300, y: 300}, 20, 'red');
console.log(c.getObject('myCircle'))

c.getObject('myRect').setMaxVelocity(5);   

function onKeyDown(keyName, acceleration) {
    const myCircle = c.getObject('myCircle');
    const isKeyPressed = myController.active_keys.includes(keyName); 

    if(isKeyPressed) return null;

    myController.active_keys.push(keyName);

    myCircle.acceleration.add(acceleration);
}

function onKeyUp(keyName, acceleration) {
    const myCircle = c.getObject('myCircle'); 
    const isKeyPressed = myController.active_keys.includes(keyName); 

    if(isKeyPressed) {
        myCircle.acceleration.substract(acceleration) 
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
    const myCircle = c.getObject('myCircle');  
    myCircle.draw();  
    console.log(myCircle.velocity)
    myCircle.move(true);
    myRect.draw();
    myRect.move(true);
}) 