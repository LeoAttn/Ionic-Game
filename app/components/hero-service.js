/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs'
import {Store} from './../store'
import * as R from 'ramda'

@Injectable()
export class HeroService {
    constructor(store:Store) {
        this.store = store;
        this.hero = this.store.state.map(state => state.hero);
        this.store.addRoute("ATTACK", this.attack)
    }

    dispatch(action){
        console.log("NEW ACTION IN HERO SERVICE")
        this.store.dispatch(action);
    }

    attack(prev,action) {
        if(prev.monster.health - prev.hero.attack <= 0){
            var level = R.add(prev.hero.level, 1);
            return R.merge(prev, {
                hero : {
                    level : level
                },
                monster: {
                    level : level,
                    health : level*2
                }
            });
        }
        else {
            return R.merge(prev, {
                monster : {
                    health : prev.monster.health - prev.hero.attack
                }
            })
        }

    }
}

