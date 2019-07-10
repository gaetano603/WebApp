$(function(){
	"use strict";

	var sect = $( window.location.hash ),
		portfolio = $('.portfolio-items');

	if(sect.length == 1){
		$('.section.active').removeClass('active');
		sect.addClass('active');
		if( sect.hasClass('border-d') ){
			$('body').addClass('border-dark');
		}
	}

	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-project').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	$(window).on('load', function(){
		$('body').addClass('loaded');

		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		portfolio.shuffle();
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName );
		});

	});

	/*=========================================================================
		Navigation Functions
	=========================================================================*/
	$('.section-toggle').on('click', function(){
		var $this = $(this),
			sect = $( '#' + $this.data('section') ),
			current_sect = $('.section.active');
		if(sect.length == 1){
			if( sect.hasClass('active') == false && $('body').hasClass('section-switching') == false ){
				$('body').addClass('section-switching');
				if( sect.index() < current_sect.index() ){
					$('body').addClass('up');
				}else{
					$('body').addClass('down');
				}
				setTimeout(function(){
					$('body').removeClass('section-switching up down');
				}, 2500);
				setTimeout(function(){
					current_sect.removeClass('active');
					sect.addClass('active');
				}, 1250);
				if( sect.hasClass('border-d') ){
					$('body').addClass('border-dark');
				}else{
					$('body').removeClass('border-dark');
				}
			}
		}
	});


	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		items: 2,
		responsive:{
			992: {
				items: 2
			},
			0: {
				items: 1
			}
		}
	});





	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {

		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message

			e.preventDefault();
			var $this = $(this),

				//You can edit alerts here
				alerts = {

					success:
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",


					error:
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"

				};

			$.ajax({

				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){

					if( isJSON(data) ){

						data = $.parseJSON(data);

						if(data['error'] == false){

							$('#contact-form-result').html(alerts.success);

							$('#contact-form').trigger('reset');

						}else{

							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);

						}


					}else{
						$('#contact-form-result').html(alerts.error);
					}

				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
});


/*=========================================================================
	My Functions
=========================================================================*/
var stringaLocali = "";
var citySelezionta = "";
var configurations = ['1gram_rank1', '1gram_rank2', '2gram_rank1','2gram_rank2','1gram2gram_rank1','1gram2gram_rank2'];
var conf_selected = configurations[Math.floor(Math.random() * configurations.length)];
console.log('configuration: '+ conf_selected);

var	mapLocal = new Map();
var mapNomi = new Map();
var mapDettagli = new Map();
var mapReview1 = new Map();
var mapReview2 = new Map();
var mapReview3 = new Map();
var mapReview4 = new Map();
var mapReview5 = new Map();
var mapReviewBaseline = new Map();
var explanation1;
var explanation2;
var explanation3;
var explanation4;
var explanation5;

var mapImage = new Map();
var arraySelectedContext = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var arrayUrl1Match = [];
var arrayUrl2Match = [];
var arrayUrl3Match = [];
var arrayUrl4Match = [];
var arrayUrl5Match = [];
var datiInput;
var nome_locale;
var num_totali;
var num_spiegati=0;
var urlConsigliato;

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

firebase.initializeApp({
	apiKey: "AIzaSyCWMV37opiHQNOfbJ5MaFoQtyFhYusujaQ",
	authDomain: "experiment.firebaseapp.com",
	projectId: "experiment-64504"
});

var db = firebase.firestore();




function letturaLocali(){
    // read text from URL location
	var request = new XMLHttpRequest();
    request.open('GET', 'js/InfoorderByValue.txt');
    request.send();
	request.onreadystatechange = function () 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			stringaLocali = request.responseText;
			return request.responseText;
		}
    }
}

function letturaInfo(){
    // read text from URL location
	var urlNome = "";
	var request = new XMLHttpRequest();
    request.open('GET', 'js/urlNome.txt');
    request.send();
	request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader('Content-Type');
       	urlNome = request.responseText;
        }
		line = urlNome.toString().split('\n');
		for (var i = 0; i < line.length; i++) {
			let url = line[i].split(';')[0];
			let nome = line[i].split(';')[1];
			mapNomi.set(url,nome);
		}
    }
}

