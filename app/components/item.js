/**
 * Created by bluedragonfly on 3/25/16.
 */
/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from 'angular2/core'

@Component({
    selector : 'item',
    template : `
    <div>
        <img src={{this.name}}.png />
        <button>{{this.price}}</button>
    </div>
    `
})

export class Item {
    constructor(name, price){
        this.name = name;
        //Set price with the key {name}.price from storage
        this.basePrice = price;
        //Set level with the key {name}.lvl from storage
        this.level = 0;
        //Set is Unlocked with the key {name}.unlocked from storage
        this.unlocked = true;

        this.price = function(){
            return basePrice + basePrice * level*level;
        };
    }


}
