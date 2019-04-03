/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
var fs = require('fs');
fs.mkdir('./docs', 0666, function(err) {
    if(err) throw err;
    console.log('.새로운 docs 폴더를 만들었습니다');
    
    fs.rmdir('./docs', function(err) {
        if(err) throw err;
        console.log('docs 폴더를 삭제했습니다.');
    });
});