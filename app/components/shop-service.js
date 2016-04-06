/**
 * Created by bluedragonfly on 4/6/16.
 */
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs'
import {Store} from './../store'
import * as R from 'ramda'

@Injectable()
export class ShopService {
    constructor(store:Store) {
        this.store = store;
        this.shop = this.store.state.map(state => state.shop);

        this.items = [];
        this.shop.subscribe(shop => this.items = shop.items);

        this.store.addRoute("BUY_ITEM", this.buyItem)
    }

    dispatch(action){
        this.store.dispatch(action);
    }

    buyItem(prev, action){
        if(prev.hero.money >= action.item.price){
            return R.merge(prev, {
                hero : {
                    money : prev.hero.money - action.item.price,
                    inventory : R.append(action.item, prev.hero.inventory)
                }
            });

        }
        else {
            action.error = "Not Enough Money";
            return prev;
        }
    }
}

