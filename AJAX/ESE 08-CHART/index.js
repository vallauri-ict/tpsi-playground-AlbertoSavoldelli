"use strict";
window.onload=function(){
    let wr = $("#wrapper");
    let chart;
    let _btnInvia = $("#btnInvia");
    let _tbody = $("tbody");
    let _canvas = $("canvas")[0]; 
    _btnInvia.on("click", function(){
        let request = inviaRichiesta("get", "/", {"results":"100"});
        request.fail(errore);
        request.done(function(persone){
            _tbody.empty();
            _canvas = $("canvas")[0]; 
            let nations = {}; 
            for (const persona of persone.results) {
                if(persona.location.country in nations) 
                nations[persona.location.country]++;
                else 
                nations[persona.location.country] = 1;
            }
            console.log(nations);

            for (const key in nations) {
                let tr = $("<tr>");
                tr.appendTo(_tbody);

                let td = $("<td>");
                td.appendTo(tr);
                td.text(key);

                td = $("<td>");
                td.appendTo(tr);
                td.text(nations[key]);
            }

            let values = [];
            let colors = []
            
            for (const key in nations) {
                values.push(nations[key]);
                let r = generaNumero(0, 255);
                let g = generaNumero(0, 255);
                let b = generaNumero(0, 255);
                colors.push(`rgb(${r}, ${g}, ${b})`);
            }
            
            if(chart != undefined)
                chart.destroy();

            chart = new Chart(_canvas, 
            { 
                type: 'bar', 
                data: 
                { 
                    "labels": Object.keys(nations),
                    "datasets": [{ 
                        "label": 'Grafico delle nazioni', 
                        "data": values, 
                        "backgroundColor": colors, 
                        "borderColor": "#000", 
                        "borderWidth": 1
                        }] 
                } 
            }); 
        })
    })
    let a = $("<a>");
    a.appendTo(wr);
    a.prop("href", "#");
    a.css({"float" : "right"})
    a.text("Salva immagine");
    a.prop("download", "New file.png")
    a.on("click",function(){
        a.prop("href", _canvas.toDataURL("chart/png"));
    })
}