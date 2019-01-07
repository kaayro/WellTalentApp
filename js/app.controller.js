app.controller = {
    tap: function(){
        document.querySelector('#login button').addEventListener("click",app.controller.loginToProfiles,false);
        document.querySelector("#nextTalent").addEventListener("click",app.controller.nextTalent,false);
    },
    loginToProfiles: function(){
        document.querySelector('#loading').classList.remove("hidden");
        //Get Access Data
        var mail = document.querySelector("#login-user").value;
        var pass = document.querySelector("#login-pass").value;
        if(mail != '' && pass != ''){
            conn.send({action:"login",mail:mail,pass:pass},function(msg){
                if(msg == "1"){
                    app.mail = mail;
                    app.pass = pass;
                    app.saveLogin(mail,pass);
                    conn.getTalentList(null);
                }else{
                    alert("Incorrect access data, please try again!");
                    document.querySelector('#loading').classList.add("hidden");
                }
            });
        }else{
            alert("All fields are required");
            document.querySelector('#loading').classList.add("hidden");
        }
    },
    nextTalent: function(){
        document.querySelector('#loading').classList.remove("hidden");
        conn.getTalentList(app.talent);
    },
    setTalentList: function(msg,data){
        console.log(msg);
        msg = JSON.parse(msg);
        var img = document.querySelector("#profiles .image");
        app.talent = msg.id;
        img.style.backgroundImage = "url("+msg.image+")";
        document.querySelector("#profiles .data .name").textContent = msg.name;
        document.querySelector("#profiles .data h5").textContent = msg.profile;
        document.querySelector("#profiles .data p").textContent = msg.description;
        setTimeout(function(){
            window.location.href = "#profiles";
            document.querySelector('#loading').classList.add("hidden");
        },1000);
    }
};