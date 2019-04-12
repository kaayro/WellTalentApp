var conn = {
    key: '29c329efb1ab8c6e50162227b45feff4aglff49fca963bc9db7d8724f2886806d0b',
    srv: 'https://getwelltalent.com/Server/api.connect.php?key=',
>>>>>>> 8940a345550b38a46aa231da7492f142ea5a9ec2
    send: function(data,success){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200)
                success(this.responseText,data);
        };
        xhttp.open("POST", conn.srv+conn.key, true);
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        var str = "";
        Object.keys(data).forEach(function(key){
            str += "&"+key+"="+data[key];
        });
        str = str.substr(1);
        xhttp.send(str);
    },
    getTalentList: function(id){
        conn.send({action:"getTalentList",mail:app.mail,pass:app.pass,filter:null,id:id},app.controller.setTalentList);
    }
};
