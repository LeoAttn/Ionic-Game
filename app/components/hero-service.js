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
        this.store.addRoute("DPS", this.dps);
        this.store.addRoute("UPDATE_SPELL", this.updateSpell);
        this.store.addRoute("ACTIVE_SPELL", this.activeSpell);
        this.store.addRoute("DISABLE_SPELL", this.disableSpell);
        this.store.addRoute("SELECTED_SPELL", this.SelectedSpell);
    };

    dispatch(action) {
        console.log("NEW ACTION IN HERO SERVICE");
        this.store.dispatch(action);
    };

    dps(prev, action){
        if(prev.monster.health - prev.hero.dps <=0){
            return HeroService.levelupHero(prev);
        }
        else{
            return _.merge(prev, {
                monster: {
                    health: prev.monster.health - prev.hero.dps
                }
            })
        }
    }

    attack(prev, action) {
        if (prev.monster.health - prev.hero.clickDamage <= 0) {
            return HeroService.levelupHero(prev);
        }
        else {
            return _.merge(prev, {
                monster: {
                    health: prev.monster.health - prev.hero.clickDamage
                }
            })
        }

    };

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
            case 'X2':
                prev = _.merge(prev, {
                    hero: {
                        clickMultiplicator: prev.hero.clickMultiplicator * 2
                    }
                });
                setTimeout(() => {
                    console.log("END OF EFFECT FOR " + action.spell.name);
                    HeroService.storeStatic.dispatch({type: "DISABLE_SPELL", spell: action.spell});
                }, prev.hero.inventory.spells[index].timeEffect * 1000);
                break;
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
                        health: prev.monster.health - Math.round(prev.hero.clickDamage * Math.pow(1.2, prev.hero.level))
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
        };

        if (prev.monster.health <= 0)
            return HeroService.levelupHero(prev);

        return prev
    };

    updateSpell(prev, action) {
        return _.merge(prev, action.state);
    }

    disableSpell(prev, action) {
        var clone = {};
        if (action.spell.name == 'X2') {
            clone = {
                hero: {
                    clickMultiplicator: prev.hero.clickMultiplicator / 2
                }
            };
        }
        return _.merge(prev, clone);
    };

    findAndRemove(array, property, value) {
        array.forEach(function (result, index) {
            if (result[property] === value) {
                //Remove from array
                return array.splice(index, 1);
            }
        });
    }

    SelectedSpell(prev, actions) {
        var action = actions.spellComponent;
        var status = actions.spellComponent.status;
        var newState = _.merge(prev, {});
        var spellsOfHero = newState.hero.inventory.spells;
        var spellsInShop = newState.shop.spells;

        if(status == "Equiper"){
            spellsOfHero.forEach(function (spell) {
                if (spell.name == action.spell.name) {
                    return false
                }
            });
            var spellCopy = _.merge(action.spell,{});
            spellsInShop.forEach(function (spell,i) {
                if (spell.name == action.spell.name) {
                    spellsInShop[i].status = "Retirer";
                    spellCopy.status = "Retirer";
                }
            });
            return _.merge(newState, {
                hero: {
                    inventory: {
                        spells: _.concat(spellsOfHero, spellCopy)
                    }
                },
                shop:{
                    spells: spellsInShop
                }

            })
        }
        if(status == "Retirer"){
            spellsOfHero.forEach(function (spell, i) {
                if (spell.name == action.spell.name) {
                    spellsOfHero.splice(i, 1);
                    spellsInShop.forEach(function(spell, i){
                        if (spell.name == action.spell.name){
                            spellsInShop[i].status = "Equiper";

                        }
                    });

                }
            });
            return _.merge(newState, {
                hero: {
                    inventory: {
                        spells: spellsOfHero
                    }
                },
                shop:{
                    spells: spellsInShop
                }
            })

        }
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