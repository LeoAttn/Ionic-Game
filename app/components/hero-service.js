/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {StorageService} from './../storage-service'
import {Observable} from 'rxjs'
import {Store} from './../store'

@Injectable()
export class HeroService {
    constructor(store:Store,storage:StorageService) {
        this.storage = storage;
        this.store = store;

        this.name = storage.initOrGet("playerName", "");
        this.money = storage.initOrGet("playerMoney", 10000).map(x => parseInt(x));
        this.attackDamage = storage.initOrGet("playerDamage", 1).map(x => parseInt(x));
        this.level = storage.initOrGet("playerLevel", 1).map(x => parseInt(x));
        this.spells = storage.initOrGet("equippedSpells", []);//@Need to test this
        this.data = Observable.zip(this.name, this.money, this.attackDamage, this.level, this.spells,
            function (name, money, attackDamage, level, spells) {
                return ({name, money, attackDamage, level, spells});
            });

        this.store.addRoute("ATTACK", this.attack)
    }

    attack(prev,action) {
       // let damage = 0;
        prev.monster.health -= prev.hero.attack;
        if(prev.monster.health <= 0){
            prev.hero.level +=1;
            prev.hero.money += Math.round(Math.pow(1.6, prev.monster.level));
            prev.monster.level = prev.monster.level + 1;
            prev.monster.health = Math.round(2 + Math.pow(1.4, prev.hero.level));
            prev.monster.healthMax = prev.monster.health;
        }
        /* this.attackDamage.map(attDmg => attDmg = attDmg)
             .subscribe(attDmg => damage = attDmg);
         return monsterHealth - damage;*/
    }

    levelUp() {
        let nextLevel = 0;
        this.level = this.level
            .map(level => level + 1);
        this.level.subscribe(level => {
            nextLevel = level;
            this.storage.set("playerLevel", level);
        });
        return nextLevel;
    }
}

