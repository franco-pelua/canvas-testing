import { Canvas, Vector2D } from './canvas-api/canvas.js';
import Controller2D from './canvas-api/controller2d.js';

const c = new Canvas(document.getElementById('canvas'));
const myController = new Controller2D(c.canvas);

c.canvas.width = document.documentElement.clientWidth - 20;
c.canvas.height = document.documentElement.clientHeight - 20;

c.setup(function() {
    c.rect('myRect', new Vector2D(400, 400), 30, 30, 'blue');

    function onKeyDown(keyName, speedVector) {
        const myRect = c.getObject('myRect');
        const isKeyPressed = myController.active_keys.includes(keyName); 

        if(isKeyPressed) return null;

        myController.active_keys.push(keyName);

        myRect.update({ 
            velocity: myRect.velocity.add(speedVector)
        });  
    }

    function onKeyUp(keyName, speedVector) {
        const myRect = c.getObject('myRect'); 
        const isKeyPressed = myController.active_keys.includes(keyName); 

        if(isKeyPressed) {
            myRect.update({ 
                velocity: myRect.velocity.substract(speedVector)
            });   
        }                 
        
        const keyIndex = myController.active_keys.indexOf(keyName);

        if(keyIndex != -1) myController.active_keys.splice(keyIndex, 1);
    }

    myController.assign({
        'ArrowUp': [
            {
                event: 'keydown',
                callback: onKeyDown,
                arguments: ['ArrowUp', new Vector2D(0, -100)]
            },
            {
                event: 'keyup',
                callback: onKeyUp,
                arguments: ['ArrowUp', new Vector2D(0, -100)]
            }
        ],
        'ArrowDown': [
            {
                event: 'keydown',
                callback: onKeyDown,
                arguments: ['ArrowDown', new Vector2D(0, 100)]
            },
            {
                event: 'keyup',
                callback: onKeyUp,
                arguments: ['ArrowDown', new Vector2D(0, 100)]
            }
        ],
        'ArrowLeft': [
            {
                event: 'keydown',
                callback: onKeyDown,
                arguments: ['ArrowLeft', new Vector2D(-100, 0)]
            },
            {
                event: 'keyup',
                callback: onKeyUp,
                arguments: ['ArrowLeft', new Vector2D(-100, 0)]
            }
        ],
        'ArrowRight': [
            {
                event: 'keydown',
                callback: onKeyDown,
                arguments: ['ArrowRight', new Vector2D(100, 0)]
            },
            {
                event: 'keyup',
                callback: onKeyUp,
                arguments: ['ArrowRight', new Vector2D(100, 0)]
            }
        ]
    });
    
    myController.execute();

    c.canvas.focus();
});

c.render(function() {
    const myRect = c.getObject('myRect');
    console.log(myRect.velocity)
    myRect.draw();
    myRect.updatePosition(true);
}) 