function letturaDettagli(){
    // read text from URL location
		var urlNome = "";
		var request = new XMLHttpRequest();
    request.open('GET', 'js/dettagli.txt');
    request.send();
		request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
			urlNome = request.responseText;
        }
				line = urlNome.toString().split('\n');
				for (var i = 0; i < line.length; i++) {
					let url = line[i].split(';')[0];
					let dettagli = line[i].split(';')[1]+";"+line[i].split(';')[2]+";"+line[i].split(';')[3]+";"+line[i].split(';')[4];
					mapDettagli.set(url,dettagli);
				}
    }
}

function letturaImage(){
    // read text from URL location
	var urlExplanation = "";
	var request = new XMLHttpRequest();
    request.open('GET', 'js/urlImage.txt');
    request.send();
		request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
          	urlExplanation = request.responseText;
        }
				line = urlExplanation.toString().split('\n');
				for (var i = 0; i < line.length; i++) {
					let url = line[i].split(';')[0];
					let image = line[i].split(';')[1];
					mapImage.set(url, image);
				}
    }
}

function clearAllRadios() {
	let array =[];
	var rad1 = document.getElementsByName('umore');
	var rad2 = document.getElementsByName('salute');
	var rad3 = document.getElementsByName('pasto');
	var rad4 = document.getElementsByName('giorno');
	var rad5 = document.getElementsByName('compagnia');
	array.splice(0,0,rad1,rad2,rad3,rad4,rad5);
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j].checked)
				array[i][j].checked = false;
		}
	}
	disableButtonRun('button-run');
}

function getContextActive() {
	arraySelectedContext = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	let array =[];
	let contesti = [];
	let e = document.getElementById('city');
	let city = e.options[e.selectedIndex].value;
	let rad5 = document.getElementsByName('umore');
	let rad4 = document.getElementsByName('salute');
	let rad1 = document.getElementsByName('pasto');
	let rad2 = document.getElementsByName('giorno');
	let rad3 = document.getElementsByName('compagnia');
	array.splice(0,0,rad1,rad2,rad3,rad4,rad5);
	for (var i = 0; i < 5; i++) 
	{
		for (var j = 0; j < array[i].length; j++) 
		{
			if (array[i][j].checked)
			{
				contesti.splice(1,0,array[i][j].getAttribute("id"));
				console.log(array[i][j].getAttribute("id"));
			}
		}
	}

	contesti.splice(0,0,city);

	c = getStringContext(contesti[1]);
	arraySelectedContext[getIdContext(contesti[1])] = 1;
	for (var i = 2; i < contesti.length; i++) 
	{
		c = c + ", " + getStringContext(contesti[i]);
		arraySelectedContext[getIdContext(contesti[i])] = 1;
	}
	console.log(arraySelectedContext.toString());
	console.log('contesti : ' + contesti);
	return contesti;
}

function startExplanationSystem() {
	datiInput = getContextActive();
	citySelezionta = datiInput[0].toString();
	createListLocali(citySelezionta);

	mapLocal.forEach(sameContextLocal);
	console.log("locali 1 contesto matchato: " + arrayUrl1Match.length);
	console.log("locali 2 contesto matchato: " + arrayUrl2Match.length);
	console.log("locali 3 contesto matchato: " + arrayUrl3Match.length);
	console.log("locali 4 contesto matchato: " + arrayUrl4Match.length);
	console.log("locali 5 contesto matchato: " + arrayUrl5Match.length);

	var arrayLocaliMatch = sceltaArrayUrl();

	let iRandom = getRandomUrlFromArray(arrayLocaliMatch);

	urlConsigliato = arrayLocaliMatch[iRandom];
	console.log(urlConsigliato);
	nome_locale = mapNomi.get(urlConsigliato);
	let dett = mapDettagli.get(urlConsigliato);
	document.getElementById('nome_locale').innerHTML = nome_locale;
	document.getElementById("indirizzo").innerHTML = dett.split(';')[0];
	document.getElementById("telefono").innerHTML = 'Tel: '+dett.split(';')[1];
	document.getElementById("categorie").innerHTML = 'Categoria: '+dett.split(';')[2];


	setImage(urlConsigliato);
	
	
	
	setExplanation1(datiInput,urlConsigliato);
	setExplanation2(urlConsigliato);

	arrayLocaliMatch.splice(iRandom,1);
}

