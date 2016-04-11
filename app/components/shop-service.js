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

        this.items = [];
        this.shop.subscribe(shop => this.items = shop.items);

        this.store.addRoute("BUY_ITEM", this.buyItem);
        this.store.addRoute("BUY_SPELL", this.buySpell);
    }

    dispatch(action) {
        this.store.dispatch(action);
    }

    buyItem(prev, action) {
        if (prev.hero.money >= action.item.price) {
            return _.merge(prev, {
                hero: {
                    money: prev.hero.money - action.item.price,
                    clickDamage : prev.hero.clickDamage +1, //action.item.clickUp,
                    dps : prev.hero.dps + 1,//action.item.dpsUp,
                    inventory: _.merge(prev.hero.inventory, _.concat(prev.hero.inventory[action.item.type], action.item))
                }
            });
        }
        else {
            action.error = "Not Enough Money";
            return prev;
        }
    }

    buySpell(prev, actions) {


        if (prev.hero.money >= action.item.price) {
            return _.merge(prev, {
                hero: {
                    money: prev.hero.money - action.item.price
                }
            });
        }
        else {
            action.error = "Not Enough Money";
            return prev;
        }

        }


    }

