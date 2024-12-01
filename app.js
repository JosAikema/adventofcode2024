//import dayjs  from "dayjs";
const dayjs = require('dayjs');

let day = dayjs().date();
//day = 1
console.log('Day: ', day)

//import Challenge from './1/day1.js'
const Challenge = require('./' + day + '/day' + day + '.js')
const {processInput} = require("./lib/utils");



let testdata = processInput('./' + day + '/test.txt');
let data = processInput('./' + day + '/input.txt');
let challenge = new Challenge(testdata, data, 11, 31);
challenge.run();