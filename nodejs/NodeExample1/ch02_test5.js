/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
var calc = require('./calc'); // 요구하다 - 파라미터로 모듈 파일의 이름을 전달(확장자 빼고 쓰기)

console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : %d' , calc.add(10,10));

var calc2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d' , calc2.add(10,10));