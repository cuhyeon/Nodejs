/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
process.on('tick', function() {
    console.log('tick 이벤트 발생함');
});

setTimeout(function() {
    console.log('2초 후에 tick 이벤트 전달 시도함');
    
    process.emit('tick','2');
}, 2000);