/**
 * Created by bluedragonfly on 4/3/16.
 */
import deepFreeze from 'deep-freeze'

export class Router{

    constructor(){
        this.actions = {}
    }

    route(prev, action){
        deepFreeze(prev); // Make sure the reducer does not change the previous state
        if(this.actions[action.type]){
            const nextState = this.actions[action.type](prev, action);
            deepFreeze(nextState); // Make sure no component will attempt to change the next current state
            return nextState;
        }
        else{
            return prev;
        }
    }

    addAction(key, func){
        this.actions[key] = func;
    }
};