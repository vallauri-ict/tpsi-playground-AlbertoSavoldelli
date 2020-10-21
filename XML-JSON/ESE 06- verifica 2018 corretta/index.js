"use strict"

window.onload = function(){
    
    let _lstNazioni=document.getElementById("lstNazioni");
    let _table=document.getElementById("table");
    let _dettagli=document.getElementById("dettagli");
    let intestazioni=["name","username","state","nat","img"];
    caricalstNazioni();
    caricaTabella();
    _lstNazioni.addEventListener("change",caricaTabella);
    _lstNazioni.addEventListener("change",puliscidettagli);

    function caricalstNazioni(){
        let i=0;
        let vetNat=json["results"];
        let vet=[];
        for (const item of vetNat) {
            if(!vet.includes(item.nat)){
                let _option=document.createElement("option");
                _option.innerHTML=item.nat;
                _lstNazioni.appendChild(_option);
                vet[i++]=item.nat;
            }
        }
    }

    function caricaIntestazioni(){
        let _tr=document.createElement("tr");
        _table.appendChild(_tr);
        for(let i=0;i<intestazioni.length;i++)
        {
            let _th=document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _tr.appendChild(_th);
        }
    }

    function caricaTabella(){
        let i=0;
        _table.innerHTML="";
        caricaIntestazioni();
        console.log(_lstNazioni.value);
        let vetJson=json.results;
        for (const item of vetJson) {
            if((_lstNazioni.value==item.nat)||(_lstNazioni.value=="tutti")){
            let _tr=document.createElement("tr");
            _table.appendChild(_tr);
            _table.style.overflow="hidden";
            let _td;
            _td=document.createElement("td");
            _tr.appendChild(_td);
            _td.innerHTML=vetJson["first"];
            _td.innerHTM+=" ";
            _td.innerHTML=item.name.first;
            _td.innerHTML+=" ";
            _td.innerHTML+=item.name.last;

            _td=document.createElement("td");
            _tr.appendChild(_td);
            _td.innerHTML=item.login.username;

            _td=document.createElement("td");
            _tr.appendChild(_td);
            _td.innerHTML=item.location.state;

            _td=document.createElement("td");
            _tr.appendChild(_td);
            _td.innerHTML=item.nat;
            
            _td=document.createElement("td");
            _tr.appendChild(_td);
            let _img=document.createElement("img");
            _img.src=item.picture.thumbnail;
            _img.style.width="50px";
            _img.style.height="50px";
            _td.appendChild(_img);
            _img.addEventListener("click",visaulizzaDettagli);
            }
            

        }

    }

    function visaulizzaDettagli(){
        
        let j=0;
        _dettagli.innerHTML="";
        for (const item of json.results) {
            
            if(this.src==item.picture.thumbnail){
                let _imgLarge=document.createElement("img");
                _imgLarge.src=item.picture.large;
                _dettagli.appendChild(_imgLarge);
                

                let _p=document.createElement("p");
                _p.innerHTML=item.name.first;
                _p.innerHTML+=" ";
                _p.innerHTML+=item.name.last;
                _dettagli.appendChild(_p);

                _p=document.createElement("p");
                _p.innerHTML=item.email;
                _dettagli.appendChild(_p);

                _p=document.createElement("p");
                _p.innerHTML=item.phone;
                _dettagli.appendChild(_p);

                _p=document.createElement("p");
                _p.innerHTML=item.cell;
                _dettagli.appendChild(_p);

                let _button = document.createElement("button"); 
                _button.innerHTML="Elimina";
                _dettagli.appendChild(_button);
                _button.addEventListener("click",eliminaRecord);
                _button.recordDaEliminare=j;
                console.log(j);
                
            }
            j++;
        }
        
    }

    function puliscidettagli(){
        _dettagli.innerHTML="";
    }
    function eliminaRecord(){
        let vetJson=json.results;
        let pos=this.recordDaEliminare;
        console.log(pos);
        vetJson.splice(pos,1);
        alert("Record eliminato");
        puliscidettagli();
        caricaTabella();
        
    }
}