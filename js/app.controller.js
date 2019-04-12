app.controller = {
    tap: function(){
        document.querySelector('#login button').addEventListener("click",app.controller.loginToProfiles,false);
        document.querySelector("#nextTalent").addEventListener("click",app.controller.nextTalent,false);
        
        var likeBtns = document.querySelectorAll(".actions button.like");
        for(i = 0;i < likeBtns.length;i++)
            likeBtns[i].addEventListener("click",app.controller.favoriteProfile,false);
        
        document.getElementById("btnMoreOptions").addEventListener("click",app.controller.toggleFilterOptions);
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
    },
    favoriteProfile: function(e){
        e.currentTarget.classList.toggle("selected");
    },
    toggleFilterOptions: function(e){
        let obj = e.currentTarget;
        let t = obj.innerHTML;
        let icon = '<i class="fas fa-fire-alt"></i> ';
        let t1 = "More options";
        let t2 = "Less options";
        if(t == icon+t1){
            document.getElementById("moreOptions").style.display = "block";
            obj.innerHTML = icon+t2;
        }else{
            document.getElementById("moreOptions").style.display = "none";
            obj.innerHTML = icon+t1;
        }
    }
};