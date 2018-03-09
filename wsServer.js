var ws=require("nodejs-websocket");
var PORT=8001;
var server=ws.createServer(function (conn) {
    console.log('New connection');
    conn.on('text',function (str) {
        console.log('Receiver'+str);
        //变成大写发送回去
        conn.sendText(str.toUpperCase()+'!!!')
    })
    conn.on('close',function (code,reason) {
        console.log('connection closed');
    })

    //处理报错跳出服务
    conn.on('error',function (err) {
        console.log('handle error'+err);
    })
}).listen(PORT);
console.log('websocket server listening on:'+PORT);