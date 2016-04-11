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
            hero: {
                level: 1,
                clickDamage: 1,
                dps : 0,
                money: 1000000000,
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
                        name: "Bras Mécanique",//Structure de base
                        price: 10
                    },
                    {
                        name: "",
                        price: 100
                    }
                ],
                spells: [
                    {
                        name: 'X2',
                        description: "attaque X2 pendant 30sec",
                        price: 1000,
                        cooldown: 600, //secondes
                        timeEffect: 30,
                        status: "Acheter"
                    },

                    {
                        name: 'Fireball',
                        description: "inflige 1000 X lvl à l'ennemi",
                        price: 10000,
                        cooldown: 1800 ,
                        status: "Acheter"
                    },

                    {
                        name: 'Warrior soul',
                        description: "dps des armes X 3 pendant 1min",
                        price: 100000,
                        cooldown: 3600, //seconde
                        timeEffect: 60,
                        status: "Acheter"
                    },

                    {
                        name: "Punch of King",
                        description: " inflige attaque X lvl",
                        price: 1000000,
                        cooldown: 1200,
                        status: "Acheter"
                    },

                    {
                        name: "Zeus roar",
                        description: "divise la vie de l'ennemi par le lvl actuel",
                        price: 10000000,
                        cooldown: 86400,
                        status: "Acheter"
                    }
                ]
            },
            action: {}
        };

        this.actionStream = new Subject();

        this.addRoute('STARTUP', this.startup);
        this.state = this.actionStream
            .scan((prevState, action) => {
                var next = this.router.route(prevState, action);
                return next;
            }, this.initState)
            .publishReplay(1).refCount();

        this.storage.initOrGet("state", JSON.stringify(this.initState)).map(state => JSON.parse(state)).subscribe(state => {
            this.actionStream.next({type: 'STARTUP', state: state});
            setInterval(()=>{this.actionStream.next({type : 'DPS'})}, 1000)
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

