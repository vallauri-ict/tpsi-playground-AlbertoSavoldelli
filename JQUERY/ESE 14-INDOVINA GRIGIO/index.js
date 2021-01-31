

$(document).ready(function() {
    let wrapper = $("#wrapper");
    let tool = $("#tooltip");
    let btnOk = $("#btnOk");
    let txtPosizione = $("#txtPosizione");
    let txtColore = $("#txtColore");
    let messaggio = $("#lblMsg");
    let cnt=0;

    wrapper.css({"background-color":"#FF9","float":"left"});
    creaDiv();
    wrapper.on("mouseover", "div", vediColore);
    wrapper.on("mouseout", "div", nascondiColore);
    btnOk.on("click",controlla);


    function creaDiv()
    {
        for(let i=0;i<9;i++)
        {
            let div = $("<div>").addClass("box");
            let grigio = generaNumero(0,255);
            console.log(grigio);
            div.css({"background-color":"rgb(" + grigio + "," + grigio +"," + grigio + ")"});
            div.prop("color", grigio);
            div.appendTo(wrapper);
        }
    }

    function vediColore(){
        tool.text("Tono di grigio: " + $(this).prop("color")).fadeIn(1000);
    }

    function nascondiColore(){
        tool.text("Tono di grigio: " + $(this).prop("color")).fadeOut(1000);
    }

    function controlla()
    {
        let pos = parseInt(txtPosizione.val());
        let colore = parseInt(txtColore.val());
        let divs = wrapper.children("div");

        if(pos!=-1 && colore!=-1)
        {
            for(let i=0;i<divs.length;i++)
            {
                if(pos == i+1)
                {
                    if(colore == parseInt(divs.eq(i).prop("color")))
                    {
                        cnt++;
                        divs.eq(i).css({"background-color":"#FF9","border":"none",})
                        txtColore.css({"background-color":"white","color":"black"});
                        messaggio.text("BRAVO");
                    }
                    else if(colore < parseInt(divs.eq(i).prop("color")))
                    {
                        txtColore.css({"background-color":"red","color":"white"});
                        messaggio.text("Troppo piccolo");
                    }
                    else if(colore > parseInt(divs.eq(i).prop("color")))
                    {
                        txtColore.css({"background-color":"blue","color":"white"});
                        messaggio.text("Troppo grande");
                    }
                }
            }
            
        }
        else
        {
            alert("Dati sbagliati");
        }
        if(cnt==9)
            alert("Complimenti, li hai indovinati tutti!");
    }
});



function generaNumero(min,max){
    let n= Math.floor((max-min+1)*Math.random()+min) 
    return n;
}