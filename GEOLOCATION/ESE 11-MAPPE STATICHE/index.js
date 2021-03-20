"use strict";

let URL = "https://maps.googleapis.com/maps/api/staticmap"
const key  = "AIzaSyBZKYgxbiyRE7DknUpnRP2QHCBVjvLgH7g" //qui inserisco la chiave

const params = {
	"key":key,
	"center": /*"via san michele 68, fossano",*/ "44.5557763,7.7347183",
	"zoom":16,
	"size":"800x600",	
	// maptype viene aggiunto dopo  manualmente
	"markers":"color:blue|size:big|label:V|via san michele 68, fossano"	
}
const mapType = ['roadmap', 'satellite', 'hybrid', 'terrain', 'streetview'];



window.onload = function () {	
    let imgBox = $("#imgBox");
	let btnBox = $("#btnBox");
	for (const item of mapType) {
		let button=$("<button>");
		button.text(item);
		button.appendTo(btnBox);
		button.on ("click",visualizzaMappa)
	}

	function visualizzaMappa(){
		let url=URL+"?"+setParameters($(this).text());
		if($(this).text()!="streetview"){
			console.log(url);
			imgBox.prop("src",url);
		}
		else{
			url=URL="/streetview?"+setParameters("streetview");
			url.replace("center","location");
			url+="&/heading"
		}
	}
	function setParameters(mapType){
		let qString="";
		for (const key in params) {
			qString+=key+"="+params[key]+"&";
		}
		qString+="maptype="+mapType;
		return qString;
	}
}