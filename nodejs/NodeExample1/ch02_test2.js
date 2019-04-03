/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
console.dir(process.argv);

if(process.argv.length > 2) {
    console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index) { //배열에 들어있는 모든 값을 하나씩 출력
    console.log(index + ' : ', item)
});