/**
 * Created by bluedragonfly on 4/1/16.
 */
import {Injectable} from 'angular2/core';
import {StorageService} from './storage-service';
import {Router} from './router'
import {Observable, Subject} from 'rxjs';
import * as R from 'ramda';

@Injectable()
export class Store {

    constructor(storage:StorageService) {

        this.storage = storage;
        this.router = new Router();
        this.initState = {
            hero:{
                level:1,
                money: 10000,
                name :"Noki",
                inventory: {
                    spells : [],
                    equipement: []
                }
            }
        };

        this.actionStream = new Subject();
        this.state = this.actionStream
            .startWith({type: 'STARTUP'})
            .scan( (prevState, action) => {
                this.router.route(prevState, action);
                return prevState;
        }, this.initState);
    }

    dispatch(action) {
        this.actionStream.next(action)
    }

    addRoute(key, func){
        this.router.addAction(key,func)
    }
}

