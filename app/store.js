/**
 * Created by bluedragonfly on 4/1/16.
 */
import {Injectable} from 'angular2/core';
import {StorageService} from './storage-service';
import {Router} from './router'
import {Observable, Subject, BehaviorSubject} from 'rxjs';

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
                healthMax :2,
                name : "monster"
            },
            shop:{
              items : [
                  {
                      name: "Doigt",//Un clic supplémentaire par doigt,
                      price: 1,
                      type :"equipement"
                  },
                  {
                      name: "Bras Mécanique",//Structure de base
                      price: 10,
                      type :"equipement"
                  },
                  {
                      name: "",//
                      price: 100,
                      type :"equipement"
                  }
              ]
            },
            action : {}
        };

        this.actionStream = new Subject();
        this.state = this.actionStream
            .startWith({type: 'STARTUP'})
            .scan((prevState, action) => {
                return this.router.route(prevState, action);
            }, this.initState);
        this.state.map(state=>JSON.stringify(state)).subscribe(state => {
            storage.set("state", state);
            console.log("Current State : ", state)
        });
    }

    startup(prev, action){
        action.storage.initOrGet("state", JSON.stringify(action.initState)).subscribe(state => action.initState = JSON.parse(state));
        prev = action.initState;
    }

    dispatch(action) {
        this.actionStream.next(action)
    }

    addRoute(key, func) {
        this.router.addAction(key, func)
    }
}