function setExplanation2(url){
	// read text from URL location
	var urlExplanation = "";
	var request = new XMLHttpRequest();
    request.open('GET', 'js/'+conf_selected+'/baseline_aggregation.csv');
    request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
        }
		line = urlExplanation.toString().split('\n');
		for (var i = 0; i < line.length; i++) 
		{
			let url = line[i].split(';')[0];
			let frase = line[i].split(';')[1];
			mapReviewBaseline.set(url,frase);
		}
		for (var key of mapReviewBaseline.keys()) 
		{
			if(key === url)
			{
				var explanationBaseline = mapReviewBaseline.get(key);
				document.getElementById('explanation2').innerHTML ='Ti suggerisco il locale '+ nome_locale + ' perchè: "' + explanationBaseline + '"';
			}
		}
		if (explanation2 == undefined)
	    {
			explanation2 = "non sono state rilevate spiegazioni per questo contesto";
		}
    }
	
	
	
}

function letturaReviewUnique(contesto,url)
{
	var urlExplanation = "";
	var request = new XMLHttpRequest();
	var path = "js/"+conf_selected+"/"+contesto+"_aggregation.csv";
	request.open('GET', path);
	request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
	   	}
		var line = urlExplanation.toString().split('\n');
		for (var j = 1; j < line.length; j++) 
		{
			let url = line[j].split(';')[0];
			let frase = line[j].split(';')[1];
			mapReview1.set(url,frase);
		}
		
		for (var [key, value] of mapReview1)  
		{
			if(key === url)
			{
				var element = document.getElementById('explanation1');
				explanation1 = 'E’ un locale adatto per ' + getStringContext(contesto) + ' per questo motivo: '+ value +'. ';
				var para1 = document.createElement("p");
				var node1 = document.createTextNode(explanation1);
				para1.appendChild(node1);
				element.appendChild(para1);
	    		num_spiegati++;
				
			}
		}
	}
}

function letturaReview1(contesto,url)
{
	var urlExplanation = "";
	var request = new XMLHttpRequest();
	var path = "js/"+conf_selected+"/"+contesto+"_1phrase.csv";
	console.log(path);
	request.open('GET', path);
	request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
	   	}
		var line = urlExplanation.toString().split('\n');
		for (var j = 1; j < line.length; j++) 
		{
			let url = line[j].split(';')[0];
			let frase = line[j].split(';')[1];
			mapReview1.set(url,frase);
		}
		
		for (var [key, value] of mapReview1)  
		{
			if(key === url)
			{
				var element = document.getElementById('explanation1');
				explanation1 = 'E’ un locale adatto per ' + getStringContext(contesto) + ' per questo motivo: "'+ value +'". ';
				var para1 = document.createElement("p");
				var node1 = document.createTextNode(explanation1);
				para1.appendChild(node1);
				element.appendChild(para1);
	    		num_spiegati++;
				
			}
		}
	}
}

function letturaReview2(contesto,url)
{
	var urlExplanation = "";
	var request = new XMLHttpRequest();
	var path = "js/"+conf_selected+"/"+contesto+"_1phrase.csv";
	console.log(path);
	request.open('GET', path);
	request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
	   	}
		var line = urlExplanation.toString().split('\n');
		for (var j = 1; j < line.length; j++) 
		{
			let url = line[j].split(';')[0];
			let frase = line[j].split(';')[1];
			mapReview2.set(url,frase);
		}
		
		for (var [key, value] of mapReview2)  
		{
			if(key === url)
			{
				var element = document.getElementById('explanation1');
				var explanation2 = 'E’ un locale adatto per ' + getStringContext(contesto) + ' per questo motivo: '+ value +'. \n';
				var para1 = document.createElement("p");
				var node1 = document.createTextNode(explanation2);
				para1.appendChild(node1);
				element.appendChild(para1);
	    		num_spiegati++;
			}
		}
	}
}

