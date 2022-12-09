import Canvas from './canvas-api/canvas.js';
import Vector2D from './canvas-api/vector2d.js';
import Controller2D from './canvas-api/controller2d.js';

const c = new Canvas(document.getElementById('canvas'));
const myController = new Controller2D(c.canvas);

c.canvas.width = document.documentElement.clientWidth - 20;
c.canvas.height = document.documentElement.clientHeight - 20;

c.setup(function() {
    c.rect('myRect', new Vector2D(10, 10), 30, 30, 'blue');
    c.rect('2Rect', new Vector2D(50, 50), 10, 10, 'red');

    const myRect = c.getObject('myRect'); 

    myController.assign({
        'ArrowUp': [
            {
                event: 'keydown',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(0, -100) });                    
                }
            },
            {
                event: 'keyup',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(0, 0) });                    
                }
            }
        ],
        'ArrowDown': [
            {
                event: 'keydown',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(0, 100) });                    
                }
            },
            {
                event: 'keyup',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(0, 0) });                    
                }
            }
        ],
        'ArrowLeft': [
            {
                event: 'keydown',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(-100, 0) });                    
                }
            },
            {
                event: 'keyup',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(0, 0) });                    
                }
            }
        ],
        'ArrowRight': [
            {
                event: 'keydown',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(100, 0) });                    
                }
            },
            {
                event: 'keyup',
                callback: function() {
                    myRect.update({ velocity: new Vector2D(0, 0) });                    
                }
            }
        ]
    });
    
    myController.execute();

    c.canvas.focus();
});

c.render(function() {
    const myRect = c.getObject('myRect');

    myRect.updatePosition(true);

    myRect.draw();
}) 