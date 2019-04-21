/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

// Express 기본 모듈 불러오기
var express = require("express"), // 모듈 가져오기
  http = require("http"), //익스프레스의 기반이 되는 부품
  path = require("path");

// Express의 미들웨어 불러오기 (미들웨어 : 구조내에서 중간 처리를 위한 함수)
// 요청이 발생했을 때 미들웨어 함수 실행, 응답 후 미들웨어 함수 죽음?
var bodyParser = require("body-parser"), // bodyParser POST request data의 body를 추출
  //req.body는 bodyParser모듈이 없을때는 디폴트값인 Undefined만 출력
  cookieParser = require("cookie-parser"), //요청된 쿠키를 쉽게 추출하도록 해주는 모듈(쿠키 값 확인 용도)
  static = require("serve-static"), //특정 폴더의 파일들을 특정패스로 접근할 수 있도록 만들어 주는 미들웨어
  errorHandler = require("errorhandler"); //특정 오류코드에 따라 클라이언트에 응답을 보낼때 미리 만들어 놓은 웹문서로 이동할때 사용

// 에러 핸들러 모듈 사용
var expressErrorHandler = require("express-error-handler");

// Session 미들웨어 불러오기
var expressSession = require("express-session");

// 파일 업로드용 미들웨어
var multer = require("multer"); // express에 multer모듈 적용 (파일업로드를 위한 모듈)
var fs = require("fs"); // fs : FileSystem 파일을 다룰때 사용 (파일의 존재 확인 or 생성등등)

// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속(Cross Origin Resource Sharing)) 지원
// 현재 도메인에서 다른 도메인의 리소스를 요청 하는 경우 Ex)  http://A.com -> http://B.com/image.jpg
var cors = require("cors");
//보안 상의 이유로, 브라우저는 CORS를 제한하고 있다.

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정 // use는 객체를 호출하여 반환되는 객체를 반환
app.set("port", process.env.PORT || 3000); //app.set(Key, Value) / process.env.PORT 서버의 환경변수
app.use(bodyParser.urlencoded({ extended: false }));
// urlencoded : 자동으로 req에 body속성이 추가되고 저장
// extended : 중첩된 객체표현을 허용할지 말지를 정하는 것
// true : 객체 안에 객체를 파싱할 수 있게하려면 반대는 false

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더와 uploads 폴더
// 정적파일 폴더 dirname 파일경로, filename 파일이름
app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

// cookie-parser 설정
app.use(cookieParser());

//  Express 프레임워크에서 세션을 관리하기 위한 세션 설정
app.use(
  expressSession({
    secret: "my key", //쿠키 변조를 막기위한 값(세션은 암호와)
    resave: true, // 세션에 변동사항이 없어도 반영할지 설정
    saveUninitialized: true // 초기화되지 않은 세션을 저장할지 설정
  })
);

//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
app.use(cors());

//multer 미들웨어 사용 : 미들웨어 사용 순서 중요  body-parser -> multer -> router
//destination : 업로드한 파일이 저장될 폴더를 지정
//filename : 업로드한 파일의 이름을 바꿈
//limits : 파일 크기나 파일 개수 등의 제한 속성을 설정하는 객체

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads"); // callback 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname + Date.now()); // callback 콜백함수를 통해 전송된 파일 이름 설정
  }
});

var upload = multer({
  storage: storage,
  limits: {
    // 파일 제한 : 100개, 약 800Mb
    files: 100,
    fileSize: 800 * 800 * 800
  }
});

// 라우터 사용하여 라우팅 함수 등록 / 라우팅 - 클라이언트 요청에 애플리케이션이 응답하는 방법
var router = express.Router();

// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router
  .route("/process/photo")
  .post(upload.array("photo", 1), function(req, res) {
    console.log("/process/photo 호출됨.");

    try {
      var files = req.files;

      console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
      console.dir(req.files[0]); //객체의 속성 출력
      console.dir("#=====#");

      // 현재의 파일 정보를 저장할 변수 선언
      var originalname = "",
        filename = "",
        mimetype = "",
        size = 0;

      if (Array.isArray(files)) {
        // isArray 배열에 files이 들어가 있는 경우
        console.log("배열에 들어있는 파일 갯수 : %d", files.length);

        for (var index = 0; index < files.length; index++) {
          originalname = files[index].originalname;
          filename = files[index].filename;
          mimetype = files[index].mimetype;
          size = files[index].size;
        }
      } else {
        // 배열에 들어가 있지 않은 경우
        console.log("파일 갯수 : 0");
      }

      console.log(
        "현재 파일 정보 : " +
          originalname +
          ", " +
          filename +
          ", " +
          mimetype +
          ", " +
          size
      );

      // 클라이언트에 응답 전송
      res.writeHead("200", { "Content-Type": "text/html;charset=utf8" }); //200 - 정상적으로 받았다는 의미
      res.write("<h3>파일 업로드 성공</h3>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일명 : " +
          originalname +
          " -> 저장 파일명 : " +
          filename +
          "</p>"
      );
      res.write("<p>MIME TYPE : " + mimetype + "</p>");
      res.write("<p>파일 크기 : " + size + "</p>");
      res.end(); //본문 작성
    } catch (err) {
      console.dir(err.stack); //에러 출력
    }
  });

app.use("/", router); //path 지정하고 app.use로 등록

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html" //고정경로
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express 서버가 3000번 포트에서 시작됨");
});
