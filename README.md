# canvas-testing

canvas-testing is a library that aims to simplify the usage of Canvas API, and 
implements a basic, handmade 2D engine, to help create 
animations or games in the web.

Originally, canvas-testing was an idea that I came up with so I could put 
into practice my knowledge in JS, also, this project would allow me to take a dip 
in with the Canvas API, which I hadn't used before, and to play a little bit with
Maths as well, which I hadn't done in a while.

# Installation 

Coming soon...

# Introduction: creating your first shape

Once you've installed the library, you must import **Canvas** into your script, which
is the main class and contains basic methods such as *render*, *getObject* and *rect*. 
All of those mentioned before will be explained in depth later. 

Assuming that you have got the library's folder placed in root...

`import { Canvas } from './canvas-api/canvas.js';` 

After this step, you must initialize a new instance of this class in order to access
its methods:

`const myCanvas = new Canvas(document.getElementById('canvas'));`

As you can see, this class' constructor takes in a JS selector 
which must reference a valid and existing canvas html object. Otherwise,
our methods won't work properly. 

As usual when working with canvas, you must ensure you got your canvas' settings 
right, so this library provides with a *setup* function that helps with basic
configuration, and it accepts two arguments: width and height (for the canvas sizing).
It has default values in case that no arguments are given (See footnotes).

`myCanvas.setup(width, height);`[^1]

[^1]: If no arguments are given, parameters default to document.documentElement.clientWidth - 20 and document.documentElement.clientHeight - 20 

When you get all of the above up and ready, you can start by creating your first shape! 
To do so, utilize *myCanvas.rect()* and provide it with the following arguments: 
1. tag (an unique identifier, string), 
2. position (plain literal object with numeric x and y properties or a Vector2D instance, explained in depth later),
3. width (shape's width, number), 
4. height (shape's height, number), 
5. color (shape's color, can be rgba, hex, a string)

E.g `myCanvas.rect('myRect', {x: 10, y: 10}, 30, 30, 'blue');`

You will notice that this line of code won't draw your shape, but don't panic, 
you are a step away from getting your shape drawn. At last, you must utilize the following method, *myCanvas.render()* 
which takes a callback as argument that will be repeatedly invoked to generate all your animation/game frames.

```
myCanvas.render(function() { 

     // your logic here ...
 
});
```

Following with this example, you must consider that the previously mentioned *rect()* method creates a 
shape instance that you can access by calling myCanvas' method *getObject*, and passing your shape tag as an argument, such as:

`const myRect = c.getObject('myRect');`}

This will give you access to plenty of methods attached to your shape, that will only update that shape in particular, 
e. g., *draw()*, a method that draws your shape on every frame if invoked inside *myCanvas.render()*'s callback.

```
myCanvas.render(function() {
    const myRect = myCanvas.getObject('myRect');
    myRect.draw();
}) 
```

Now it works! congratulations, you've created and actually drawn your first shape 
with this library. 

# Docs


