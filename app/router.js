/**
 * Created by bluedragonfly on 4/3/16.
 */

export class Router{

    constructor(){
        this.actions = {}
    }

    route(prev, action){
        if(this.actions[action.type]){
            this.actions[action.type](prev, action);
        }
    }

    addAction(key, func){
        this.actions[key] = func;
    }
};