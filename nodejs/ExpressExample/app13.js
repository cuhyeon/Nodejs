/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

// Express 기본 모듈 불러오기
var express = require('express') // 모듈 가져오기
  , http = require('http')  //익스프레스의 기반이 되는 부품
  , path = require('path');

// Express의 미들웨어 불러오기 (미들웨어 : 구조내에서 중간 처리를 위한 함수)
// 요청이 발생했을 때 미들웨어 함수 실행, 응답 후 미들웨어 함수 죽음
var bodyParser = require('body-parser') //req.body는 bodyParser모듈이 없는 디폴트값인 Undefined만 출력
  , cookieParser = require('cookie-parser') //요청된 쿠키를 쉽게 추출하도록 해주는 모듈(쿠키 값 확인 용도)
  , static = require('serve-static') //특정 폴더의 파일들을 특정패스로 접근할 수 있도록 만들어 주는 미들웨어
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');


// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더와 uploads 폴더 오픈
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
app.use(cors());


//multer 미들웨어 사용 : 미들웨어 사용 순서 중요  body-parser -> multer -> router
// 파일 제한 : 10개, 1G
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + Date.now())
    }
});

var upload = multer({ 
    storage: storage,
    limits: {
		files: 10,
		fileSize: 800 * 800 * 800
	}
});


// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/photo').post(upload.array('photo', 1), function(req, res) {
	console.log('/process/photo 호출됨.');
	
	try {
		var files = req.files;
	
        console.dir('#===== 업로드된 첫번째 파일 정보 =====#')
        console.dir(req.files[0]);
        console.dir('#=====#')
        
		// 현재의 파일 정보를 저장할 변수 선언
		var originalname = '',
			filename = '',
			mimetype = '',
			size = 0;
		
		if (Array.isArray(files)) { // 배열에 들어가 있는 경우
	        console.log("배열에 들어있는 파일 갯수 : %d", files.length);
	        
	        for (var index = 0; index < files.length; index++) {
	        	originalname = files[index].originalname;
	        	filename = files[index].filename;
	        	mimetype = files[index].mimetype;
	        	size = files[index].size;
	        }
	        
	    } else { // 배열에 들어가 있지 않은 경우
	        console.log("파일 갯수 : 1 ");
	        
	    	originalname = files[index].originalname;
	    	filename = files[index].name;
	    	mimetype = files[index].mimetype;
	    	size = files[index].size;
	    }
		
		console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', '
				+ mimetype + ', ' + size);
		
		// 클라이언트에 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h3>파일 업로드 성공</h3>');
		res.write('<hr/>');
		res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
		res.write('<p>MIME TYPE : ' + mimetype + '</p>');
		res.write('<p>파일 크기 : ' + size + '</p>');
		res.end();
		
	} catch(err) {
		console.dir(err.stack);
	}	
		
});
 
app.use('/', router);


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
