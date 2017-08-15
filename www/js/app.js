$(document).ready(function(){

	var currentPage = ".login-screen";
	var establishmentLogged = false;
	var establishmentId = "";
	var establishmentName;
	var screenSize = $(window).height();

	var latitude;
	var longitude;
	var address;
	var phoneCode;

	var birthday;
	var age;
	var userName;
	var userFullName;
	var registerId;
	
	var facebookLogged = false;

	var ibu;
	var srm;
	var alc;
	var beerName;
	var beerType;
	var hackedCont = 0;
	var brewedCont = 0;

	var devicePlatform = device.platform;

	adjustSizeMenu();	

	//Máscaras
	$.mask.definitions['~'] = "[+-]";
        $("#register-birthday").mask("99/99/9999");
        $("#add-birthday").mask("99/99/9999");
        $("#perfil-birthday").mask("99/99/9999");

    if(devicePlatform == "iOS")
    {
    	window.FirebasePlugin.grantPermission();
    }

    if(devicePlatform == "iOS")
    {
    	window.FirebasePlugin.hasPermission(function(data){
    		getPhoneCode();
		});
    }
    else
    {
    	getPhoneCode();
    }

    getGeolocation();


    	

	// Botão Login
	$(".login-button").click(function(){
		login();
	});

	// Botão Login Facebook
	$(".facebook-button").click(function()
	{
    	$(".load-screen").show(100); 	
    	fbLogin();       		   		
    });

	// Botão Cadastre-se
	$(".register-button").click(function()
	{	
		showRegisterScreen();
		if(devicePlatform == "iOS")
	    {
	    	window.FirebasePlugin.hasPermission(function(data){	    		
	    		getPhoneCode();
			});
	    }
	    else
	    {	    	
	    	getPhoneCode();
	    }	
	    getGeolocation();	
	});

	// Botão Cadastrar
	$(".new-register-button").click(function()
	{
		if(devicePlatform == "iOS")
	    {
	    	window.FirebasePlugin.hasPermission(function(data){	    		
				if(phoneCode == "")
					getPhoneCode();
			});
	    }
	    else
	    {	    	
			if(phoneCode == "")
				getPhoneCode();
	    }	

	    if(latitude == "")
				getGeolocation();	

		formatBirthday();

		$(".load-screen").show(100);		
		setTimeout(registerNewUser, 5000);
	});

	//Botão atualizar perfil
	$(".perfil-button").click(function(){
		if(devicePlatform == "iOS")
	    {
	    	window.FirebasePlugin.hasPermission(function(data){	    		
				if(phoneCode == "")
					getPhoneCode();
			});
	    }
	    else
	    {	    	
			if(phoneCode == "")
				getPhoneCode();
	    }	

	    if(latitude == "")
				getGeolocation();

		$(".load-screen").show(100);
		setTimeout(updateUserProfile, 5000);
	});

	// Botão Perfil
	$("#link-profile").click(function(){
		showProfileScreen();
	});

	// Botão Catálogo 
	$("#link-catalog").click(function(){
		showCatalogScreen();
	});

	// Botão Catálogo Garrafa
	$(".btn-bottle").click(function(){
		showCatalogScreen();
	});

	// Botão Conquistas
	$("#link-conquest").click(function()
	{
		checkConquest();
	});

	$("#link-register").click(function(){
		listRegister();
	});

	// Botão Logout para usuários logados no estabelecimento
	$(".establishmentLogoutUser").click(function(){
		userLogout();
	});

	// Botão Logout
	$("#link-logout").click(function(){
		userLogout();
	});

	// Botão Logout do estabelecimento
	$(".establishmentLogout").click(function(){
		establishmentLogout();
	});

	// Botão Rackeadas
	$("#link-hackeds").click(function(){
		showRackedScreen();
	});

	// Botão Compartilhar Facebook
	$(".share-facebook").click(function(){
		$(".beer-share-footer").hide();
		$(".share-close").hide();
		$(".side-menu").hide();

		setTimeout(function() 
		{ 
            sharePhoto("facebook");
        }, 500);
	});

	// Botão Compartilhar Instagram
	$(".share-instagram").click(function(){
		$(".beer-share-footer").hide();
		$(".share-close").hide();
		$(".side-menu").hide();

		setTimeout(function() 
		{ 
            sharePhoto("instagram");
        }, 500);
	});

	// Botão compartilhar nas redes sociais
	$(".share-result").click(function(){
		$(".beer-share-footer").hide();
		$(".share-close").hide();
		$(".side-menu").hide();

		setTimeout(function() 
		{ 
            sharePhoto("social");
        }, 500);
	});

	// Botão Birudo 
	$(".link-birudo").click(function(){
		showBirudoScreen();
	});

	// Botão Caramuru
	$(".link-caramuru").click(function(){
		showCaramuruScreen();
	});

	// Botão Darkmoon
	$(".link-darkmoon").click(function(){
		showDarkmoonScreen();
	});

	// Botão Pratipa
	$(".link-pratipa").click(function(){
		showPratipaScreen();
	});

	// Botão HeyJoe
	$(".link-heyjoe").click(function(){
		showHeyjoeScreen();
	});

	// Botão Caprico
	$(".link-caprico").click(function(){
		showCapricoScreen();
	});

	// Botão Conclave
	$(".link-conclave").click(function(){
		showConclaveScreen();
	});

	// Botão Garotinho
	$(".link-garotinho").click(function(){
		showGarotinhoScreen();
	});

	// Botão Hack Conclave
	$("#conclave-hack-button").click(function(){
		ibu = "21,2";
		srm = "16";
		alc = "5,3";
		showConclaveHackingScreen();
	});

	// Botão Envia Resultado Conclave
	$(".conclave-brew").click(function(){
		showConclaveResultScreen();
	});	

	// Botão Salvar Resultado Conclave
	$(".btn-send-conclave").click(function(){
		beerName = "Conclave";
		beerType = "Rauchbier";
		takeScreenshot();
	});

	// Botão Hack Birudo
	$("#birudo-hack-button").click(function(){
		ibu = "17,3";
		srm = "3,5";
		alc = "5,9";
		showBirudoHackingScreen();
	});

	// Botão Envia Resultado Birudo
	$(".birudo-brew").click(function(){
		showBirudoResultScreen();
	});	

	// Botão Salvar Resultado Birudo
	$(".btn-send-birudo").click(function(){
		beerName = "Birudo";
		beerType = "Witbier";
		takeScreenshot();
	});

	// Botão Hack Caramuru
	$("#caramuru-hack-button").click(function(){
		ibu = "18";
		srm = "10";
		alc = "4,2";
		showCaramuruHackingScreen();
	});

	// Botão Envia Resultado Caramuru
	$(".caramuru-brew").click(function(){
		showCaramuruResultScreen();
	});	

	// Botão Salvar Resultado Caramuru
	$(".btn-send-caramuru").click(function(){
		beerName = "Caramuru";
		beerType = "Vienna Lager";
		takeScreenshot();
	});

	// Botão Hack DARKMOON
	$("#darkmoon-hack-button").click(function(){
		ibu = "35";
		srm = "33";
		alc = "6,25";
		showDarkmoonHackingScreen();
	});

	// Botão Envia Resultado Darkmoon
	$(".darkmoon-brew").click(function(){
		showDarkmoonResultScreen();
	});	

	// Botão Salvar Resultado Darkmoon
	$(".btn-send-darkmoon").click(function(){
		beerName = "Darkmoon";
		beerType = "Foreing Extra Stout";
		takeScreenshot();
	});

	// Botão Hack Pratipa
	$("#pratipa-hack-button").click(function(){
		ibu = "65,2";
		srm = "10";
		alc = "6";
		showPratipaHackingScreen();
	});

	// Botão Envia Resultado Pratipa
	$(".pratipa-brew").click(function(){
		showPratipaResultScreen();
	});	

	// Botão Salvar Resultado Pratipa
	$(".btn-send-pratipa").click(function(){
		beerName = "Pratipa";
		beerType = "India Pale Ale";
		takeScreenshot();
	});

	// Botão Hack Heyjoe
	$("#heyjoe-hack-button").click(function(){
		ibu = "21,8";
		srm = "5";
		alc = "5";
		showHeyjoeHackingScreen();
	});

	// Botão Envia Resultado Heyjoe
	$(".heyjoe-brew").click(function(){
		showHeyjoeResultScreen();
	});	

	// Botão Salvar Resultado Heyjoe
	$(".btn-send-heyjoe").click(function(){
		beerName = "Hey Joe";
		beerType = "India Pale Ale";
		takeScreenshot();
	});

	// Botão Hack Caprico
	$("#caprico-hack-button").click(function(){
		ibu = "15";
		srm = "15";
		alc = "6,5";
		showCapricoHackingScreen();
	});

	// Botão Envia Resultado Caprico
	$(".caprico-brew").click(function(){
		showCapricoResultScreen();
	});	

	// Botão Salvar Resultado Caprico
	$(".btn-send-caprico").click(function(){
		beerName = "Capricó";
		beerType = "Weizenbock";
		takeScreenshot();
	});

	// Botão Hack Garotinho
	$("#garotinho-hack-button").click(function(){
		ibu = "20,1";
		srm = "13";
		alc = "4,8";
		showGarotinhoHackingScreen();
	});

	// Botão Envia Resultado Garotinho
	$(".garotinho-brew").click(function(){
		showGarotinhoResultScreen();
	});	

	// Botão Salvar Resultado Garotinho
	$(".btn-send-garotinho").click(function(){
		beerName = "Garotinho";
		beerType = "Märzen Oktoberfest";
		takeScreenshot();
	});

	// Fecha a tela de Compartilhamento
	$(".share-close").click(function(){
		showCatalogScreen();
	});

	// Abre e fecha menu lateral
	$("#icon-menu").click(function(){
		adjustSizeMenu();
		if($("#check-menu").is(":checked"))
		{
			$("#bar-menu").animate({left:"-300px"}, 200);			
			
			if(currentPage == ".beer-categories-screen" || currentPage == ".caramuru-screen" ||
				currentPage == ".pratipa-screen" || currentPage == ".conclave-screen" ||
				currentPage == ".conclave-hacking-screen" || 
				currentPage == ".conclave-result-screen" ||
				currentPage == ".conclave-share-screen" || currentPage == ".conquest-screen" ||
				currentPage == ".hacked-screen" || currentPage == ".birudo-hacking-screen" || 
				currentPage == ".birudo-result-screen" ||
				currentPage == ".birudo-share-screen" || currentPage == ".caramuru-hacking-screen" || 
				currentPage == ".caramuru-result-screen" ||
				currentPage == ".caramuru-share-screen" || currentPage == ".pratipa-hacking-screen" || 
				currentPage == ".pratipa-result-screen" ||
				currentPage == ".pratipa-share-screen" || currentPage == ".heyjoe-hacking-screen" || 
				currentPage == ".heyjoe-result-screen" || currentPage == ".heyjoe-share-screen"
				|| currentPage == ".garotinho-hacking-screen" || 
				currentPage == ".garotinho-result-screen" || currentPage == ".garotinho-share-screen"
				|| currentPage == ".register-list-screen" || currentPage == ".register-form-screen")
				$("#icon-menu").css("color","#000");

			else if(currentPage == ".birudo-screen" || currentPage == ".darkmoon-screen" || 
				currentPage == ".heyjoe-screen" || currentPage == ".caprico-screen" || 
				currentPage == ".garotinho-screen" || currentPage == ".perfil-screen" || 
				currentPage == ".caprico-hacking-screen" || currentPage == ".caprico-result-screen" || 
				currentPage == ".caprico-share-screen" || currentPage == ".darkmoon-hacking-screen" || 
				currentPage == ".darkmoon-result-screen" ||
				currentPage == ".darkmoon-share-screen")
				$("#icon-menu").css("color","#fff");
			else			
				$("#icon-menu").css("color","#fff");
			
		}
		else
		{
			$("#bar-menu").animate({left:"0"}, 200);			
			$("#icon-menu").css("color","#555");
		}
	}); 

    // Fechar menu lateral ao clicar em links
    $("#nav-menu a").click(function(){
    	$("#check-menu").prop('checked', false);
    	$("#bar-menu").animate({left:"-300px"}, 200);         
        $("#icon-menu").css("color","#fff");     		
        
        if(currentPage == ".beer-categories-screen" || currentPage == ".caramuru-screen" ||
        	currentPage == ".pratipa-screen" || currentPage == ".conclave-screen" || 
        	currentPage == ".garotinho-screen" || currentPage == ".conclave-hacking-screen" ||
        	currentPage == ".conclave-result-screen" || currentPage == ".conclave-share-screen" ||
        	currentPage == ".conquest-screen" || currentPage == ".hacked-screen" || 
        	currentPage == ".birudo-hacking-screen" || currentPage == ".birudo-result-screen" ||
			currentPage == ".birudo-share-screen" || currentPage == ".caramuru-hacking-screen" || 
			currentPage == ".caramuru-result-screen" || currentPage == ".caramuru-share-screen" || 
			currentPage == ".pratipa-hacking-screen" || 
			currentPage == ".pratipa-result-screen" || currentPage == ".pratipa-share-screen" || 
        	currentPage == ".heyjoe-hacking-screen" || currentPage == ".heyjoe-result-screen" ||
			currentPage == ".heyjoe-share-screen" || 
        	currentPage == ".garotinho-hacking-screen" || currentPage == ".garotinho-result-screen" ||
			currentPage == ".garotinho-share-screen" || currentPage == ".register-list-screen" || 
			currentPage == ".register-form-screen")
        {
        	$(".top-menu").css("color","#000");
        	$("#icon-menu").css("color","#000");
        }
        else if(currentPage == ".birudo-screen" || currentPage == ".darkmoon-screen" || 
        	currentPage == ".heyjoe-screen" || currentPage == ".caprico-screen" ||
        	currentPage == ".perfil-screen" || 
        	currentPage == ".caprico-hacking-screen" || currentPage == ".caprico-result-screen" ||
			currentPage == ".caprico-share-screen" || 
        	currentPage == ".darkmoon-hacking-screen" || currentPage == ".darkmoon-result-screen" ||
			currentPage == ".darkmoon-share-screen")
        {
        	$(".top-menu").css("color","#fff");
        	$("#icon-menu").css("color","#fff");
        }
        startPoint();
    });

	// IBU Conclave Slider
    $(".conclave-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".conclave-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#conclave-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Conclave Slider
    $(".conclave-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".conclave-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#conclave-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".conclave-srm-hacking").val() <=120)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l12.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l12.png");
				$(".beer-share-cup img").attr("src","img/conclave-l12.png");
			}
			else if($(".conclave-srm-hacking").val() <=130)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l13.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l13.png");
				$(".beer-share-cup img").attr("src","img/conclave-l13.png");
			}
			else if($(".conclave-srm-hacking").val() <=140)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l14.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l14.png");
				$(".beer-share-cup img").attr("src","img/conclave-l14.png");
			}
			else if($(".conclave-srm-hacking").val() <=150)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l15.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l15.png");
				$(".beer-share-cup img").attr("src","img/conclave-l15.png");
			}
			else if($(".conclave-srm-hacking").val() <=160)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l16.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l16.png");
				$(".beer-share-cup img").attr("src","img/conclave-l16.png");
			}
			else if($(".conclave-srm-hacking").val() <=170)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l17.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l17.png");
				$(".beer-share-cup img").attr("src","img/conclave-l17.png");
			}
			else if($(".conclave-srm-hacking").val() <=180)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l18.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l18.png");
				$(".beer-share-cup img").attr("src","img/conclave-l18.png");
			}
			else if($(".conclave-srm-hacking").val() <=190)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l19.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l19.png");
				$(".beer-share-cup img").attr("src","img/conclave-l19.png");
			}
			else if($(".conclave-srm-hacking").val() <=200)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l20.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l20.png");
				$(".beer-share-cup img").attr("src","img/conclave-l20.png");
			}
			else if($(".conclave-srm-hacking").val() <=210)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l21.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l21.png");
				$(".beer-share-cup img").attr("src","img/conclave-l21.png");
			}
			else if($(".conclave-srm-hacking").val() <=220)
			{
				$(".conclave-color-hacking").attr("src","img/conclave-l22.png");
				$(".conclave-result-image img").attr("src","img/conclave-result-l22.png");
				$(".beer-share-cup img").attr("src","img/conclave-l22.png");
			}
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Conclave Slider
    $(".conclave-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".conclave-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#conclave-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Birudo Slider
    $(".birudo-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".birudo-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#birudo-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Birudo Slider
    $(".birudo-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".birudo-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#birudo-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".birudo-srm-hacking").val() <=200)
			{
				$(".birudo-color-hacking").attr("src","img/birudo-l2.png");
				$(".birudo-result-image img").attr("src","img/birudo-result-l2.png");
				$(".beer-share-cup img").attr("src","img/birudo-l2.png");
			}		
			else if($(".birudo-srm-hacking").val() <=300)
			{
				$(".birudo-color-hacking").attr("src","img/birudo-l3.png");
				$(".birudo-result-image img").attr("src","img/birudo-result-l3.png");
				$(".beer-share-cup img").attr("src","img/birudo-l3.png");
			}	
			else if($(".birudo-srm-hacking").val() <=350)
			{
				$(".birudo-color-hacking").attr("src","img/birudo-l4.png");
				$(".birudo-result-image img").attr("src","img/birudo-result-l4.png");
				$(".beer-share-cup img").attr("src","img/birudo-l4.png");
			}	
			else if($(".birudo-srm-hacking").val() <=400)
			{
				$(".birudo-color-hacking").attr("src","img/birudo-l5.png");
				$(".birudo-result-image img").attr("src","img/birudo-result-l5.png");
				$(".beer-share-cup img").attr("src","img/birudo-l5.png");
			}		
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Birudo Slider
    $(".birudo-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".birudo-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#birudo-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Caramuru Slider
    $(".caramuru-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".caramuru-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#caramuru-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Caramuru Slider
    $(".caramuru-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".caramuru-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#caramuru-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".caramuru-srm-hacking").val() <=100)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l10.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l10.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l10.png");
			}	
			else if($(".caramuru-srm-hacking").val() <=110)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l11.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l11.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l11.png");
			}	
			else if($(".caramuru-srm-hacking").val() <=120)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l12.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l12.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l12.png");
			}
			else if($(".caramuru-srm-hacking").val() <=130)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l10.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l13.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l13.png");
			}
			else if($(".caramuru-srm-hacking").val() <=140)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l14.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l14.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l14.png");
			}	
			else if($(".caramuru-srm-hacking").val() <=150)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l15.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l15.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l15.png");
			}	
			else if($(".caramuru-srm-hacking").val() <=160)
			{
				$(".caramuru-color-hacking").attr("src","img/caramuru-l16.png");
				$(".caramuru-result-image img").attr("src","img/caramuru-result-l16.png");
				$(".beer-share-cup img").attr("src","img/caramuru-l16.png");
			}					
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Caramuru Slider
    $(".caramuru-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".caramuru-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#caramuru-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Darkmoon Slider
    $(".darkmoon-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".darkmoon-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#darkmoon-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Darkmoon Slider
    $(".darkmoon-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".darkmoon-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#darkmoon-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".darkmoon-srm-hacking").val() <=300)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l30.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l30.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l30.png");
			}
			else if($(".darkmoon-srm-hacking").val() <=310)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l31.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l31.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l31.png");
			}		
			else if($(".darkmoon-srm-hacking").val() <=320)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l32.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l32.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l32.png");
			}
			else if($(".darkmoon-srm-hacking").val() <=330)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l33.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l33.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l33.png");
			}	
			else if($(".darkmoon-srm-hacking").val() <=340)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l34.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l34.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l34.png");
			}	
			else if($(".darkmoon-srm-hacking").val() <=350)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l35.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l35.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l35.png");
			}	
			else if($(".darkmoon-srm-hacking").val() <=360)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l36.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l36.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l36.png");
			}	
			else if($(".darkmoon-srm-hacking").val() <=370)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l37.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l37.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l37.png");
			}	
			else if($(".darkmoon-srm-hacking").val() <=380)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l38.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l38.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l38.png");
			}
			else if($(".darkmoon-srm-hacking").val() <=390)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l39.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l39.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l39.png");
			}
			else if($(".darkmoon-srm-hacking").val() <=400)
			{
				$(".darkmoon-color-hacking").attr("src","img/darkmoon-l40.png");
				$(".darkmoon-result-image img").attr("src","img/darkmoon-result-l40.png");
				$(".beer-share-cup img").attr("src","img/darkmoon-l40.png");
			}								
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Darkmoon Slider
    $(".darkmoon-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".darkmoon-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#darkmoon-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Pratipa Slider
    $(".pratipa-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".pratipa-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#pratipa-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Pratipa Slider
    $(".pratipa-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".pratipa-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#pratipa-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".pratipa-srm-hacking").val() <=80)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l8.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l8.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l8.png");
			}
			else if($(".pratipa-srm-hacking").val() <=90)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l9.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l9.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l9.png");
			}	
			else if($(".pratipa-srm-hacking").val() <=100)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l10.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l10.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l10.png");
			}	
			else if($(".pratipa-srm-hacking").val() <=110)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l11.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l11.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l11.png");
			}	
			else if($(".pratipa-srm-hacking").val() <=120)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l12.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l12.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l12.png");
			}	
			else if($(".pratipa-srm-hacking").val() <=130)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l13.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l13.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l13.png");
			}	
			else if($(".pratipa-srm-hacking").val() <=140)
			{
				$(".pratipa-color-hacking").attr("src","img/pratipa-l14.png");
				$(".pratipa-result-image img").attr("src","img/pratipa-result-l14.png");
				$(".beer-share-cup img").attr("src","img/pratipa-l14.png");
			}							
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Pratipa Slider
    $(".pratipa-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".pratipa-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#pratipa-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Heyjoe Slider
    $(".heyjoe-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".heyjoe-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#heyjoe-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Heyjoe Slider
    $(".heyjoe-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".heyjoe-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#heyjoe-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".heyjoe-srm-hacking").val() <=20)
			{
				$(".heyjoe-color-hacking").attr("src","img/heyjoe-l2.png");
				$(".heyjoe-result-image img").attr("src","img/heyjoe-result-l2.png");
				$(".beer-share-cup img").attr("src","img/heyjoe-l2.png");
			}	
			else if($(".heyjoe-srm-hacking").val() <=30)
			{
				$(".heyjoe-color-hacking").attr("src","img/heyjoe-l3.png");
				$(".heyjoe-result-image img").attr("src","img/heyjoe-result-l3.png");
				$(".beer-share-cup img").attr("src","img/heyjoe-l3.png");
			}	
			else if($(".heyjoe-srm-hacking").val() <=40)
			{
				$(".heyjoe-color-hacking").attr("src","img/heyjoe-l4.png");
				$(".heyjoe-result-image img").attr("src","img/heyjoe-result-l4.png");
				$(".beer-share-cup img").attr("src","img/heyjoe-l4.png");
			}
			else if($(".heyjoe-srm-hacking").val() <=50)
			{
				$(".heyjoe-color-hacking").attr("src","img/heyjoe-l5.png");
				$(".heyjoe-result-image img").attr("src","img/heyjoe-result-l5.png");
				$(".beer-share-cup img").attr("src","img/heyjoe-l5.png");
			}
			else if($(".heyjoe-srm-hacking").val() <=60)
			{
				$(".heyjoe-color-hacking").attr("src","img/heyjoe-l6.png");
				$(".heyjoe-result-image img").attr("src","img/heyjoe-result-l6.png");
				$(".beer-share-cup img").attr("src","img/heyjoe-l6.png");
			}										
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Heyjoe Slider
    $(".heyjoe-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".heyjoe-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#heyjoe-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Caprico Slider
    $(".caprico-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".caprico-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#caprico-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Caprico Slider
    $(".caprico-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".caprico-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#caprico-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".caprico-srm-hacking").val() <= 120)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l12.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l12.png");
				$(".beer-share-cup img").attr("src","img/caprico-l12.png");
			}		
			else if($(".caprico-srm-hacking").val() <= 130)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l13.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l13.png");
				$(".beer-share-cup img").attr("src","img/caprico-l13.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 140)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l14.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l14.png");
				$(".beer-share-cup img").attr("src","img/caprico-l14.png");
			}
			else if($(".caprico-srm-hacking").val() <= 150)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l15.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l15.png");
				$(".beer-share-cup img").attr("src","img/caprico-l15.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 160)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l16.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l16.png");
				$(".beer-share-cup img").attr("src","img/caprico-l16.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 170)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l17.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l17.png");
				$(".beer-share-cup img").attr("src","img/caprico-l17.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 180)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l18.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l18.png");
				$(".beer-share-cup img").attr("src","img/caprico-l18.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 190)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l19.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l19.png");
				$(".beer-share-cup img").attr("src","img/caprico-l19.png");
			}
			else if($(".caprico-srm-hacking").val() <= 200)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l20.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l20.png");
				$(".beer-share-cup img").attr("src","img/caprico-l20.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 210)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l21.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l21.png");
				$(".beer-share-cup img").attr("src","img/caprico-l21.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 220)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l22.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l22.png");
				$(".beer-share-cup img").attr("src","img/caprico-l22.png");
			}		
			else if($(".caprico-srm-hacking").val() <= 230)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l23.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l23.png");
				$(".beer-share-cup img").attr("src","img/caprico-l23.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 240)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l24.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l24.png");
				$(".beer-share-cup img").attr("src","img/caprico-l24.png");
			}	
			else if($(".caprico-srm-hacking").val() <= 250)
			{
				$(".caprico-color-hacking").attr("src","img/caprico-l25.png");
				$(".caprico-result-image img").attr("src","img/caprico-result-l25.png");
				$(".beer-share-cup img").attr("src","img/caprico-l25.png");
			}													
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Caprico Slider
    $(".caprico-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".caprico-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#caprico-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// IBU Garotinho Slider
    $(".garotinho-ibu-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'ibu__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	ibu = ""+($(".garotinho-ibu-hacking").val() / 10)+"";
    		var newIbu = ibu.replace(".",",");
			$('#garotinho-ibu').html(newIbu);
			$('.beer-result-ibu-num').html(newIbu);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// SRM Garotinho Slider
    $(".garotinho-srm-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'srm__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	srm = ""+($(".garotinho-srm-hacking").val() / 10)+"";
    		var newSrm = srm.replace(".",",");
			$('#garotinho-srm').html(newSrm);
			$('.beer-result-srm-num').html(newSrm);
			
			if($(".garotinho-srm-hacking").val() <= 70)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l7.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l7.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l7.png");
			}
			else if($(".garotinho-srm-hacking").val() <= 80)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l8.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l8.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l8.png");
			}	
			else if($(".garotinho-srm-hacking").val() <= 90)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l9.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l9.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l9.png");
			}	
			else if($(".garotinho-srm-hacking").val() <= 100)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l10.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l10.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l10.png");
			}	
			else if($(".garotinho-srm-hacking").val() <= 110)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l11.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l11.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l11.png");
			}	
			else if($(".garotinho-srm-hacking").val() <= 120)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l12.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l12.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l12.png");
			}
			else if($(".garotinho-srm-hacking").val() <= 130)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l13.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l13.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l13.png");
			}				
			else if($(".garotinho-srm-hacking").val() <= 140)
			{
				$(".garotinho-color-hacking").attr("src","img/garotinho-l14.png");
				$(".garotinho-result-image img").attr("src","img/garotinho-result-l14.png");
				$(".beer-share-cup img").attr("src","img/garotinho-l14.png");
			}												
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

	// ALC Garotinho Slider
    $(".garotinho-alc-hacking").rangeslider({
	    polyfill: false,

	    handleClass: 'alc__handle',

	    // Callback function
	    onInit: function() {},
	    // Callback function
	    onSlide: function(position, value) {
	    	alc = ""+($(".garotinho-alc-hacking").val() / 10)+"";
    		var newAlc = alc.replace(".",",");
			$('#garotinho-alc').html(newAlc);
			$('.beer-result-alc-num').html(newAlc);
	    },
	    // Callback function
	    onSlideEnd: function(position, value) {}
	});

    // Mostra tela de boas vindas
	function showWelcomeScreen()
	{		
		$(".establishement-bar").hide();

		currentPage = ".welcome-screen";

		$("#logged_username").html(userName);
		$(".beer-result-username").html(userName);
		$(".title-menu span").html(userFullName);

		$("body").css({"background-image":"none","background-color":"#3f3f3f"});

		$(".login-screen").hide(200);
		$(".welcome-screen").show(200);
		$(".side-menu").show(200);
		startPoint();
		if(establishmentLogged == true || facebookLogged == true)
		{
			if(establishmentLogged)
				$(".establishmentLogoutUser").show();
			$("#link-profile").hide();
			$("#link-register").hide();
			$("#link-media").hide();
			$("#link-notification").hide();
		}
		else
		{
			if(!establishmentLogged)
				$(".establishmentLogoutUser").hide();
			$("#link-profile").show();
		}

		getPhoneCodeInLogin(); 
	}

	// Mostra tela de Cadastro
	function showRegisterScreen()
	{	
		$(currentPage).hide(200);			
		$(".register-screen").show(200);
		currentPage = ".register-screen";			
		startPoint();		
	}

	// Mostra tela de Login
	function showLoginScreen()
	{
		$("body").css({"background-image":"url('img/login-bg.png')","background-color":"#3f3f3f"});
		$(currentPage).hide(200);		
		$(".login-screen").show(200);
		currentPage = ".login-screen";	

		$(".top-menu").css({"background-color":"#3f3f3f", "color":"#fff"});
		$(".top-menu-right span").html("");
		$(".side-menu").hide();


		$("#register-name").val("");        			
		$("#register-email").val("");
		$("#register-birthday").val("");
		$("#register-user").val("");
		$("#register-pass").val("");
		$("#register-confirmpass").val("");

		if(establishmentLogged == true)
		{
			$(".establishement-bar").show();
		}
		else
		{
			$(".establishement-bar").hide();
		}	
		startPoint();
	}

	// Mostra tela de perfil de usuário
	function showProfileScreen()
	{	
		$(".load-screen").show(100);
		$.ajax({
				type: "POST",
				url: "http://pixside.com.br/beerscript-service/getUserData.php", 
				data: {
					action: 'GetData',
					userId: registerId
				},            
				async: false,
				dataType: "json", 
				success: function (json) {		            	
					if(json.result == true)
					{        
						$("#perfil-name").val(json.data.name); 
						$("#perfil-birthday").val(json.data.birthday);
						$("#perfil-email").val(json.data.email);						
						$("#perfil-user").val(json.data.user);	
						$("#add-pass").val("");	

						$(".load-screen").hide(100);
						$("body").css({"background-color":"#3f3f3f"});
						$(".top-menu").css({"background-color":"#3f3f3f", "color":"#fff"});
						$(".top-menu-right span").html("Perfil");
						$(currentPage).hide(200);		
						$(".perfil-screen").show(200);
						currentPage = ".perfil-screen";		
						startPoint();							                        					    
					}
					else
					{
						errorFieldMessage(json.msg, "Desculpe");
						$(".load-screen").hide(100);
					}
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").fadeOut(100);        
			}
		}); 			
	}

	// Mostra a tela de Catálogo
	function showCatalogScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});
		$("#check-menu").css("color", "#000");
		$(".top-menu-right span").html("Catálogo");
		$(currentPage).hide(200);		
		$(".beer-categories-screen").show(200);
		currentPage = ".beer-categories-screen";		
		startPoint();
	}

	// Mostra a tela de Conquistas
	function showConquestScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});
		$(".top-menu-right span").html("Conquistas");

		if(hackedCont >=1)
		{
			$(".conquest-badges#conquestA").css("opacity", "1.0");
		}
		if(hackedCont >=8)
		{
			$(".conquest-badges#conquestA").css("opacity", "1.0");
			$(".conquest-badges#conquestB").css("opacity", "1.0");
		}
		if(hackedCont >=10 && brewedCont >=1)
		{
			$(".conquest-badges#conquestA").css("opacity", "1.0");
			$(".conquest-badges#conquestB").css("opacity", "1.0");
			$(".conquest-badges#conquestC").css("opacity", "1.0");
		}
		if(hackedCont >=10 && brewedCont >=2)
		{
			$(".conquest-badges#conquestA").css("opacity", "1.0");
			$(".conquest-badges#conquestB").css("opacity", "1.0");
			$(".conquest-badges#conquestC").css("opacity", "1.0");
			$(".conquest-badges#conquestD").css("opacity", "1.0");
		}

		$("#hacked-beers-number").html(hackedCont);
		$("#brewed-beers-number").html(brewedCont);


		$(currentPage).hide(200);		
		$(".conquest-screen").show(200);
		currentPage = ".conquest-screen";		
		startPoint();
	}

	// Mostra a tela de Raqueadas
	function showRackedScreen()
	{
		$(".load-screen").show(100);
		$.ajax({
				type: "POST",
				url: "http://pixside.com.br/beerscript-service/hackedHistory.php", 
				data: {
					action: 'Hackeadas',
					id: registerId
				},            
				async: false,
				dataType: "json", 
				success: function (json) {		            	
				           	
				    if (json.length > 0)
				    {
						$(".hacked-accordion").html("");				
						var cont = 0;
				  		$.each(json, function(i, obj){
				  			var title = obj.hacked_beer;				  			
				  			var subtitle = obj.hacked_beer_type;
				  			var image = obj.hacked_image;

				  			//remove espaços dos nomes
				  			var nameId = title.replace(/\s/g,'');
				  			//adiciona números aos nomes para usar como id unico
				  			nameId = nameId+""+cont;

				  			$(".hacked-accordion").append("<div class='panel-heading beer' role='tab' id='"+nameId+"-title'><h4 class='panel-title'><div role='button' data-toggle='collapse' data-parent='#hacked-accordion' data-target='#"+nameId+"-content' aria-expanded='false'><div class='hacked-title'>"+title+" </div><div class='hacked-subtitle'> "+subtitle+" </div></div></h4></div><div id='"+nameId+"-content' class='panel-collapse collapse' role='tabpanel' aria-labelledby='"+nameId+"-title'><div class='panel-body beer'><img src='"+image+"' style='width:100%;margin:0'></div></div>");	  			
				  			cont++;
				  		});			  			
					}
					else
					{
						$(".hacked-accordion").html("");
						$(".hacked-accordion").append("<h3 style='padding: 30px'> Nenhuma cerveja hackeada. </h3>");
					}
					
					$(".load-screen").hide(100);	

					$("body").css("background-color", "#f8f8f8");
					$(".top-menu").css({"background-color":"#fff", "color":"#000"});
					$(".top-menu-right span").html("Hackeadas");
					$(currentPage).hide(200);
					$(".hacked-screen").show(200);
					currentPage = ".hacked-screen";		
					startPoint();                       					    
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").hide(100);        
			}
		});		
	}

	// Mostra a tela da cerveja Birudô
	function showBirudoScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#fff"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".birudo-screen").show(200);
		currentPage = ".birudo-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});

		var bgHeight = $(".beer-bg img").height() / 3 - 10;
		$(".beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".birudo-screen .beer-title").height() + $(".birudo-screen .beer-bg img").height() - 20;
			$(".birudo-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".birudo-screen .beer-title").height() + $(".birudo-screen .beer-bg img").height() - 160;
			$(".birudo-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".birudo-screen .beer-title").height() + $(".birudo-screen .beer-bg img").height() - 230;
			$(".birudo-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Caramuru
	function showCaramuruScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".caramuru-screen").show(200);
		currentPage = ".caramuru-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});

		var bgHeight = $(".caramuru-screen .beer-bg img").height() / 3 - 10;
		$(".caramuru-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".caramuru-screen .beer-title").height() + $(".caramuru-screen .beer-bg img").height() - 20;
			$(".caramuru-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".caramuru-screen .beer-title").height() + $(".caramuru-screen .beer-bg img").height() - 160;
			$(".caramuru-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".caramuru-screen .beer-title").height() + $(".caramuru-screen .beer-bg img").height() - 230;
			$(".caramuru-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Darkmoon
	function showDarkmoonScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".darkmoon-screen").show(200);
		currentPage = ".darkmoon-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});

		var bgHeight = $(".darkmoon-screen .beer-bg img").height() / 3 - 10;
		$(".darkmoon-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".darkmoon-screen .beer-title").height() + $(".darkmoon-screen .beer-bg img").height() - 20;
			$(".darkmoon-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".darkmoon-screen .beer-title").height() + $(".darkmoon-screen .beer-bg img").height() - 160;
			$(".darkmoon-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".darkmoon-screen .beer-title").height() + $(".darkmoon-screen .beer-bg img").height() - 230;
			$(".darkmoon-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Pratipa
	function showPratipaScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".pratipa-screen").show(200);
		currentPage = ".pratipa-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});

		var bgHeight = $(".pratipa-screen .beer-bg img").height() / 3 - 10;
		$(".pratipa-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".pratipa-screen .beer-title").height() + $(".pratipa-screen .beer-bg img").height() - 20;
			$(".pratipa-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".pratipa-screen .beer-title").height() + $(".pratipa-screen .beer-bg img").height() - 160;
			$(".pratipa-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".pratipa-screen .beer-title").height() + $(".pratipa-screen .beer-bg img").height() - 230;
			$(".pratipa-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Hey Joe
	function showHeyjoeScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".heyjoe-screen").show(200);
		currentPage = ".heyjoe-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});

		var bgHeight = $(".heyjoe-screen .beer-bg img").height() / 3 - 10;
		$(".heyjoe-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".heyjoe-screen .beer-title").height() + $(".heyjoe-screen .beer-bg img").height() - 20;
			$(".heyjoe-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".heyjoe-screen .beer-title").height() + $(".heyjoe-screen .beer-bg img").height() - 160;
			$(".heyjoe-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".heyjoe-screen .beer-title").height() + $(".heyjoe-screen .beer-bg img").height() - 230;
			$(".heyjoe-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Capricó
	function showCapricoScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".caprico-screen").show(200);
		currentPage = ".caprico-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});

		var bgHeight = $(".caprico-screen .beer-bg img").height() / 3 - 10;
		$(".caprico-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".caprico-screen .beer-title").height() + $(".caprico-screen .beer-bg img").height() - 20;
			$(".caprico-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".caprico-screen .beer-title").height() + $(".caprico-screen .beer-bg img").height() - 160;
			$(".caprico-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".caprico-screen .beer-title").height() + $(".caprico-screen .beer-bg img").height() - 230;
			$(".caprico-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Conclave
	function showConclaveScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".conclave-screen").show(200);
		currentPage = ".conclave-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});

		var bgHeight = $(".conclave-screen .beer-bg img").height() / 3 - 10;
		$(".conclave-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".conclave-screen .beer-title").height() + $(".conclave-screen .beer-bg img").height() - 20;
			$(".conclave-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".conclave-screen .beer-title").height() + $(".conclave-screen .beer-bg img").height() - 160;
			$(".conclave-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".conclave-screen .beer-title").height() + $(".conclave-screen .beer-bg img").height() - 230;
			$(".conclave-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela da cerveja Garotinho
	function showGarotinhoScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".garotinho-screen").show(200);
		currentPage = ".garotinho-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});

		var bgHeight = $(".garotinho-screen .beer-bg img").height() / 3 - 10;
		$(".garotinho-screen .beer-title").css("margin-top", -bgHeight);

		if(screenSize < 1024)
		{
			var titleHeight = $(".garotinho-screen .beer-title").height() + $(".garotinho-screen .beer-bg img").height() - 20;
			$(".garotinho-screen .beer-description").css("top", titleHeight);
		}
		else if(screenSize < 1300)
		{
			var titleHeight = $(".garotinho-screen .beer-title").height() + $(".garotinho-screen .beer-bg img").height() - 160;
			$(".garotinho-screen .beer-description").css("top", titleHeight);
		}
		else
		{
			var titleHeight = $(".garotinho-screen .beer-title").height() + $(".garotinho-screen .beer-bg img").height() - 230;
			$(".garotinho-screen .beer-description").css("top", titleHeight);
		}
	}

	// Mostra a tela de hack da cerveja Conclave
	function showConclaveHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size: 2em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".conclave-hacking-screen").show(200);
		currentPage = ".conclave-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Conclave
	function showConclaveResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".conclave-result-screen").show(200);
		currentPage = ".conclave-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Conclave
	function showConclaveShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".conclave-share-screen").show(200);
		currentPage = ".conclave-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de hack da cerveja Birudo
	function showBirudoHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".birudo-hacking-screen").show(200);
		currentPage = ".birudo-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Birudo
	function showBirudoResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".birudo-result-screen").show(200);
		currentPage = ".birudo-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Birudo
	function showBirudoShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".birudo-share-screen").show(200);
		currentPage = ".birudo-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de hack da cerveja Caramuru
	function showCaramuruHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".caramuru-hacking-screen").show(200);
		currentPage = ".caramuru-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Caramuru
	function showCaramuruResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".caramuru-result-screen").show(200);
		currentPage = ".caramuru-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Caramuru
	function showCaramuruShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".caramuru-share-screen").show(200);
		currentPage = ".caramuru-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de hack da cerveja Darkmoon
	function showDarkmoonHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".darkmoon-hacking-screen").show(200);
		currentPage = ".darkmoon-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Darkmoon
	function showDarkmoonResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".darkmoon-result-screen").show(200);
		currentPage = ".darkmoon-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Darkmoon
	function showDarkmoonShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#fff"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".darkmoon-share-screen").show(200);
		currentPage = ".darkmoon-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});
	}

	// Mostra a tela de hack da cerveja Pratipa
	function showPratipaHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".pratipa-hacking-screen").show(200);
		currentPage = ".pratipa-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Pratipa
	function showPratipaResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".pratipa-result-screen").show(200);
		currentPage = ".pratipa-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Pratipa
	function showPratipaShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".pratipa-share-screen").show(200);
		currentPage = ".pratipa-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de hack da cerveja Heyjoe
	function showHeyjoeHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".heyjoe-hacking-screen").show(200);
		currentPage = ".heyjoe-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Heyjoe
	function showHeyjoeResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".heyjoe-result-screen").show(200);
		currentPage = ".heyjoe-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Heyjoe
	function showHeyjoeShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".heyjoe-share-screen").show(200);
		currentPage = ".heyjoe-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de hack da cerveja Caprico
	function showCapricoHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".caprico-hacking-screen").show(200);
		currentPage = ".caprico-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Caprico
	function showCapricoResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".caprico-result-screen").show(200);
		currentPage = ".caprico-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Caprico
	function showCapricoShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#fff"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".caprico-share-screen").show(200);
		currentPage = ".caprico-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#fff"});
	}

	// Mostra a tela de hack da cerveja Garotinho
	function showGarotinhoHackingScreen()
	{
		$("body").css("background-color", "#fff");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".garotinho-hacking-screen").show(200);
		currentPage = ".garotinho-hacking-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de resultado da cerveja Garotinho
	function showGarotinhoResultScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"#fff", "color":"#000"});		
		$(".top-menu-right span").html("<span style='font-family:AvenirBlack;font-size:0.8em'>HACK</span>");
		$(currentPage).hide(200);		
		$(".garotinho-result-screen").show(200);
		currentPage = ".garotinho-result-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Mostra a tela de compartilhamento da cerveja Garotinho
	function showGarotinhoShareScreen()
	{
		$("body").css("background-color", "#f8f8f8");
		$(".top-menu").css({"background-color":"transparent", "color":"#000"});		
		$(".top-menu-right span").html("");
		$(currentPage).hide(200);		
		$(".garotinho-share-screen").show(200);
		currentPage = ".garotinho-share-screen";		
		startPoint();
		$("#icon-menu").css({"color":"#000"});
	}

	// Registra novo usuário
	function registerNewUser()
	{
		$.ajax({
			type: "POST",
			url: "http://pixside.com.br/beerscript-service/register.php", 
			data: {
				action: 'NormalRegister',
				name: $("#register-name").val(),        			
				birthday: birthday,
				age: age,
				email: $("#register-email").val(),
				user: $("#register-user").val(),
				pass: $("#register-pass").val(),
				confirmPass: $("#register-confirmpass").val(),
				longitude: longitude,
				latitude: latitude,
				address: address,
				phoneCode: phoneCode
			},            
			async: false,
			dataType: "json", 
			success: function (json) {		            	
				if(json.result == true)
				{ 		                 
					errorFieldMessage(json.msg, "Sucesso");
					$(".load-screen").hide(100);	     				
					showLoginScreen();                 					    
				}
				else
				{
					$(".load-screen").hide(100);	
					errorFieldMessage(json.msg, "Desculpe");
				}
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").hide(100);        
			}
		});	
	}

	function formatBirthday()
	{		
       	var b_year = $("#register-birthday").val().slice(6, 10);
       	var b_month = $("#register-birthday").val().slice(3, 5);		        	
       	var b_day = $("#register-birthday").val().slice(0, 2);


       	var d = new Date();

       	var currentYear = d.getFullYear();
       	var currenMonth = d.getMonth() + 1;
       	var currentDay = d.getDate();

       	birthday = b_year + "-" + b_month + "-" + b_day;			

       	age = currentYear - b_year;

       	if(currenMonth < b_month || currenMonth == b_month && currentDay < b_day) 
       	{
       		age--;
       	}
    }

    // Login com facebook
	function fbLogin()
	{
		$(".load-screen").hide(100);

		facebookConnectPlugin.login(["public_profile","email"], 
			function(userData){       	             	
				getInfo();                              
			},
			function(error) {
				errorFieldMessage("Falha ao tentar se conectar ao facebook", "Falha");	
			}
		);        
	}

	// informações do facebook
	function getInfo()
	{        
		facebookConnectPlugin.api("me/?fields=name,first_name,last_name,picture,age_range,locale,cover,email",["public_profile","email"], 
			function (result)
			{        
				userFullName = result.name; 
				userName = userFullName;
				var pos = userName.indexOf(" ");
				userName = userName.substring(0, pos);
				email = result.email;	

				if(result.age_range.min >= 18)
				{
					$(".load-screen").show(100);
					//Fazer login e cadastro no banco 
		           	setTimeout(fbSave, 5000);
		           	if(devicePlatform == "iOS")
				    {
				    	window.FirebasePlugin.hasPermission(function(data){ 		
								getPhoneCode();
						});
				    }
				    else
		           		getPhoneCode();

		           	getGeolocation();    				 	              		
		        }   
		        else
		        {
		           	errorFieldMessage("Você deve ter 18 anos ou mais para utilizar este aplicativo!", "Desculpe");
		           	$(".load-screen").hide(100);
		        }                  
		    },
		    function(error)
		    {
		       	errorFieldMessage("Falha ao tentar coletar informações do facebook ("+error+")","Falha");
		       	$(".load-screen").hide(100);
		    }
		);                
	}

	function fbSave()
	{
		loginFacebook();
	}

	// Salva login do facebook no servidor
	function loginFacebook()
	{	
		$.ajax({
			type: "POST",
			url: "http://pixside.com.br/beerscript-service/loginFacebook.php", 
			data: {
				action: 'LoginFacebook',
				userName: userFullName,
				email: email,
				phoneCode: phoneCode,
				latitude: latitude,
				longitude: longitude,
				address: address	
			},            
			async: false,
			dataType: "json", 
			success: function (json) 
			{		            	
				if(json.result == true)
				{ 	
					level = json.data.level;               	
					registerId = json.data.id;				        
					facebookLogged = true;

					//redireciona o usuario para pagina
					showWelcomeScreen();
					$(".load-screen").hide(100);                					    
				}
				else
				{
				   	errorFieldMessage(json.msg, "Desculpe!");
				  	$(".load-screen").hide(100);
				}
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").hide(100);        
			}
		});
	}

    // Faz login do usuário cadastrado
    function login()
	{
		$(".load-screen").show(100);
		$.ajax({
				type: "POST",
				url: "http://pixside.com.br/beerscript-service/login.php", 
				data: {
					action: 'LoginWeb',
					user: $("#login-user").val(),
					pass: $("#login-pass").val()
				},            
				async: false,
				dataType: "json", 
				success: function (json) {		            	
				if(json.result == true)
				{               
					userFullName = json.data.name; 
					userName = userFullName;
					pos = userName.indexOf(" ");
					userName = userName.substring(0, pos);

					registerId = json.data.id;
					phoneCode = json.data.code;
					level = json.data.level;
					email = json.data.email;

					//Usuário Estabelecimento
					if(level == "2")
					{
						establishmentLogged = true;
						establishmentId = registerId;
						establishmentName = userFullName;

						$("#login-user").val("");
						$("#login-pass").val("");
						
						$(".establishement-bar").show();
						$(".establishmentName").html("<h3>"+establishmentName+"</h3>");

						$("#link-register").hide();
						$("#link-media").hide();
						$("#link-notification").hide();						        	
						showLoginScreen();
					}

					//Usuário Comum ou Administrador
					else
					{
						showWelcomeScreen();
					}
					$(".load-screen").hide(100);							                        					    
				}
				else
				{
					errorFieldMessage(json.msg, "Desculpe!");
					$(".load-screen").hide(100);
				}
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").hide(100);        
			}
		});
	}

	// Pegar Geolocalização
	function getGeolocation()
	{
		navigator.geolocation.getCurrentPosition(
			function(position){
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
				getAddress();
			}, 
			function(error){
				console.log(error, "Erro");
			},
			{ enableHighAccuracy: true }
		);
	}

	// Pega endereço por geolocalização
	function getAddress()
	{
		var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyDYEeVHzW-qkEm-YHtU74jdJ8Gya4zQCts";
		$.ajax({
			url: geocodeURL,
			complete: function(res)
			{
				var data = JSON.parse(res.responseText);
				address = data.results[0].formatted_address; 			
			}
		});   
	}

	// Pega código do telefone para push notifications
	function getPhoneCode()
	{
		window.FirebasePlugin.onTokenRefresh(
			function(token) 
			{
				// save this server-side and use it to push notifications to this device
				phoneCode = token;	
				localStorage.setItem("token", token);
				console.log("Codigo do telefone" + token);	
			},
			function(error)
			{
				console.log("Erro ao pegar código" + error);
			}
		);        	    	
	}

	// Pega phonecode no login
	function getPhoneCodeInLogin()
	{
		window.FirebasePlugin.onTokenRefresh(
		function(token) 
		{
			// save this server-side and use it to push notifications to this device	    
			if(localStorage.getItem("token") != token || localStorage.getItem("token") == null)	
			{			  	
			   	phoneCode = token;
			   	updatePhoneCode(token);
			}		     
		});    	    	
	}

	// Atualiza phonecode no login
	function updatePhoneCode(theCode)
	{
		$.ajax({
			type: "POST",
			url: "http://pixside.com.br/beerscript-service/updatePhoneCode.php", 
			data: 
		{
			action: 'Update',
			phoneCode: theCode,
			registerId: registerId    			
		},            
		async: false,
		dataType: "json", 
		success: function (json)
		{
			localStorage.setItem("token", theCode);
			console.log("Código do telefone atualizado");
		},
		error: function(xhr,e,t)
		{
			console.log("Error ao atualizar código");
		}
		});
	}

	// Logout estabelecimento
	function establishmentLogout()
	{        	
		establishmentLogged = false;
		establishmentId = "";
		establishmentName = "";
		establishmentId = "";
		userLogout();
		$(".establishement-bar").hide();		
	}

	// Logout usuário comum e facebook
	function userLogout()
	{       	
		if(facebookLogged)
		{
			facebookConnectPlugin.logout(
				function(response)
				{
					facebookLogged = false;             	                                 
				},
				function(response) 
				{
					console.log("Falha ao deslogar do facebook.");
				}
			);
		}

		if(establishmentLogged)
			$(".establishement-bar").show();		
		else
		{
			$(".establishement-bar").hide();		
			establishmentLogged = false;		
			establishmentId = "";
			establishmentName = "";
		}

		showLoginScreen();				

		latitude = "";
		longitude = "";
		address = "";
		phoneCode = "";

		birthday = "";
		age = "";
		userName = "";
		userFullName = "";
		registerId = "";

		ibu = "";
		srm = "";
		alc = "";
		beerName = "";
		beerType = "";
		hackedCont = 0;
		brewedCont = 0;

		$("#login-user").val("");
		$("#login-pass").val("");      		
	}

	// Chama a função de screenShot escondendo elementos dispensaveis
	function takeScreenshot()
	{
		$(".beer-result-main-title").hide();
		$(".btn-send-hack").hide();
		$(".side-menu").hide();
		setTimeout(screenShot, 200);
	}

	//Salva e envia screenshot e dados da cerveja hackeada para o servidor
	function screenShot()
	{
		$(".load-screen").show(100);
		navigator.screenshot.save(function(error,res)
		{
			if(error)
			{
			    console.error(error);
			    $(".beer-result-main-title").show();
				$(".btn-send-hack").show();
				$(".side-menu").show();
				$(".load-screen").hide(100);
			}
			else
			{
			    $(".beer-result-main-title").show();
				$(".btn-send-hack").show();
				$(".side-menu").show();

				var fileURL = res.filePath;

				var win = function (r) {
				    console.log("Code = " + r.responseCode);
				    console.log("Response = " + r.response);
				    console.log("Sent = " + r.bytesSent);
				    setTimeout(redirectToShareScreen, 2000);
				}

				var fail = function (error) {
					errorFieldMessage("Falha ao enviar! Erro: " +error.code+ "," +error.source+ "," +error.target+ "", "Falha");
				    console.log("An error has occurred: Code = " + error.code);
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				    $(".load-screen").hide(100);
				}

				var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
				options.mimeType = "text/plain";

				var params = {};
				params.value1 = beerName;
				params.value2 = beerType;
				params.value3 = ibu;
				params.value4 = srm;
				params.value5 = alc;
				params.value6 = registerId;
				params.value7 = establishmentLogged;
				params.value8 = establishmentId;

				options.params = params;

				var ft = new FileTransfer();
				ft.upload(fileURL, encodeURI("http://pixside.com.br/beerscript-service/uploadHacked.php"), win, fail, options);
			}
		},'jpg',100,'screenshotBeerscript');
	}

	// Redireciona para a tela correta de compartilhamento
	function redirectToShareScreen()
	{
		switch(beerName)
		{
			case "Conclave": showConclaveShareScreen();
			break;
			case "Birudo": showBirudoShareScreen();
			break;
			case "Caramuru": showCaramuruShareScreen();
			break;
			case "Darkmoon": showDarkmoonShareScreen();
			break;
			case "Pratipa": showPratipaShareScreen();
			break;
			case "Hey Joe": showHeyjoeShareScreen();
			break;
			case "Capricó": showCapricoShareScreen();
			break;
			case "Garotinho": showGarotinhoShareScreen();
			break;
		}
		$(".load-screen").hide(100);
	}

	// Pega informações de conquista hackedCont brewedCont
	function checkConquest()
	{
		$(".load-screen").show(100);
		$.ajax({
				type: "POST",
				url: "http://pixside.com.br/beerscript-service/checkConquest.php", 
				data: {
					action: 'Conquistas',
					id: registerId
				},            
				async: false,
				dataType: "json", 
				success: function (json) {		            	
				if(json.result == true)
				{               
					hackedCont = json.data.hackeds; 
					brewedCont = json.data.breweds;					
					$(".load-screen").hide(100);	
					showConquestScreen();		                        					    
				}
				else
				{
					errorFieldMessage(json.msg, "Desculpe!");
					$(".load-screen").hide(100);
				}
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").hide(100);        
			}
		});
	}

	// Compartilha foto no facebook e instagram
	function sharePhoto(socialmedia) 
	{
        var imageLink;  

        navigator.screenshot.save(function(error,res){
            if(error)
            {
            	console.log("Erro ao salvar imagem " + error);                
                $(".beer-share-footer").show();
				$(".share-close").show();
				$(".side-menu").show();
            }
            else
            {            	
            	imageLink = res.filePath;            	           	           	

                $(".beer-share-footer").show();
				$(".share-close").show();
				$(".side-menu").show();

				setTimeout(function()
				{
				  if(devicePlatform == "Android")
            		window.plugins.socialsharing.share(null,null,'file://'+imageLink, null);
            		else if(devicePlatform == "iOS")
              		window.plugins.socialsharing.share(null,null, imageLink, null);
				}, 2000); 
            }
        },'png',100,'beerScript');             
    }

    //Atualiza dados do usuário
    function updateUserProfile()
    {
    	var b_year = $("#perfil-birthday").val().slice(6, 10);
       	var b_month = $("#perfil-birthday").val().slice(3, 5);		        	
       	var b_day = $("#perfil-birthday").val().slice(0, 2);

       	birthday = b_year + "-" + b_month + "-" + b_day;

    	$.ajax({
				type: "POST",
				url: "http://pixside.com.br/beerscript-service/updateUser.php", 
				data: {
					action: 'UpdateUser',
					name: $("#perfil-name").val(),
					birthday: birthday,
					email: $("#perfil-email").val(),
					user: $("#perfil-user").val(),
					pass: $("#perfil-pass").val(),
					latitude: latitude,
					longitude: longitude,
					userId: registerId
				},            
				async: false,
				dataType: "json", 
				success: function (json) {		            	
				if(json.result == true)
				{
					errorFieldMessage(json.msg, "Sucesso");
					$(".load-screen").hide(100);
					userLogout();                   					    
				}
				else
				{
					errorFieldMessage(json.msg, "Ops!");
					$(".load-screen").hide(100);
				}
			},
			error: function(jqXHR, exception)
			{
				var msg = '';
			       if (jqXHR.status === 0) {
			           msg = 'Verifique sua conexão com a internet.';
			       } else if (jqXHR.status == 404) {
			           msg = 'Servidor não encontrado, tente novamente mais tarde. [404]';
			       } else if (jqXHR.status == 500) {
			           msg = 'Erro no servidor, tente novamente mais tarde. [500].';
			       } else if (exception === 'parsererror') {
			           msg = 'Requested JSON parse failed.';
			       } else if (exception === 'timeout') {
			           msg = 'Time out error.';
			       } else if (exception === 'abort') {
			           msg = 'Ajax request aborted.';
			       } else {
			           msg = 'Uncaught Error.\n' + jqXHR.responseText;
			       }
				errorFieldMessage(msg, "Falha");
				$(".load-screen").hide(100);        
			}
		});
    }

	// Mensagem Nativa de alerta
	function errorFieldMessage(msg, tl)
	{     	
		navigator.notification.alert(msg,null,tl,'Ok');
	}    

    function adjustSizeMenu()
	{
		screenSize = $(window).height();
		$("#bar-menu").css("height", screenSize);

		if(screenSize >= 1024)
		{
			$("#nav-menu").css("height", "auto");
			$(".logo-menu").css("margin-top", "100%");
		}
	}	

	//Rola qualquer página para o começo
    function startPoint()
    {
    	var aTag = $("a[name='start']");
    	$('html,body').animate({scrollTop: aTag.offset().top}, 100,function(){
    		if(currentPage != ".login-screen" && currentPage != ".register-screen")
    		{
    			$(".side-menu").show();    			
    		}
    	});		    
    }	
});