function letturaReview3(contesto,url)
{
	var urlExplanation = "";
	var request = new XMLHttpRequest();
	var path = "js/"+conf_selected+"/"+contesto+"_1phrase.csv";
	console.log(path);
	request.open('GET', path);
	request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
	   	}
		var line = urlExplanation.toString().split('\n');
		for (var j = 1; j < line.length; j++) 
		{
			let url = line[j].split(';')[0];
			let frase = line[j].split(';')[1];
			mapReview3.set(url,frase);
		}
		
		for (var [key, value] of mapReview3)  
		{
			if(key === url)
			{
				var element = document.getElementById('explanation1');
				explanation3 = 'E’ un locale adatto per ' + getStringContext(contesto) + ' per questo motivo: '+ value +'. \n';
				var para1 = document.createElement("p");
				var node1 = document.createTextNode(explanation3);
				para1.appendChild(node1);
				element.appendChild(para1);
	    		num_spiegati++;
			}
		}
	}
}

function letturaReview4(contesto,url)
{
	var urlExplanation = "";
	var request = new XMLHttpRequest();
	var path = "js/"+conf_selected+"/"+contesto+"_1phrase.csv";
	console.log(path);
	request.open('GET', path);
	request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
	   	}
		var line = urlExplanation.toString().split('\n');
		for (var j = 1; j < line.length; j++) 
		{
			let url = line[j].split(';')[0];
			let frase = line[j].split(';')[1];
			mapReview4.set(url,frase);
		}
		
		for (var [key, value] of mapReview4)  
		{
			if(key === url)
			{
				var element = document.getElementById('explanation1');
				explanation4 = 'E’ un locale adatto per ' + getStringContext(contesto) + ' per questo motivo: '+ value +'. \n';
				var para1 = document.createElement("p");
				var node1 = document.createTextNode(explanation4);
				para1.appendChild(node1);
				element.appendChild(para1);
	    		num_spiegati++;
			}
		}
	}
}

function letturaReview5(contesto,url)
{
	var urlExplanation = "";
	var request = new XMLHttpRequest();
	var path = "js/"+conf_selected+"/"+contesto+"_1phrase.csv";
	console.log(path);
	request.open('GET', path);
	request.send();
	request.onreadystatechange = function() 
	{
		if (request.readyState === 4 && request.status === 200) 
		{
			var type = request.getResponseHeader('Content-Type');
			urlExplanation = request.responseText;
	   	}
		var line = urlExplanation.toString().split('\n');
		for (var j = 1; j < line.length; j++) 
		{
			let url = line[j].split(';')[0];
			let frase = line[j].split(';')[1];
			mapReview5.set(url,frase);
		}
		
		for (var [key, value] of mapReview5)  
		{
			if(key === url)
			{
				var element = document.getElementById('explanation1');
				explanation5 = 'E’ un locale adatto per ' + getStringContext(contesto) + ' per questo motivo: '+ value +'. \n';
				var para1 = document.createElement("p");
				var node1 = document.createTextNode(explanation5);
				para1.appendChild(node1);
				element.appendChild(para1);
	    		num_spiegati++;
			}
		}
	}
}

