/**
 * Created by bluedragonfly on 4/3/16.
 */

export class Router{

    constructor(){
        this.actions = {}
    }

    route(prev, action){
        if(this.actions[action.type] && !action.done){
            action.done = true;
            this.actions[action.type](prev, action);
        }
        return prev;
    }

    addAction(key, func){
        this.actions[key] = func;
    }
};