const Ws  = require('ws');
// 使用的是node.js   写的
;((Ws) => {
    const server = new Ws.Server({port:8000});
    const init = () => {
        bindEvent();
    }

    function bindEvent(){
        server.on('open',handleOpen);
        server.on('close',handleClose);
        server.on('error',handleError);
        server.on('connection',handleConnection);
    }

    function handleOpen(){

    }

    function handleClose(){

    }

    function handleError(){

    }

    function handleConnection(ws){
        // message  事件是通过参数进行绑定的
        ws.on('message',handleMessage);
    }

    function handleMessage(msg){
        // 对外进行广播,遍历连接的所有客户端
        server.clients.forEach((c) => {
            c.send(msg);   // 将接受的消息发出去
        })
    }

    init();

})(Ws)