function setExplanation1(datiInput,urlConsigliato) {
	
	num_totali = datiInput.length - 1;
	
	var element = document.getElementById('explanation1');
	while (element.firstChild) 
	{
		element.removeChild(element.firstChild);
	}

	var para = document.createElement("p");
	var node = document.createTextNode('Ti suggerisco di provare '+ nome_locale + '.');
	para.appendChild(node);
	element.appendChild(para);
	
	switch (num_totali) 
	{
		case 1:
			letturaReviewUnique(datiInput[1],urlConsigliato);
			break;
		case 2:
			letturaReview1(datiInput[1],urlConsigliato);
			letturaReview2(datiInput[2],urlConsigliato);
			break;
		case 3:
			letturaReview1(datiInput[1],urlConsigliato);
			letturaReview2(datiInput[2],urlConsigliato);
			letturaReview3(datiInput[3],urlConsigliato);
			break;
		case 4:
			letturaReview1(datiInput[1],urlConsigliato);
		    letturaReview2(datiInput[2],urlConsigliato);
			letturaReview3(datiInput[3],urlConsigliato);
			letturaReview4(datiInput[4],urlConsigliato);
			break;
		case 5:
			letturaReview1(datiInput[1],urlConsigliato);
			letturaReview2(datiInput[2],urlConsigliato);
			letturaReview3(datiInput[3],urlConsigliato);
			letturaReview4(datiInput[4],urlConsigliato);
			letturaReview5(datiInput[5],urlConsigliato);
			break;
		default:
	    	explanationtot = "non sono state rilevate spiegazioni per questo contesto"
	    	var para = document.createElement("p");
	    	var node = document.createTextNode(explanationtot);
     		para.appendChild(node);
	     	element.appendChild(para);
	}

}

//log di ogni elemento nel map
function logMapElements(value, key, map) {
    console.log("m[" + key + "] = " + value);
}

//verifica che i contesti siano presenti
function sameContextLocal(value, key, map){
	var x = 0;
	for (var i = 0; i < arraySelectedContext.length; i++) {
		if (arraySelectedContext[i] == 1 && value[i] == 1){
			x++;
		}
	}
	switch (x) {
		case 1:
			arrayUrl1Match.push(key);
			break;
		case 2:
			arrayUrl2Match.push(key);
			break;
		case 3:
			arrayUrl3Match.push(key);
			break;
		case 4:
			arrayUrl4Match.push(key);
			break;
		case 5:
			arrayUrl5Match.push(key);
			break;
		default:

	}
}

function sceltaArrayUrl(){
	if (arrayUrl5Match.length != 0){
		return arrayUrl5Match;
		}else if (arrayUrl4Match.length != 0) {
			return arrayUrl4Match;
		}else if (arrayUrl3Match.length != 0) {
			return arrayUrl3Match;
		}else if (arrayUrl2Match.length != 0) {
			return arrayUrl2Match;
		}else if (arrayUrl1Match.length != 0) {
			return arrayUrl1Match;
		}else {
			alert("attenzione, nessun locale è adatto per questa situazione");
		}
}

function getRandomUrlFromArray(array){
	if (datiInput.length == 2)
	{
		if (datiInput[1] == 3||datiInput[1] == 4||datiInput[1] == 9||datiInput[1] == 10||datiInput[1] == 11||datiInput[1] == 12)
		{
			return 0;
		}
		else
		{
			var max = Math.floor((array.length - 1)/5);
			var random =Math.floor(Math.random() * (+ max - +0)) + +0;
			return random;
		}
	}
	else
	{
		var max = Math.floor((array.length - 1)/3);
		var random =Math.floor(Math.random() * (+ max - +0)) + +0;
		return random;
	}
}

function getStringContext(s){
	text = "";
	switch (s) {
		case "buonUmore" :
			text = " quando sei di buon umore ";
			break;
		case "cattivoUmore":
			text = " quando sei di cattivo umore ";
			break;
		case "feriale":
			text = " i giorni feriali ";
			break;
		case "festivo":
			text = " i giorni festivi ";
			break;
		case "salutare":
			text = " quando sei in buona salute ";
			break;
		case "nonSalutare":
			text = " quando hai problemi del tipo Allergie/Intolleranze/Diabete ";
			break;
		case "amici":
			text = " trascorrere del tempo con gli Amici ";
			break;
		case "coppia":
			text = " trascorrere del tempo in Coppia ";
			break;
		case "famiglia":
			text = " trascorrere del tempo con la famiglia ";
			break;
		case "colazione":
			text = " la colazione ";
			break;
		case "pranzo":
			text = " il pranzo ";
			break;
		case "cena":
			text = " la cena ";
			break;
		case "esigenze":
			text = " un Ricevimento ";
			break;

		default:
	}
	return text;
}

