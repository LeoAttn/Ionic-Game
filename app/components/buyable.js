/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from "angular2/core";
import {HeroService} from './hero-service';
import {StorageService} from './storage-service'
import {Subject, Observable} from 'rxjs'

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

    constructor(herosService:HeroService, storageService:StorageService){
        this.herosService = herosService;
        this.buyStream = new Subject();
        this.buyStream.next(0);
        this.computeMoneyStream = this.buyStream
            .merge(this.herosService.moneyData)
            .scan((a,b) => a+b);
        this.computeMoneyStream.subscribe(count => storageService.set("playerMoney", count));
    }

    buy(){
        /*
         * Need to get player money verify if he has enough money, and then, set it minus the item price
         * increment lvl of this item and recompute stats
         *
         */
        var money;
        this.herosService.moneyData.subscribe(pMoney => money = pMoney);

        if(money > this.item.price)
        {
            this.buyStream.next(-this.item.price);
            //this.herosService.money -= this.item.price;

        }
        console.log("Click on item " + this.item.name + "for the price of" + this.item.price)
    }
}