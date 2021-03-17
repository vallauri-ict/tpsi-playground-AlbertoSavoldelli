"use strict"

$(document).ready(function () {

    let _login = $("#login")
    let _test = $("#test")
   
    let _txtUsr = $("#usr")
    let _txtPwd = $("#pwd")
    let _btnLogin = $("#btnLogin")
    let _lblErrore = $("#lblErrore")
	
	let _domande = $(".domande")

    _login.show()
    _test.hide()
    _lblErrore.hide()
    let idStud;
    _btnLogin.on("click", function(){
        let user = _txtUsr.val();
        let pwd = _txtPwd.val();
        let json = 
        {
            "user":user, "pwd":pwd
        }
        let request = inviaRichiesta("get", "/studenti", json); 
        request.fail(errore);
        request.done(function(data){
            if(data.length > 0){
                _login.hide();
                _test.show();
                idStud = data[0].id;
                InviaRichiestaDomande();
            }
            else _lblErrore.fadeIn(1000)
        })
    })

    _lblErrore.children("button").on("click", function(){
		_lblErrore.fadeOut(1000)
	})

    function InviaRichiestaDomande(){
        let request = inviaRichiesta("get", "/domande");
        request.fail(errore);
        request.done(function(domande){
            for (const domanda of domande) {
                let br = $("<br>");
                br.appendTo(_test.children().eq(2));
                let div = $("<div>"); 
                div.appendTo(_test.children().eq(2));

                let p = $("<p>");
                p.addClass("domanda");
                p.text(domanda.domanda);
                p.prop("id",domanda.id);
                p.appendTo(div);



                let richiestaRisposte = 
                inviaRichiesta("get", `/risposte?codDomanda=${domanda.id}`);
                richiestaRisposte.fail(errore);
                richiestaRisposte.done(function(risposte){
                    for (const risposta of risposte) {
                        let opt = $("<input type=radio>");
                        opt.prop("risposta", risposta);
                        opt.prop("name", domanda.id)
                        opt.appendTo(div);

                        let span = $("<span>");
                        span.text("  " + risposta.risposta);
                        span.appendTo(div);

                        let br = $("<br>");
                        br.appendTo(div);
                    }
                    let opt = $("<input type=radio>");
                    opt.prop("risposta", {"correct":false});
                    opt.prop("name", domanda.id)
                    opt.appendTo(div);
                    opt.prop("checked", true);

                    let span = $("<span>");
                    span.text("  Mi avvalgo della falcoltà di non rispondere.");
                    span.appendTo(div);

                    let br = $("<br>");
                    br.appendTo(div);
                })

            }
            let btn = $("<button>");
            btn.appendTo(_test.children().eq(2));
            btn.text("Invia");
            btn.on("click", function(){
                let opts = $("input[type=radio]:checked");
                let voto = 0;
                opts.each(function(i, ref){
                    if(($(this).prop("risposta")).correct)
                        voto++;
                    else $(ref).next().css({"color" : "red"});
                })
                
                let requestVoto = inviaRichiesta("patch", "/studenti/" + idStud, {"voto" : voto});
                requestVoto.fail(errore);
                requestVoto.done(function(data){
                    console.log(data);
                    alert("Complimenti hai preso un bel " + voto);
                });
                
            })
        })
        
    }
	

});
