var ws=require("nodejs-websocket");

var PORT=8001;

var clientCount=0;

var server=ws.createServer(function (conn) {
    console.log('New connection');
    clientCount++;
    conn.nickName='user'+clientCount;
    //broadcast
    broadcast(conn.nickName+'come in','enter');
    console.log(conn.nickName);
    conn.on('text',function (str) {
        console.log('Receiver'+str);
        //变成大写发送回去
        broadcast(conn.nickName+':'+str,'message')
    })
    conn.on('close',function (code,reason) {
        console.log('connection closed');
        broadcast(conn.nickName+'left','closed')
    })

    //处理报错跳出服务
    conn.on('error',function (err) {
        console.log('handle error'+err);
    })
}).listen(PORT);
console.log('websocket server listening on:'+PORT);

//广播
function broadcast(str,type) {
    //每一个链接都发送一遍，相当于广播
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}