/**
 * Created by bluedragonfly on 4/3/16.
 */

export class Router{

    constructor(){
        this.actions = {}
    }

    route(prev, action){
        if(this.actions[action.type] && !prev.action.done){
            prev.action = action;
            this.actions[action.type](prev, action);
            prev.action.done = true;
        }
        return prev;
    }

    addAction(key, func){
        this.actions[key] = func;
    }
};