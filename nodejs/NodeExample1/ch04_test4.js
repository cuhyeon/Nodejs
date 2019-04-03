/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
var Calc = require('./calc3');

var calc = new Calc();
calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달함');