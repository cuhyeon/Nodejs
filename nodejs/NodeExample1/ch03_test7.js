/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
var Person = {
  age : 20,
  name : '소녀시대',
  add : function(a,b) {
    return a+b;
    }
};
    

console.log('더하기 : %d', Person.add(10, 10))
