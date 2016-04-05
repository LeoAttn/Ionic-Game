/**
 * Created by bluedragonfly on 4/1/16.
 */
import {Injectable} from 'angular2/core';
import {StorageService} from './storage-service';
import {Router} from './router'
import {Observable, Subject} from 'rxjs';

@Injectable()
export class Store {

    constructor(storage:StorageService) {

        this.storage = storage;
        this.router = new Router();
        this.initState = {
            hero:{
                level:1,
                attack : 1,
                money: 10000,
                name :"Noki",
                inventory: {
                    spells : [],
                    equipement: []
                }
            },
            monster:{
                level : 1,
                health : 2,
                name : "monster"
            }
        };

        this.actionStream = new Subject();
        this.state = this.actionStream
            .startWith({type: 'STARTUP'})
            .scan( (prevState, action) => {//@FIXME CALLED MULTIPLE TIMES FOR NO REASON
                return this.router.route(prevState, action);
        }, this.initState);
        this.state.map(state=>JSON.stringify(state)).subscribe(state => {storage.set("state", state);console.log("STATE : ", state)});
    }

    dispatch(action) {
        console.log("IN DISPATCH ACTION ", action);
        this.actionStream.next(action)
    }

    addRoute(key, func){
        this.router.addAction(key,func)
    }
}

