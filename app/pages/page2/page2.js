import {Page} from 'ionic-angular';
import {Shop} from './shop';
import {UI} from './../Ui'

@Page({
  templateUrl: 'build/pages/page2/page2.html',
  directives : [Shop, UI]
})
export class Page2 {}
