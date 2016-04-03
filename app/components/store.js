/**
 * Created by bluedragonfly on 4/1/16.
 */
import {Injectable} from 'angular2/core';
import {StorageService} from './storage-service';
import {Observable, Subject} from 'rxjs';
import * as R from 'ramda';

const STARTUP = 'STARTUP';
const LEVEL_UP = 'LEVEL_UP';

const reducers = {
    [STARTUP] : (prev, action) => prev,//On Startup load and set initial state with saved values
    [LEVEL_UP] : (prev, action) => { prev.hero.level = prev.hero.level +1; return prev} /// Need to return a State
};


@Injectable()
export class Store {

    constructor(storage:StorageService) {

        const initState = {
            hero:{
                level:1,
                name :""
            }
        };

        this.actions = [
            STARTUP,
            LEVEL_UP
        ];

        this.actionStream = new Subject();

        this.state = this.actionStream
            .startWith({type: STARTUP})
            .scan( (prevState, action) => {
                console.log(prevState, action);
                console.log(prevState.hero);
                const reducer = reducers[action.type];
                if (reducer)
                    return reducer(prevState, action);
                else
                    return prevState;
        }, initState);
    }

    dispatch(action) {
        this.actionStream.next(action)
    }
}

