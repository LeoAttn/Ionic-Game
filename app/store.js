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

        this.router = new Router();
        const initState = {
            hero:{
                level:1,
                money: 10000,
                name :"",
                inventory: {
                    spells : [],
                    equipement: [],
                    add:function(item){
                        if(item.type = "spells")
                            this.spells.push(this.item);
                        else if(item.type = "equipement")
                            this.equipement.push(this.item);
                    }
                }
            }
        };
        this.actionStream = new Subject();
        this.state = this.actionStream
            .startWith({type: 'STARTUP'})
            .scan( (prevState, action) => {
                this.router.route(prevState, action);
                return prevState;
        }, initState);
    }

    dispatch(action) {
        this.actionStream.next(action)
    }

    addRoute(key, func){
        this.router.addAction(key,func)
    }
}

