/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

//Express 기본 모듈 호출
var express = require("express"),
  http = require("http");

//익스프레스 객체 생성
var app = express();

//기본 포트를 app객체에 속성으로 정렬
//app.set은 객체에 정의된 함수를 호출
app.set('port', process.env.PORT || 3000);

//Express 서버 시작
//http 모듈에 정의된 CreateServer()메소드를 호출
//매개변수로 app을 받아옴
http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

//속성 설정
app.set('port', process.env.PORT || 3000);
