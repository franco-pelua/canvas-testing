export default class Controller2D {
    constructor(canvasElement) {
        this.canvas = canvasElement; 
        this.actions = {}
    }

    // keys value must be 'ArrowUp', 'ArrowDown', 'ArrowLeft' or 'ArrowRight'
    
    assign(actions_dictionary) { // must be provided with a dictionary with actions
        return this.actions = actions_dictionary;
    }

    execute() {
        for(let [key, value] of Object.entries(this.actions)) {
            value.forEach(value => {
                this.canvas.addEventListener(value.event, e => {
                    if(!this.actions[e.key]) return;
                    return this.actions[e.key].find((action => action.event === value.event)).callback();
                })
            })
        }
    }

}