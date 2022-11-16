import Canvas from './canvas-api/canvas.js';

const c = new Canvas(document.getElementById('canvas'));

c.setup(function() {
    c.rect('myRect', 10, 10, 10, 10, 'blue');
    c.rect('2Rect', 50, 50, 10, 10, 'red');
});

c.render(500, function() {
    const myRect = c.getObject('myRect');
    const SecRect = c.getObject('2Rect');
    myRect.draw();
    SecRect.draw();
    myRect.update({x: myRect.x + 1, height: myRect.height + 1});
});
