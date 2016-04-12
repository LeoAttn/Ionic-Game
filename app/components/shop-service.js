/**
 * Created by bluedragonfly on 4/6/16.
 */
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs'
import {Store} from './../store'
import * as _ from 'lodash/fp'
import * as R from 'ramda'


@Injectable()
export class ShopService {
    constructor(store:Store) {
        this.store = store;
        this.shop = this.store.state.map(state => state.shop);
        this.armsFree = this.store.state.map(state => state.hero.inventory.arms).filter(item => item.free).count();

        this.arms = this.store.state.map(state => state.shop.arms);
        this.equipements = this.store.state.map(state => state.shop.equipement);

        this.store.addRoute("BUY_ARM", this.buyArm);
        this.store.addRoute("BUY_ITEM", this.buyItem);
        this.store.addRoute("BUY_SPELL", this.buySpell);
    }

    dispatch(action) {
        this.store.dispatch(action);
    }

    buyArm(prev, action) {
        if (prev.hero.money >= action.item.price) {
            return _.merge(prev, {
                hero: {
                    money: prev.hero.money - action.item.price,
                    clickDamage: prev.hero.clickDamage + action.item.clickUp,
                    dps: prev.hero.clickDamage + action.item.dpsUp,
                    inventory: {
                        arms: _.concat(prev.hero.inventory.arms, {name: action.item.name, free: true})
                    }
                }
            })
        }
    }

    buyItem(prev, action) {
        console.log("buyItem(", prev,")");
        if (prev.hero.money >= action.item.price) {
            var i = 0;
            var arms = [];
            console.log("ARMS : ",prev.hero.inventory.arms);
            prev.hero.inventory.arms.forEach(function(arm){
                if(action.item.armRequired) {
                    console.log("NB ARM",action.item.armRequired);
                    if(i != action.item.armRequired&& arm.free ==true) {
                        arms  =  _.concat(arms, _.merge(arm, {free : false}));
                        i++;
                    }else{
                        arms  =  _.concat(arms, arm);
                    }
                }
            });

            if(i >= action.item.armRequired)
            {
                return _.merge(prev, {
                    hero: {
                        money: prev.hero.money - action.item.price,
                        clickDamage: prev.hero.clickDamage + action.item.clickUp,
                        dps: prev.hero.dps + action.item.dpsUp,
                        inventory: {
                            arms : _.merge(prev.hero.inventory.arms, arms),
                            equipement: _.concat(prev.hero.inventory.equipement, action.item)
                        }
                    }
                });
            }
            else{
                action.error = "Not Enough Arms";
                return prev;
            }
        }
        else {
            action.error = "Not Enough Money";
            return prev;
        }
    }

    buySpell(prev, actions) {
        var action = actions.spellComponent;
        var status = actions.spellComponent.status;
        var newState = _.merge(prev, {});
        var spellsInShop = newState.shop.spells;

        if (prev.hero.money >= action.item.price) {
            spellsInShop.forEach(function (spell, i) {
                if (spell.name == action.item.name) {

                    spellsInShop[i].status = status;
                    console.log(spellsInShop[i])
                }
            });
            return _.merge(newState, {
                hero: {
                    money: prev.hero.money - action.item.price

                },
                shop:{
                    spells: spellsInShop
                }
            });
        }
        else {
            action.error = "Not Enough Money";
            return prev;
        }

    }


}

