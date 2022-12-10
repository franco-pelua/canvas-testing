export default class Controller2D {
    constructor(canvasElement) {
        this.canvas = canvasElement; 
        this.actions = {};
        this.active_keys = [];
    }

    // keys value must be 'ArrowUp', 'ArrowDown', 'ArrowLeft' or 'ArrowRight'
    
    assign(actions_dictionary) { // must be provided with a dictionary with actions
        return this.actions = actions_dictionary;
    }

    execute() {
        this.canvas.addEventListener('keydown', e => {
            const key = this.actions[e.key];
            const action = key.find(action => action.event === 'keydown');
            const args = action.arguments;
            action.callback(...args);
        })

        this.canvas.addEventListener('keyup', e => {
            const key = this.actions[e.key];
            const action = key.find(action => action.event === 'keyup');
            const args = action.arguments;
            action.callback(...args);
        })
    }

}