"use strict"
$(document).ready(function(){
    let _button=$(".button")
    let _btnIndietro=$("#btnIndietro");
    let _btnAvanti=$("#btnAvanti");
    let _img=$("#img");
    let btnCss={
        "width":"140px",
        "height":"40px",
        "text-align":"center",
        "background-color":"orange",
        "cursor":"pointer",
        "borderRadius":"50%",
        "postion":"relative"
    }
    _btnIndietro.css(btnCss);
    _btnAvanti.css(btnCss);
    let cont=1;
    _btnIndietro.prop('disabled', true);
    _img.attr("src", "img/img1.jpg");
    _img.css("width","400px");
    _img.css("postion","absolute")

    _btnIndietro.on("click", function name(params) {
        if (cont==2) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
        if (cont > 1) {
            cont--;
            _btnAvanti.prop('disabled', false);
        }
        _img.attr("src", "img/img" + cont + ".jpg");
    })
    _btnAvanti.on("click", function name(params) {
        if (cont==6) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }

        if (cont < 7) {
            cont++;
            _btnIndietro.prop('disabled', false);
        }

        _img.attr("src", "img/img" + cont + ".jpg");
    })

})