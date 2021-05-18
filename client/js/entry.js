// 模块化  需要执行一个立即执行函数
;((doc,storage,location)=>{
    const oUserName = doc.querySelector('#userName');
    const oBtn = doc.querySelector('#btn');

    const init = () => {

        bindEvent();
    }

    // 绑定事件函数,使用事件委托
    function bindEvent(){
        oBtn.addEventListener('click',handEventClick,false);
    }

    // 执行的函数
    function handEventClick(){
        const name = oUserName.value.trim();
        if(name.length < 3){
            alert("用户名不能小于3位");
            return;
        }

        storage.setItem("userName",name);
        location.href = 'index.html';
    }

    // 调用函数
    init();

})(document, localStorage ,location)  //document说明这是一个局部模块