"option strict"

const URL = "http://localhost:3000"

$(document).ready(function () {
    const _lstCitta  =$("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro  = $("#btnFiltro")
    const _tbody = $("table tbody");
	const _divDettagli =$("#divDettagli")
    
	_divDettagli.hide()    
    caricaComboCitta();
    caricaComboGeneri();

    function caricaComboCitta(){
        let li=$("<li>");
        li.text("tutti");
        li.appendTo(_lstCitta);
        let request=inviaRichiesta("get", URL+"/citta");
        request.fail(errore);
        request.done(function(citta){
            
            for (const item of citta) {
                let li=$("<li>");
                li.text(item.citta);
                li.appendTo(_lstCitta);
                li.prop("citta",citta);
            }
        })
        
    }
    function caricaComboGeneri(){
        let li=$("<li>");
        li.text("tutti");
        li.appendTo(_lstGeneri);
        let request=inviaRichiesta("get", URL+"/generi");
        request.fail(errore);
        request.done(function(generi){
            
            for (const genere of generi) {
                let li=$("<li>");
                li.text(genere.genere);
                li.appendTo(_lstGeneri);
                li.prop("genere",genere);
            }
        })
    }

})