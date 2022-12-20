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

    // keys value must be 'ArrowUp', 'ArrowDown', 'ArrowLeft' or 'ArrowRight'
    
    assign(actions_dictionary) { // must be provided with a dictionary with actions
        return this.actions = actions_dictionary;
    }

    // TODO: What happens is that once keyup is fired, keydown events stop repeating themselves, which causes the callback for keydowns to never fire again once a keyup event for any key is up: Basically, I should use this component to save the keymaps (which keys are pressed) and on the main game loop check the keymap and execute callbacks based on that for each frame. 
    execute() {
        this.canvas.addEventListener('keydown', e => { 
            console.log('keydown ' + e.key)
            this.active_keys[e.key] = true;

            for(let key in this.active_keys) {
                if(this.active_keys[key]) {
                    const action = this.actions[key].find(action => action.event === 'keydown');
    
                    action.callback(...action.arguments);
                }
            }
        })

        this.canvas.addEventListener('keyup', e => {
            const key = this.actions[e.key];
            if(!key) return;

            console.log(`keyup + ${e.key}`)

            this.active_keys[e.key] = false;

            const action = key.find(action => action.event === 'keyup');
            const args = action.arguments;
            action.callback(...args);
        })
    }

}