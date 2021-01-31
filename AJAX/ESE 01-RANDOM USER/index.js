"use strict";

$(document).ready(function(){
    creaRandomUser();
    let numUsers;
    let _pSelectedNumber=$("#selectedNumber");
    let _btnAvanti=$("#btnAvanti");
    let _btnIndietro=$("#btnIndietro");
    let i=0;
    let usersDataLoc;
    _btnAvanti.hide();
    _btnIndietro.hide();
    $("#numberRange").change(function(){
        _pSelectedNumber.text("Selected number: "+$("#numberRange")[0].value);
        numUsers=$("#numberRange")[0].value;
    })
    $("#btnSumbmit").on("click",function(){
        i=0;
        _btnAvanti.prop("disabled",false);
        numUsers = $("#numberRange")[0].value;
        let selectedGender=$('[name="gender"]:checked').val();
        let param = "?results=" + numUsers+"&"+"gender="+selectedGender;
        param+="&"+"nat=";
        if($("#BR").is(':checked')){
            param+="BR";
        }
        if($("#FR").is(':checked')){
            param+=",FR";
        }
        if($("#IE").is(':checked')){
            param+=",IE";
        }
        if($("#AU").is(':checked')){
            param+=",AU";
        }
        if($("#ES").is(':checked')){
            param+=",ES";
        }
        if($("#US").is(':checked')){
            param+=",US";
        }
        console.log(param);
        let finalUrl = "https://randomuser.me/api/" + param;
        if($("#numberRange")[0].value!=1){
            _btnAvanti.show();
            _btnIndietro.show();
        }
        else{
            if($("#numberRange")[0].value==1){
                _btnAvanti.hide();
                _btnIndietro.hide();
            }
        }
        
        
        $.ajax({
            url: finalUrl,
            success: function (usersData) {
                console.log(usersData);
                visualUser(usersData,0);
                usersDataLoc=usersData;
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Server Error: " + jqXHR.responseText);
            }
        });
        
        
    })
    _btnIndietro.on("click",function(){
        if(i!=0){
            if(i==(numUsers-1))
                _btnAvanti.prop("disabled",false);
            i--;
            visualUser(usersDataLoc,i);
        }
        else{
            _btnIndietro.prop('disabled',true);
            console.log("indietro bloccato");
        }
       
    })
    _btnAvanti.on("click",function(){
        console.log("premuto avanti");
        if(i!=(numUsers-1)){
            if(i==0)
                _btnIndietro.prop("disabled",false);
            i++;
            visualUser(usersDataLoc,i);
            
            
        }
        else{
            _btnAvanti.prop("disabled",true);
            console.log("avanti bloccato");
        }
            
        
    })

})
function visualUser(usersData,i){
    console.log(i);
    let _p1 = $("#p1");
    let _p2 = $("#p2");
    let day,month,year;
    let phonePrefix;
    let phoneMody;
    $("#randomUserImg").attr("src",usersData.results[i].picture.large);
    _p1.text("Hi, my name is");
    _p2.text(usersData.results[i].name.first+" "+usersData.results[i].name.last);
    $("#imgName").attr("src","img/1on.jpg");
    $("#imgMail").attr("src","img/2off.jpg");
    $("#imgBirthday").attr("src","img/3off.jpg");
    $("#imgAddress").attr("src","img/4off.jpg");
    $("#imgPhoneNumber").attr("src","img/5off.jpg");
    $("#imgPassword").attr("src","img/6off.jpg");
    $("#li1").mouseenter(function(){
        $("#imgName").attr("src","img/1on.jpg");
        $("#imgMail").attr("src","img/2off.jpg");
        $("#imgBirthday").attr("src","img/3off.jpg");
        $("#imgAddress").attr("src","img/4off.jpg");
        $("#imgPhoneNumber").attr("src","img/5off.jpg");
        $("#imgPassword").attr("src","img/6off.jpg");
        _p1.text("Hi, my name is");
        _p2.text(usersData.results[i].name.first+" "+usersData.results[i].name.last);
    })
    $("#li2").mouseenter(function(){
        $("#imgMail").attr("src","img/2on.jpg");
        $("#imgName").attr("src","img/1off.jpg");
        $("#imgBirthday").attr("src","img/3off.jpg");
        $("#imgAddress").attr("src","img/4off.jpg");
        $("#imgPhoneNumber").attr("src","img/5off.jpg");
        $("#imgPassword").attr("src","img/6off.jpg");
        _p1.text("My email address is");
        _p2.text(usersData.results[i].email);
    })
    $("#li3").mouseenter(function(){
        $("#imgBirthday").attr("src","img/3on.jpg");
        $("#imgMail").attr("src","img/2off.jpg");
        $("#imgName").attr("src","img/1off.jpg");
        $("#imgAddress").attr("src","img/4off.jpg");
        $("#imgPhoneNumber").attr("src","img/5off.jpg");
        $("#imgPassword").attr("src","img/6off.jpg");
        _p1.text("My birthday is");
        year=usersData.results[i].dob.date.substring(0,4);
        month=usersData.results[i].dob.date.substring(5,7);
        day=usersData.results[i].dob.date.substring(8,10);
        _p2.text(day+"/"+month+"/"+year);
    })
    $("#li4").mouseenter(function(){
        $("#imgAddress").attr("src","img/4on.jpg");
        $("#imgMail").attr("src","img/2off.jpg");
        $("#imgName").attr("src","img/1off.jpg");
        $("#imgBirthday").attr("src","img/3off.jpg");
        $("#imgPhoneNumber").attr("src","img/5off.jpg");
        $("#imgPassword").attr("src","img/6off.jpg");
        _p1.text("My address is");
        _p2.text(usersData.results[i].location.street.number+" "+usersData.results[i].location.street.name);
    })
    $("#li5").mouseenter(function(){
        $("#imgPhoneNumber").attr("src","img/5on.jpg");
        $("#imgAddress").attr("src","img/4off.jpg");
        $("#imgMail").attr("src","img/2off.jpg");
        $("#imgName").attr("src","img/1off.jpg");
        $("#imgBirthday").attr("src","img/3off.jpg");
        $("#imgPassword").attr("src","img/6off.jpg");
        _p1.text("My phone number is");
        _p2.text(usersData.results[i].phone);
             
        
    })
    $("#li6").mouseenter(function(){
        $("#imgPassword").attr("src","img/6on.jpg");
        $("#imgPhoneNumber").attr("src","img/5off.jpg");
        $("#imgAddress").attr("src","img/4off.jpg");
        $("#imgMail").attr("src","img/2off.jpg");
        $("#imgName").attr("src","img/1off.jpg");
        $("#imgBirthday").attr("src","img/3off.jpg");
        _p1.text("My password is");
        _p2.text(usersData.results[i].login.password);
    })
}
function creaRandomUser(){
    let _p1 = $("#p1");
    let _p2 = $("#p2");
    let richiesta = inviaRichiesta("https://randomuser.me/api/");
	richiesta.done(function (data) {
		data = JSON.parse(data)
        console.log(data);
        visualUser(data,0);
    });
    richiesta.fail(error)
}



function inviaRichiesta(url) {
    return $.ajax({
        type: "GET",
        url: url,
        data: "",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "text",        
        timeout: 5000,
    });	
}

function error(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
