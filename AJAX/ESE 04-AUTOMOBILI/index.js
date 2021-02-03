"option strict"

const URL = "http://localhost:3000"

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table")
	let _dettagli=$(".row").eq(2).children("div").eq(1)
    _dettagli.hide()
    let request= inviaRichiesta("get", URL+"/marche");
    request.fail(errore);
    request.done(function(marche){
        for (const marca of marche) {
            let op=$("<option>");
            op.val(marca.id);
            op.text(marca.nome);
            op.appendTo(_lstMarche);      
    }
    _lstMarche.prop("selectedIndex",-1);
    })

    _lstMarche.on("change",function(){
        _lstModelli.html("");
        let codMarca=_lstMarche.val();
        let request= inviaRichiesta("get", URL+"/modelli?codMarca="+codMarca);
        request.fail(errore);
        request.done(function(modelli){
        for (const modello of modelli) {
            let op=$("<option>");
            op.val(modello.id);
            op.text(modello.nome+" - "+modello.alimentazione);
            op.appendTo(_lstModelli);
        }
        _lstModelli.prop("selectedIndex",-1);
        })
    })
    let intestazione=[{
        "tag":"th",
        "text":"nome",
        "width":"15%",
    },
    {
        "tag":"th",
        "text":"alimentazione",
        "width":"15%",
    },
    {
        "tag":"th",
        "text":"colore",
        "width":"15%",
    },
    {
        "tag":"th",
        "text":"anno",
        "width":"10%",
    },
    {
        "tag":"th",
        "text":"img",
        "width":"15%",
    },
    {
        "tag":"th",
        "text":"dettagli",
        "width":"13%",
    },
    {
        "tag":"th",
        "text":"elimina",
        "width":"12%",
    }
    ]
    _lstModelli.on("change",function(){
        let opzioneSelezionata=_lstModelli.children("option").eq(_lstModelli.prop("selectedIndex").text);
        _lstModelli.prop("nome", opzioneSelezionata.split(" - ",[0]));
        console.log(opzioneSelezionata);
        let codModello=_lstModelli.val();
        let request= inviaRichiesta("get", URL+"/automobili?codModello="+codModello);
        request.fail(errore);
        request.done(function(automobili){
            let thead=$("<thead>");
            thead.appendTo(_table);
            let tr=$("<tr>");
            tr.appendTo(thead);
            for(let i=0;i<intestazione.length;i++){
                let th=$(`<${intestazione[i].tag}>` );
                th.appendTo(tr);
                th.text(intestazione[i].text);
                th.css({"width":intestazione[i].width})
            }
        })
    })
    
       

		
});


