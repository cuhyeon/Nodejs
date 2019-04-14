/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

// Express 기본 모듈 불러오기
var express = require('express')
    ,http = require('http')
    ,path = require('path');


// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    ,static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

//body-parser를 사용해 application.json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));


// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/memo').post(function(req, res) {
	console.log('/process/memo 처리');

	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<p>나의 메모</p>');
    res.write('<div><p>메모가 저장되었습니다.</p>');
//    res.write('<div><p>메모가 저장되었습니다.' '</p>');
	res.write("<br><a href='/public/memo.html'>다시 작성</a>");
	res.end();
});

app.use('/', router);


// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
	res.status(404).send('<h2>ERROR - 페이지를 찾을 수 없습니다.</h2>');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