function getIdContext(s){
	switch (s) {
		case 'buonUmore':
			text = 11;
			break;
		case 'cattivoUmore':
			text = 12;
			break;
		case 'feriale':
			text = 4;
			break;
		case 'festivo':
			text = 3;
			break;
		case 'salutare':
			text = 9;
			break;
		case 'nonSalutare':
			text = 10;
			break;
		case 'amici':
			text = 2;
			break;
		case 'coppia':
			text = 1;
			break;
		case 'famiglia':
			text = 0;
			break;
		case 'colazione':
			text = 5;
			break;
		case 'pranzo':
			text = 6;
			break;
		case 'cena':
			text = 7;
			break;
		case 'esigenze':
			text = 8;
			break;
		default:
	}
	return text;
}

function createListLocali(city){
	mapLocal.clear();
	var line = stringaLocali.toString().split('\n');
	console.log(line.length);
	for (var i = 0; i < line.length; i++) {
		var localetxt = [];
		localetxt = line[i].split(";");
		url = localetxt.shift();
		cityLine = localetxt.shift();
		if (cityLine == city){
			mapLocal.set(url , localetxt);
		}
	}
	console.log("locali selezionati per città: "+ mapLocal.size);
}

function setImage(url){
	var imageContainer = document.getElementById('image_container');
	while (imageContainer.firstChild) {
			imageContainer.removeChild(imageContainer.firstChild);
	}

	let urlImage = mapImage.get(url);
	console.log('url image : ' + urlImage);
	if(urlImage == undefined){
		var img = document.createElement("img");
  	img.src = "nessuna_immagine.png";
  	document.getElementById('image_container').appendChild(img);
	}	else{
		fetch(urlImage)
		.then(res => res.blob()) // Gets the response and returns it as a blob
		.then(blob => {
			let objectURL = URL.createObjectURL(blob);
			let myImage = new Image();
			myImage.src = objectURL;
			document.getElementById('image_container').appendChild(myImage)
		});
	}

}

function controlloContesti(){
	letturaLocali();
	console.log("lunghezza "+ mapLocal.size);

	var contesti_selezionati = false;
	let array =[];
	let e = document.getElementById('city');
	let city = e.options[e.selectedIndex].value;
	let rad5 = document.getElementsByName('umore');
	let rad4 = document.getElementsByName('salute');
	let rad1 = document.getElementsByName('pasto');
	let rad2 = document.getElementsByName('giorno');
	let rad3 = document.getElementsByName('compagnia');

	array.splice(0,0,rad1,rad2,rad3,rad4,rad5);
	for (var i = 0; i < 5; i++) 
	{
		for (var j = 0; j < array[i].length; j++) 
		{
			if (array[i][j].checked)
			{
				contesti_selezionati = true;
			}
		}
	}

	if (city == "")
	{
		alert("Selezionare la Città per proseguire");
	}
	else if (contesti_selezionati == false ) 
	{
		alert("Selezionare almeno un contesto per proseguire");
	}
	else 
	{
		enableButtonRun("button-run");
		alert("Abbiamo trovato dei suggerimenti per te! \n Clicca su RUN per visualizzarli");
		letturaInfo();
		letturaDettagli();
		letturaImage();
	}

}

function enableButtonRun(id) {
            document.getElementById(id).disabled = false;
            document.getElementById(id).style.visibility = 'visible';
        }

function disableButtonRun(id) {
            document.getElementById(id).disabled = true;
						document.getElementById(id).style.visibility = 'hidden';
        }

