/**
 * Created by bluedragonfly on 4/1/16.
 */
import {Injectable} from 'angular2/core';
import {StorageService} from './storage-service';
import {Router} from './router'
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import * as _ from 'lodash/fp'

@Injectable()
export class Store {
    constructor(storage:StorageService) {
        this.storage = storage;
        this.router = new Router();

        this.initState = {
            hero: {
                level: 1,
                attack: 1,
                money: 10000,
                name: "Noki",
                inventory: {
                    spells: [],
                    equipement: []
                }
            },
            monster: {
                level: 1,
                health: 2,
                healthMax: 2,
                name: "monster"
            },
            shop: {
                items: [
                    {
                        name: "Doigt",//Un clic supplémentaire par doigt,
                        price: 1,
                        type: "equipement"
                    },
                    {
                        name: "Bras Mécanique",//Structure de base
                        price: 10,
                        type: "equipement"
                    },
                    {
                        name: "",
                        price: 100,
                        type: "equipement"
                    }
                ],
                spells: [
                    {
                        name: 'X2',
                        description: "attaque X2 pendant 30sec",
                        price: 1000,
                        cooldown: 600, //secondes
                        timeEffect: 30
                    },

                    {
                        name: 'Fireball',
                        description: "inflige 1000 X lvl à l'ennemi",
                        price: 10000,
                        cooldown: 1800 //secondes
                    },

                    {
                        name: 'Warrior soul',
                        description: "dps des armes X 3 pendant 1min",
                        price: 100000,
                        cooldown: 3600, //seconde
                        timeEffect: 60
                    },

                    {
                        name: "Punch of King",
                        description: " inflige attaque X lvl",
                        price: 1000000,
                        cooldown: 1200 // secondes
                    },

                    {
                        name: "Zeus roar",
                        description: "divise la vie de l'ennemi par le lvl actuel",
                        price: 10000000,
                        cooldown: 86400 //secondes
                    }
                ]
            },
            action: {}
        };

        this.actionStream = new Subject();

        this.addRoute('STARTUP', this.startup);

        this.state = this.actionStream
            .scan((prevState, action) => {
                console.log("Action : ", action);
                console.log("PREV : ", prevState);
                var next = this.router.route(prevState, action);
                console.log("CURRENT : ", next);
                return next;
            }, this.initState)
            .publishReplay(1).refCount()

        this.storage.initOrGet("state", JSON.stringify(this.initState)).map(state => JSON.parse(state)).subscribe(state => {
            this.actionStream.next({type: 'STARTUP', state: state});
        });

        this.state.map(state=>JSON.stringify(state)).subscribe(state => {
            storage.set("state", state);
        });
    }

    startup(prev, action) {
        console.log ('state', action.state);
        return action.state;
    }

    dispatch(action) {
        this.actionStream.next(action)
    }

    addRoute(key, func) {
        this.router.addAction(key, func)
    }
}

