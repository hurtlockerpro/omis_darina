
import { ICars } from "./ICars";

const chalk = require('chalk');
console.log(chalk.blue('Hello world!'));
console.log(chalk.red('Hello world!'));


let username:string = 'hurtlockerpro'
let cars:string[] = ['audi', 'bmw']
let cars2:ICars[] = [
    {
        name: 'audi',
        color: 'red'
    },
    {
        name: 'bwm',
        color: 'red'
    }
]


let num = 10
cars2[0].name = num.toString()


console.log(username, 'car 1: ', cars2[0].name)