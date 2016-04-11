/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs'
import {Store} from './../store'
import * as _ from 'lodash/fp'
@Injectable()
export class HeroService {
    static storeStatic;

    constructor(store:Store) {
        this.store = store;
        this.hero = this.store.state.map(state => state.hero);
        HeroService.storeStatic = store;

        this.store.addRoute("ATTACK", this.attack);
        this.store.addRoute("UPDATE_SPELL", this.updateSpell);
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
            return HeroService.levelupHero(prev);
        }
        else {
            return _.merge(prev, {
                monster: {
                    health: prev.monster.health - prev.hero.attack
                }
            })
        }

    };

    updateSpell(prev, action) {
        return _.merge(prev, action.state);
    }

    activeSpell(prev, action) {
        if (action.spell.endOfCooldown > Date.now()) {
            let diff = (action.spell.endOfCooldown - Date.now()) / 1000;
            console.log("COOLDOWN FOR " + action.spell.name + " : " + diff + "s");
            return prev;
        }

        let date = new Date();
        let index = -1;
        date = date.setSeconds(date.getSeconds() + action.spell.cooldown/100);
        prev.hero.inventory.spells.forEach(function (spell, i) {
            if (spell.name == action.spell.name) {
                let clone = {hero: {inventory: {spells: [] }}};
                clone.hero.inventory.spells[i] = _.merge(prev.hero.inventory.spells[i], {
                    endOfCooldown: date,
                    isCooldown: true
                });
                prev = _.merge(prev, clone);
                index = i;
            }
        });

        let interval = setInterval(() => {
            if (date < Date.now()) {
                console.log("END OF COOLDOWN FOR " + action.spell.name);
                clearInterval(interval);
                let clone = {hero: {inventory: {spells: [] }}};
                clone.hero.inventory.spells[index] = _.merge(prev.hero.inventory.spells[index], {
                    isCooldown: false
                });
                HeroService.storeStatic.dispatch({type: "UPDATE_SPELL", state: clone});
            }
        }, 1000);

        switch (action.spell.name) {
            case 'Fireball':
                prev = _.merge(prev, {
                    monster: {
                        health: prev.monster.health - Math.round(1000 * Math.pow(1.2, prev.hero.level))
                    }
                });
                break;
            case 'Punch of King':
                prev = _.merge(prev, {
                    monster: {
                        health: prev.monster.health - Math.round(prev.hero.attack * Math.pow(1.2, prev.hero.level))
                    }
                });
                break;
            case 'Zeus roar':
                prev = _.merge(prev, {
                    monster: {
                        health: Math.round(prev.monster.health / prev.hero.level)
                    }
                });
                break;
            default:
                console.log('Spell no exist !');
                break;
        }

        if (prev.monster.health <= 0)
            return HeroService.levelupHero(prev);

        return prev
    };

    disableSpell(prev, action) {
        // console.log("FIIIN");
        // let attack = prev.hero.attack / 2;
        //
        // return _.merge(prev, {
        //     hero: {
        //         attack: attack
        //     }
        // });
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

    static levelupHero(prev) {
        let level = _.add(prev.hero.level, 1);
        let health = Math.round(2 + Math.pow(1.4, prev.hero.level));
        let money = _.add(prev.hero.money, Math.round(Math.pow(1.2, prev.hero.level)));
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
    };
}