function suggerisciAltro(){

	getConfirmation();

	console.log("proseguo");

	var arrayLocaliMatch = sceltaArrayUrl();
	let iRandom = getRandomUrlFromArray(arrayLocaliMatch);
	urlConsigliato = arrayLocaliMatch[iRandom];
	nome_locale = mapNomi.get(urlConsigliato);


	setImage(urlConsigliato);

	let dett = mapDettagli.get(urlConsigliato);
	document.getElementById('nome_locale').innerHTML = nome_locale;
	document.getElementById("indirizzo").innerHTML = dett.split(';')[0];
	document.getElementById("telefono").innerHTML = 'Tel: '+dett.split(';')[1];
	document.getElementById("categorie").innerHTML = 'Categoria: '+dett.split(';')[2];


	setExplanation1(datiInput, urlConsigliato);
	setExplanation2(urlConsigliato);
	arrayLocaliMatch.splice(iRandom,1);
	alert("Nuovo locale suggerito: \n" + nome_locale);
}

function getConfirmation() {
               var retVal = confirm("Vuoi salvare la valutazione?");
               if( retVal == true ) {
                  console.log("User wants to continue!");
									saveData();
                  return true;
               } else {
                  console.log("Non salva");
                  return false;
               }
            }
//-----------------------------------------------------------------------------
// 		saveData()
//-----------------------------------------------------------------------------
function saveData(){
	var comprensione;
	var convincimento;
	var newInfo;
	var fiducia;

	var explanationPrefer;
	document.getElementsByName('tipo').forEach(function(button) {
    if (button.checked) {
         tipo = button.getAttribute('id');
				 explanationPrefer = tipo[tipo.length-1];
    }
	});

	document.getElementsByName('comprensione').forEach(function(button) {
    if (button.checked) {
        comprensione = button.getAttribute('id')[button.getAttribute('id').length-1];
    }
	});

	document.getElementsByName('convincente').forEach(function(button) {
    if (button.checked) {
        convincimento = button.getAttribute('id')[button.getAttribute('id').length-1];
    }
	});

	document.getElementsByName('nuove').forEach(function(button) {
    if (button.checked) {
        newInfo = button.getAttribute('id')[button.getAttribute('id').length -1];
    }
	});

	document.getElementsByName('fiducia').forEach(function(button) {
    if (button.checked) {
        fiducia = button.getAttribute('id')[button.getAttribute('id').length-1];
    }
	});

	let compagnia = null;
	let umore = null;
	let giorno = null;
	let salute = null;
	let pasto = null;

	for (var i = 0; i < arraySelectedContext.length; i++) {
		if (arraySelectedContext[i] == 1){
			console.log(getStringContext(arraySelectedContext[i]));

			switch (i) {
				case 0:
					compagnia = 'famiglia';
					break;
				case 1:
					compagnia = 'coppia';
					break;
				case 2:
					compagnia = 'amici';
					break;
				case 3:
					giorno = 'festivo';
					break;
				case 4:
					giorno = 'feriale';
					break;
				case 5:
					pasto = 'colazione';
					break;
				case 6:
					pasto = 'pranzo';
					break;
				case 7:
					pasto = 'cena';
					break;
				case 8:
					pasto = 'esigenze';
					break;
				case 9:
					salute = 'salutare';
					break;
				case 10:
					salute = 'nonSalutare';
					break;
				case 11:
					umore = 'buonUmore';
					break;
				case 12:
					umore = 'cattivoUmore';
					break;
				default:

			}
		}
	}

	var data = {
		url : urlConsigliato,
		city : datiInput[0],
		umore : umore,
		giorno : giorno,
		pasto :pasto,
		compagnia :compagnia,
		salute: salute,
		contesti : num_totali,
		spiegati : num_spiegati,
		explanationPrefer : explanationPrefer,
		comprensione : comprensione,
		convincimento : convincimento,
		newInfo : newInfo,
		fiducia : fiducia
	}

writeNewPost(data);
clearAllRadios();
}

function writeNewPost(postData) {
	// Add a second document with a generated ID.
	console.log(postData.umore + postData.giorno + postData.pasto + postData.compagnia + postData.salute);
	db.collection("users").add(postData)
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});

}
