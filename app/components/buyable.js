/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from "angular2/core";
import {HeroService} from './hero-service';


@Component({
    selector : 'buyable',
    template : `
    <div>
        <img src={{item.name}}.png />
        <h3>{{item.name}}</h3>
        <h4>{{item.price}}</h4>
        <button (click)=buy()>Acheter</button>
    </div>
    `
})
export class Buyable{
    @Input() item

    constructor(herosService:HeroService){
        this.herosService = herosService;
    }

    buy(){
        /*
         * Need to get player money verify if he has enough money, and then, set it minus the item price
         * increment lvl of this item and recompute stats
         *
         */
        console.log("Click on item " + item.name + "for the price of" + item.price)
    }
}