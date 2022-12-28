export default class Controller2D {
    constructor(canvasElement) {
        this.canvas = canvasElement; 
        this.actions = {};
        this.active_keys = {
            'ArrowLeft': false, // 37
            'ArrowUp': false, // 38
            'ArrowRight': false, // 39
            'ArrowDown': false // 40
        };
    }
    
    assign(actions_dictionary) { // must be executed outisde main game loop
        return this.actions = actions_dictionary;
    }

    execute() { // must be executed outisde main game loop
        this.canvas.addEventListener('keydown', e => {
            if(this.active_keys[e.key] === 'undefined') return;
            this.active_keys[e.key] = true;
        })

        this.canvas.addEventListener('keyup', e => {
            if(this.active_keys[e.key] === 'undefined') return;
            this.active_keys[e.key] = false;
        })
    }

    move() { // must be executed inside main game loop
        for(let key in this.active_keys) {
            if(this.active_keys[key]) {
                const action = this.actions[key]?.find(action => action.event === 'keydown');

                action?.callback(...action.arguments);
            }
        }
    }

}