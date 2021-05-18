// 立即执行函数
;((doc, location, storage)=>{
    const oLists = doc.querySelector('#lists');
    const oSendMessage = doc.querySelector('#sendMessage');
    const oSendBtn = doc.querySelector('#sendBtn');
    // 实例化WebSocket
    const ws = new WebSocket('ws://localhost:8000');

    var user = "";

    const init = () => {
        bindEvent();
    }
    // 绑定事件
    function bindEvent(){
        doc.addEventListener('keyup',handleKeyEvent,false);  //false 表示是事件冒泡，true表示事件捕获
        oSendBtn.addEventListener('click',handleSendMessage,false);
        ws.addEventListener('open',handleOpen,false);
        ws.addEventListener('close',handleClose,false);
        ws.addEventListener('message',handleMessage,false);
        ws.addEventListener('error',handleError,false);

    }

    function handleKeyEvent(e){
        if(e.keyCode == 13){
            oSendBtn.click();
        }
    }

    function handleSendMessage(){
        var msg = oSendMessage.value;
        if(!msg.trim().length){
            return ;
        }
        // 发送消息
        ws.send(JSON.stringify({
            user:user,
            message:msg,
            dateTime:new Date().getTime()
        })
        );

        oSendMessage.value = "";

    }

    function handleOpen(){
    user = storage.getItem("userName");
        if(!user){
            location.href = 'entry.html';
            return; //结束
        };
    }

    function handleClose(){
        
    }

    function handleMessage(e){
        // 接受到后台广播出来的信息
        const msgDate = JSON.parse(e.data);
        oLists.appendChild(createLi(msgDate))

    }
    // 添加到页面的方法
    function createLi(dataMesage){
        const {user,dateTime,message} = dataMesage;
        const Item = document.createElement('li');
        Item.innerHTML = `
        <p>
        <span>${user}</span>
        <i>${ new Date(dateTime) }</i>
        </p>
        <p>消息：${message}</p>
        `;
        return Item;
    }

    function handleError(e){
        console.log(e);
        // alert(e);
    }

    init();
})(document, location, localStorage, WebSocket)