/*jslint devel: true */
/*eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/
var winston = require('winston'); // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file'); // 로그 일별 처리 모듈
var moment = require('moment'); // 시간 처리 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
    // ex)2019-03-31 04:02:30.500 +0900'
};

var logger = new (winston.Logger)({
    transports: [
        new (winstonDaily) ({
            name : 'info-file',
            filename : './log/server',
            datePattern : '_yyyy-mm-dd.log',
            colorsize : false,
            maxsize : 50000000,
            maxFiles : 1000,
            lever : 'info',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        }),
        new (winston.transports.Console)({
            name : 'debug-console',
            colorize : true,
            level : 'debug',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        })
    ],
    exceptionHandler: [
        new (winstonDaily)({
            name : 'exception-file',
            filename : './log/exception',
            datePattern : '_yyyy-mm-dd.log',
            colorsize : false,
            maxsize : 50000000,
            maxFiles : 1000,
            lever : 'error',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        }),
        new (winston.transports.Console)({
            name : 'exception-console',
            colorize : true,
            lever : 'debug',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        })
    ]
});
