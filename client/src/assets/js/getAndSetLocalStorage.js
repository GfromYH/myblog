//封装过期控制代码


const itemWay= {
         set(key, value) {
        var curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({data: value, time: curTime}));
    },

    get(key, exp) {
        let data = localStorage.getItem(key);
        let dataObj = JSON.parse(data);
        if (new Date().getTime() - dataObj.time > exp) {
            console.log('信息已过期');
            return localStorage.clear()
            //alert("信息已过期")
        } else {
            //console.log("data="+dataObj.data);
            //console.log(JSON.parse(dataObj.data));
            return 1;
        }
    }
}
export default  itemWay
