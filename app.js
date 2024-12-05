//import dayjs  from "dayjs";
const dayjs = require('dayjs');

let day = dayjs().date();
//day = 1
console.log('Day: ', day)

//import Challenge from './1/day1.js'
const Challenge = require('./' + day + '/day' + day + '.js')
const {processInput} = require("./lib/utils");

let challenge = new Challenge()
let noSplit = challenge.noSplit || false

let testdata = processInput('./' + day + '/test.txt', noSplit);
let data = processInput('./' + day + '/input.txt', noSplit);

challenge.setData(testdata,data)

challenge.run();