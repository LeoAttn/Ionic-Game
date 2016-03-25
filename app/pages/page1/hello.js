import {Component} from 'angular2/core'

@Component({
    selector: 'hello',
    template: `
        <h1>HELLO {{name}} !</h1>
    `,
    inputs: ['name']
})
export class Hello {
}

@Component({
    selector: 'toto',
    template: `
        <h2>{{message}} TOTO !</h2>
        <h3>{{date()}}</h3>
    `
})
export class Toto {
    constructor() {
        this.message = 'Bonjour'
    }

    date() {
        return new Date()
    }
}