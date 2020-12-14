"use strict"
let i=0;
 $(document).ready(function(){
     let _header=$("#header");
     let _mainSection=$("#mainSection");
     let _timer=$("#timer");
     _header.animate({"width":60*15,"height":6*15,"line-height":6*15,"font-size":2*15},1500);
     creaDomande();
     function creaDomande(){
          for (const item of elencoDomande) {
               let fieldset=$("<fieldset>").appendTo(_mainSection);
               let legend=$("<legend>").appendTo(fieldset);
               legend.text(item.argomento);
               legend.css({"color":"blue","font-size":"12pt"});
               for (const domanda of  item.domande){
                    i++;
                    let p=$("<p>").appendTo(fieldset);
                    p.text(domanda.domanda)
                    console.log(domanda.domanda);

                    let rbtTrue=$("<input>").appendTo(p);
                    rbtTrue.prop({"value":"T","type":"radio","name":`opt${i}`,"risposta":`${domanda.risposta}` });
                    let lblTrue=$("<label>").appendTo(p).text("T");
                    lblTrue.prop("id","lblTrue");
                    let rbtFalse=$("<input>").appendTo(p);
                    rbtFalse.prop({"value":"F","type":"radio","name":`opt${i}`,"risposta":`${domanda.risposta}` });
                    let lblFalse=$("<label>").appendTo(p).text("F");
                    lblFalse.prop("id","lblFalse");
               }
          }
          let btnInvia=$("<button>").appendTo(_mainSection);
          btnInvia.text("invia");
          btnInvia.addClass("invia");
          btnInvia.on("click",calcolaVoto);
          
          let spanMinuti=$("<span>").appendTo(_timer);
          spanMinuti.text(pad(0));
          $("<span>").appendTo(timer).text(":");
          let spanSecondi =$("<span>").appendTo(_timer);
          spanSecondi.text(pad(0));
          let tempoAtt=setInterval(function(){
               if(spanSecondi.text()=="60"){
                    spanSecondi.text("-1");
                    spanMinuti.text(pad(parseInt(spanMinuti.text())+1));
               }
               spanSecondi.text(pad(parseInt(spanSecondi.text())+1));
               if(spanMinuti.text()=="02"){
                    calcolaVoto();
               }
          },1000);

          function calcolaVoto(){
               let punti=0;
               btnInvia.prop("disabled","true");
               btnInvia.css({"background-color":"#CCC","color":"999"});
               clearInterval(tempoAtt);
               let radios=_mainSection.find("input[type=radio]");
               let labels=_mainSection.find("label");
               radios.each(function(i,ref){
                    if($(ref).prop("checked")&& $(ref).prop("risposta")== $ (ref).val()){
                         punti++;
                    }
                    else if($(ref).prop("checked")&& $(ref).prop("risposta")!= $ (ref).val()){
                         punti-=0.25;
                         labels.eq(i).css({"color":"red"});
                    }
               })
               alert("Punteggio:"+punti+"/30");
               

          }

          
     }
	
 });


 
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
