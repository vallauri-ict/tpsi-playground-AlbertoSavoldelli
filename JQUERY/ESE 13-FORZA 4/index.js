'use strict'

const RIGHE = 6
const COLONNE = 7

const GIALLO = "rgb(255, 255, 0)"
const ROSSO = "rgb(255, 0, 0)"
const GRIGIO = "rgb(187, 187, 187)"

let turno = GIALLO

$(document).ready(function() {
    let _wrapper = $("#wrapper")
    let _header = $("#header")
    for (let i = 0; i < COLONNE; i++) {
        let pedina = $("<div>")
        pedina.addClass("pedina")
        pedina.appendTo(_header)
    }
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            let pedina = $("<div>")
            pedina.addClass("pedina")
            pedina.appendTo(_wrapper)
            pedina.prop("id", `btn-${i}-${j}`)
        }
    }

    _header.on("mouseenter", "div", function() { $(this).css("backgroundColor", turno) })
    _header.on("mouseleave", "div", function() { $(this).css("backgroundColor", GRIGIO) })
    _header.on("click", "div", down)

    function down() {
        let colonna = _header.children("div").index($(this))
        let riga = RIGHE - 1 
        for (let i = 0; i < RIGHE; i++) {
            let p = $(`#btn-${i}-${colonna}`)
            if (p.css("backgroundColor") != GRIGIO) {
                riga = i - 1 
                break
            }
        }
        if (riga != -1) {
            let pedina = $("<div>")
            pedina.appendTo(_wrapper)
            pedina.addClass("pedina")
            pedina.css({
                "backgroundColor": turno,
                "position": "absolute",
                "top": -60,
                "left": colonna * 60 + 5
            })
            _header.off("click")
            let _turno = turno 
            $(this).trigger("mouseenter")
            turno == GIALLO ? turno = ROSSO : turno = GIALLO;
            pedina.animate({ "top": riga * 60 + 5 }, 200 * riga + 1,
                    function() {
                        $(`#btn-${riga}-${colonna}`).css({ "backgroundColor": _turno })
                        _header.on("click", "div", down)
                    }
                ) 

        } else alert("Mossa non valida")
    }
})