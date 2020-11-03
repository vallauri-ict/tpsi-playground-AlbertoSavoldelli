"use strict"

$(document).ready(function()
{	
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");
	
	let btnEntra=$("#btnEntra")
	let btnEsci = $("#btnEsci")
	let btnVisualizzaPalla = $("#btnVisualizzaPalla")
	let btnNascondiPalla = $("#btnNascondiPalla")
	let btnTira = $("#btnTira")

	_calciatore.hide();
	_palla.hide();
	_palla.prop("goal",false);

	btnEsci.css({"visibility":"hidden"}); // mettendo le proprietà nella graffa posso mettere tutte le proprietà CSS assieme
	btnNascondiPalla.css({"visibility": "hidden"});
	btnTira.css({"visibility":"hidden"});

	btnEntra.on("click", function(){
		// this è SEMPRE un puntatore javascript
		//this.style.visibility = "hidden";   funziona
		// $ restituisce sempre un oggetto jQuery
		$(this).css({"visibility":"hidden"});   // trasformo il this in jQuery da puntatore javascript mettendo $
		_calciatore.show(2000, function(){
			btnEsci.css({"visibility" : "visible"}); // il tempo di default di show è 0
			checkTira();
		});	
	});

	btnEsci.on("click", function(){
		$(this).css({"visibility":"hidden"});
		_calciatore.hide(2000, function(){
			btnEntra.css({"visibility" : "visible"});
			btnTira.css({"visibility":"hidden"});
		});
	});

	btnVisualizzaPalla.on("click", function(){
		$(this).css({"visibility":"hidden"});
		_palla.fadeIn(2000, function(){
			btnNascondiPalla.css({"visibility" : "visible"});
			checkTira();
		});
	});

	btnNascondiPalla.on("click", function(){
		$(this).css({"visibility":"hidden"});
		_palla.fadeOut(2000, function(){
			btnVisualizzaPalla.css({"visibility" : "visible"});
			btnTira.css({"visibility":"hidden"});
			if(_palla.prop("goal"))     // in scrittura prop ha 2 parametri, in lettura 1 (nome della proprietà)
			{
				let pos = {   // quando scrive "" nelle proprietà ricarica le impostazioni di default dell'HTML
					"left" : "",
					"top" : "",
					"width" : "",
					"height" : ""
				};
				_palla.css(pos);
				_palla.prop("goal",false);
			}
		});
	});


	function checkTira(){
		if(_calciatore.is(":visible") && _palla.is(":visible"))
		{
			btnTira.css({"visibility":"visible"});
		}
	}

	btnTira.on("click", function(){
		$(this).css({"visibility":"hidden"});
		let pos = {
			"left" : "1025px",
			"top" : "300px",
			"width" : "50px",
			"height" : "50px"
		};
		_palla.animate(pos, 1500, function(){
			$(this).prop("goal",true);
		});
	});

	$("#btnRosso").on("click", function(){
		_palla.prop("src", "img/PallaRossa.jpg");
	})

	$("#btnBianco").on("click", function(){
		_palla.prop("src", "img/palla.jpg");
	})
	
});