/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
var Users = [{name : '소녀시대', age : 22},{name : '걸스데이', age : 20}, {name : '티아라', age : 21}];

console.log('배열 요수의 수 : %d', Users.length);
for(var i = 0; i < Users.length; i++) {
    console.log('배열 요소 #'+ i + ': %s', Users[i].name);
}

console.log('nforEach 구문 사용하기');
Users.forEach(function(item, index) {
    console.log('배열 요소 #' + index +': %s', item.name);
});
