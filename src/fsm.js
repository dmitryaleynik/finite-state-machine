class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if  (config == undefined){
            throw new Error();

        }

        this.undoStory = [];
        this.currentState = config["initial"];
        this.machine = config;
        this.transStory= [];


    }


    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }


    setCurrentState(state){
        this.currentState = state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {


        if (! ( state in this.machine.states)) {
            throw  new Error ();
        }
        else {
            this.undoStory.length = 0;
            this.transStory.push(this.getState());
            this.currentState = state;

        }


    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {


           if ( !(event in this.machine.states[this.getState()].transitions)){
               throw  new Error ();
           }
           else {
               this.undoStory.length = 0;
               this.transStory.push(this.getState());
               this.currentState = this.machine.states[this.getState()].transitions[event];

           }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.setCurrentState("normal");
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == undefined){
            return Object.keys(this.machine.states);
        }
        else {
            var result =[]
            for  ( var i in this.machine.states){
                for ( var j in this.machine.states[i].transitions){
                    if (event == j){
                        result.push(i);
                    }

                }
            }
            return result;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.transStory.length == 0){
            return false;
        }
        else  {
            this.undoStory.push(this.getState());
            this.setCurrentState(this.transStory.pop())
            return true ;
        }


    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoStory.length == 0){
            return false;
        }
        else {
            this.setCurrentState(this.undoStory.pop());
            return true;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.transStory.length = 0;
        this.undoStory.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
