/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs'
import {Store} from './../store'
import * as _ from 'lodash/fp'
@Injectable()
export class HeroService {
    constructor(store:Store) {
        this.store = store;
        this.hero = this.store.state.map(state => state.hero);

        this.store.addRoute("ATTACK", this.attack);
        this.store.addRoute("ACTIVE_SPELL", this.activeSpell);
        this.store.addRoute("DISABLE_SPELL", this.disableSpell);
        this.store.addRoute("SELECTED_SPELL", this.SelectedSpell);
    };

    dispatch(action) {
        console.log("NEW ACTION IN HERO SERVICE");
        this.store.dispatch(action);
    };

    attack(prev, action) {
        if (prev.monster.health - prev.hero.attack <= 0) {
            let level = _.add(prev.hero.level, 1);
            let health = Math.round(2 + Math.pow(1.4, prev.hero.level));
            let money = _.add(prev.hero.money, Math.round(Math.pow(1.2, prev.hero.level)));
            console.log(money);
            return _.merge(prev, {
                hero: {
                    level: level,
                    money: money
                },
                monster: {
                    level: level,
                    health: health,
                    healthMax: health
                }
            });
        }
        else {
            return _.merge(prev, {
                monster: {
                    health: prev.monster.health - prev.hero.attack
                }
            })
        }

    };

    activeSpell(prev, action) {
        let attack = prev.hero.attack * 2;

        return _.merge(prev, {
            hero: {
                attack: attack
            }
        });
    };

    disableSpell(prev, action) {
        console.log("FIIIN");
        let attack = prev.hero.attack / 2;

        return _.merge(prev, {
            hero: {
                attack: attack
            }
        });
    };

    findAndRemove(array, property, value) {
        array.forEach(function (result, index) {
            if (result[property] === value) {
                //Remove from array
                return array.splice(index, 1);
            }
        });
    }

    SelectedSpell(prev, action) {

        var newState = _.merge(prev, {});
        console.log(newState);
        var spellsOfHero = newState.hero.inventory.spells;
        var spellsInState = newState.shop.spells;
        console.log(spellsInState);

        spellsOfHero.forEach(function (spell) {
            if (spell.name == action.spell.name) {
                return false
            }
        });
        var result = _.concat(spellsOfHero, action.spell);

        spellsInState.forEach(function (spell, i) {

            if (spell.name == action.spell.name) {
                console.log(spell.name + " " + action.spell.name);
                spellsInState.splice(i, 1);
            }
        });

        return _.merge(newState, {
            hero: {
                inventory: {
                    spells: result
                }
            },
            shop: {
                spells: spellsInState
            }
        })



    }

}

