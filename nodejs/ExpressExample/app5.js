/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

var express = require('express')
    , http = require('http');

var app = express();

//req = requset / res = response
  
    //Read
    //data 이벤트: 스트림이 소비자에게 데이터 청크를 전송할때 발생합니다.
    //end 이벤트: 더 이상 소비할 데이터가 없을때 발생합니다.
    
    //Write
    //drain 이벤트: 쓰기 가능한 스트림이 더 많은 데이터를 수신할 수 있다는 신호입니다.
    //finish 이벤트: 모든 데이터가 시스템으로 플러시 될때 생성됩니다.


http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨');
});


app.use(function(req, res, next) {
    console.log('첫 번쨰 미들웨어에서 요청을 처리함');
    
    res.redirect('http://google.co.kr');
});