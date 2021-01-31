"use strict"

let righe = 2;
let colonne = 2;
let livello = 1;
let indovinate = 0;
let click=0;

$(document).ready(function(){
    let wrapper = $("#wrapper");
    start();

    function start()
    {
        wrapper.empty();
        wrapper.off("click");
        for(let i=0;i<righe;i++)
        {
            for(let j=0;j<colonne;j++)
            {
                let shape = $("<div>");
                shape.addClass("shape");
                shape.prop("id","btn-" + i + "-" + j);
                shape.appendTo(wrapper);
            }
        }
        let pedineBlu = [];
        do 
        {
            let r = generaNumero(0, righe - 1);
            let c = generaNumero(0, colonne - 1);
            if (!pedineBlu.includes(r + "-" + c)) {
                pedineBlu[pedineBlu.length] = r + "-" + c;
            }
        } while (pedineBlu.length != livello + 1);
        coloraPedine(pedineBlu);
        wrapper.on("click","div",checkVittoria);
    }

   
    
    

    function coloraPedine(pedineBlu)
    {
        for (let i = 0; i < pedineBlu.length; i++) {
            let aus = pedineBlu[i].split("-")
            let r = aus[0]
            let c = aus[1]
            let currentShape = $(`#${r}-${c}`)
            currentShape.css({ "background-color": "blue" })
            currentShape.prop("blue", true)
            setTimeout(function() {
                currentShape.css({ "background-color": "" })
            }, 1500)
        }
    }

    function checkVittoria()
    {
        click++;
        if(click < 2)
        {
            if($(this).prop("blue"))
            {
                indovinate++;
                $(this).addClass("blue");
                $(this).prop("disabled","true");
            }
            else
            {
                $(this).addClass("red");
                $(this).prop("disabled","true");
            }
        }
        else if(click==2)
        {
            if(indovinate==livello+1)
            {
                alert("Bravissimo hai completato il livello. Ora passiamo al livello successivo");
                newLevel();
            }
            else
            {
                if(indovinate<2)
                {
                    alert("Hai sbagliato. Devi ripetere il livello corrente");
                    wrapper.off("click");
                    start();
                }
            }
        }
        
    }

    function newLevel() {
        if (righe == colonne) {
            righe++;
        } else {
            colonne++
        }
    }
})

function generaNumero(min,max){
    let n= Math.floor((max-min+1)*Math.random()+min)
    return n;
}