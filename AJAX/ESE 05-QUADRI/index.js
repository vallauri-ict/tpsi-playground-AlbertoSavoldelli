"option strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    let _wrapperAdd = $('.wrapper').eq(1);
    _btnPrev.prop("disabled", true)
    let request=inviaRichiesta("get",URL+"/artisti");
    request.fail(errore);
    request.done(function(artisti){
        for (const artista of artisti) {
            let lbl=$("<label>");
            lbl.appendTo(_head);
            let radio=$("<input type='radio'>");
            radio.appendTo(lbl);
            radio.prop("artista",artista);
            radio.prop("name","artisti");
            //lbl.text(artista.nome); NON FUNZIONA
            lbl.append(artista.name); //FUNZIONA
            //lbl.html(lbl.html()+" "+artista.name); FUNZIONA
        }
        let n=generaNumero(0,artisti.length-1)
        let chk=$("input[type='radio']").eq(n)
        chk.prop("checked",true);
        let idArtista= chk.prop("artista").id;
        inviaRichiestaQuadri(idArtista,chk.prop("artista").gender)
        
    })
    let quadris=[];
    function inviaRichiestaQuadri(idArtista,genere){
        let request=inviaRichiesta("get",URL+"/quadri?artist="+idArtista);
        request.fail(errore);
        request.done(function(quadri){
            
            visualizzaQuadro(quadri[0],genere);
            quadris=quadri;
            
        })
    }
    _head.on("click","input",function(){
        let idArtista=$(this).prop("artista").id;
        let genere=$(this).prop("artista").gender;
        inviaRichiestaQuadri(idArtista,genere);
    })
    let i=0;
    _btnNext.on("click",function(){
        i++;
        visualizzaQuadro(quadris[i],genere)
    })
    function visualizzaQuadro(quadro,genere){
        _info.empty();
        _img.empty();
        $("<p>").text("ID= "+quadro.id).appendTo(_info);
        $("<p>").text("Titolo= "+quadro.title).appendTo(_info);
        $("<p>").text("Genere= "+genere).appendTo(_info);
        let img=$("<img>").prop("src","like.jpg").addClass("like");
        img.on("click",function(){
            let request=inviaRichiesta("patch",URL+"/quadri/quadro.id",
            {"nLike":quadro.nLike+1})
        })
        request.fail(errore);
        request.done(function(){

        })
        $("<p>").text("Like= "+quadro.nLike).appendTo(_info).append(img);
        if(quadro.img.includes("base64,")){
            $("<img>").prop("src",quadro.img).appendTo(_img);
        }
        else
            $("<img>").prop("src","img/"+quadro.img).appendTo(_img);
    }
    
})
