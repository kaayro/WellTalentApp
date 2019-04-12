var app = {
    mail: null,
    pass: null,
    talent: null,
    init: function(){
        //Leave from Login Screen
        if(app.isLogged()){
            document.querySelector('#loading').classList.remove("hidden");
            conn.getTalentList(null);
        }
        //Control Taps
        app.controller.tap();
    },
    saveLogin: function(mail,pass){
        window.localStorage.setItem("mail",mail);
        window.localStorage.setItem("pass",pass);
    },
    isLogged: function(){
        if(window.localStorage.getItem("mail") != undefined){
            app.mail = window.localStorage.getItem("mail");
            app.pass = window.localStorage.getItem("pass");
            return true;
        }else
            return false;
    }
};
window.addEventListener("load",app.init,false);