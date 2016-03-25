import {Component} from 'angular2/core'
import {Hello, Toto} from './hello'

@Component({
    selector: 'app',
    template: `
        <h1>App</h1>
        <hello></hello>
        <toto></toto>
    `,
    directives: [Hello, Toto]
})
export class App1 {
}
