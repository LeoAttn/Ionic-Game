/**
 * Created by bluedragonfly on 4/3/16.
 */

export class Router{

    constructor(){
        this.actions = {}
    }

    route(prev, action){
        if(this.actions[action.type] && ! action.done){
            this.actions[action.type](prev, action);
            action.done= true;
            prev.action = action;
        }
        return prev;
    }

    addAction(key, func){
        this.actions[key] = func;
    }
};