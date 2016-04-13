import {Page} from 'ionic-angular';
import {Clicker} from './clicker';
import {SpellsBar} from './spells-bar';


@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [Clicker, SpellsBar]
})
export class Page1 {
}
