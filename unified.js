
//Ultima modificacion: Juan Olivera 27/1/2014

/*------ STAFF EFFECT ------*/

// On window load. This waits until images have loaded which is essential
	$(window).load(function(){
		
		// Fade in images so there isn't a color "pop" document load and then on window load
		$(".item img").fadeIn(500);
		
		// clone image
		$('.item img').each(function(){
			var el = $(this);
			el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height});
				el.dequeue();
			});
			this.src = grayscale(this.src);
		});
		
		// Fade image 
		$('.item img').mouseover(function(){
			$(this).parent().find('img:first').stop().animate({opacity:1}, 1000);
		})
		$('.img_grayscale').mouseout(function(){
			$(this).stop().animate({opacity:0}, 1000);
		});		
	});
	
	// Grayscale w canvas method
	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }

/*------ END STAFF EFFECT ------*/

/*------ PORTFOLIO ------*/

// Portfolio Document
 // botones Portfolio
 jQuery(document).on("click", ".buttonPort", function() {
	var elementSelected = jQuery(this)[0];
	var allElements = jQuery('.buttonPort');
	allElements.each(function() {
		if (elementSelected != this){
			//debugger
			jQuery(this).css("background-position-y", "bottom");
			jQuery( '.btn-all' ).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});	
	ocultarInfo2();	
});

//---------------------- FUNCIONES -----------------------

function iniciarPorfolio()
{	


	jQuery(".work").click( function (){
		var item = this;
		var idItem = jQuery(item).attr("id");
		var id =  idItem.substring(4, 7);
		
		verWork(id);
	});	
	//activar OCULTAR info
	jQuery(document).delegate(".closeCross", "click", ocultarInfo);
	

	//activar VER testimony
	jQuery(".titleTestimony").click(verTestimony);	
	jQuery(".hideWork").hide("");
	jQuery(".textTestimony").hide("");		
	
	//Inicialmente todos los items ocultos
	jQuery(".workContainer").fadeOut(400);

 	jQuery('#PortFolioDesc').load(function(){
 		jQuery("#ClientDesc").css("height", jQuery("#cont1").height() + 45);
 	});
}
//fn AMPLIAR info.
function verWork(index)
{
	var hideWork="";	
	hideWork = "#hideWork" + index;
	showSpinner();
	
	if (jQuery(hideWork).children().length==0){
		getInfo(hideWork, index);		
	}
	else{
		printInformation(hideWork,index);
	}
	
	
}
function getInfo(hideWork,index)
{

	$.ajax({	
	type: "get",
	dataType:"text",
	url: "html/hideWork"+index+".html",
	success: function(html){		
		jQuery( hideWork ).append(html);
		var idSlide = '#slider' + index;
		var images = jQuery(idSlide + ' img');
		var loaderCounter = 0;
		for(var i=0; i < images.length; i++){
			jQuery(jQuery(idSlide + ' img')[i]).load(function(){
				loaderCounter++;
				if(loaderCounter == images.length ){ //all images are loaded
					printInformation(hideWork,index);
				}				
			});
		}
	},
		
	error:function(data){
		page =data;
		
	}
	});
	
}
var aux;

function printInformation(hideWork,index)
{
	//jQuery(".hideWork").css("display","none");
	//jQuery('.hideWork').hide();
	var visibleElem = jQuery('.hideWork:visible');
	if(visibleElem.length > 0){
		visibleElem.hide();
		aux.destroySlider();
	}
	if( ( jQuery(hideWork ).css("display") == "none" ) && ('#' + visibleElem.attr('id') != hideWork) )
	{ 		
		jQuery(hideWork).show("");
		jQuery('html, body').animate({
       		 scrollTop: jQuery(hideWork).offset().top 
       	}, 1000); 				

	}else{
		jQuery(hideWork).empty();//hide("slow");
	}
	var idSlide = '#slider' + index;
	var idSlideNext = '#slider-next-'+index;
	var idSlidePrev = "#slider-prev-" +index;

	//var sliderWrapper = jQuery(idSlide).parents('.bx-wrapper');//checkeando si no fue mostrado aun el slider
	//if(sliderWrapper.length == 0){
		aux = jQuery(idSlide).bxSlider({
					 adaptiveHeight: true,
					 infiniteLoop : false,
			  	});	

	  	jQuery('.bxslider img').css('margin', 'auto');
	//}

	hideSpinner();
	return false;


}
//fn OCULTAR info
function ocultarInfo()
{
	 if( jQuery( this ).parent().css("display") == "none" )
	 { 
	  jQuery( this ).parent().show("slow");
	 }else{
	  jQuery( this ).parent().hide("", function(){
	  	//deteniendo el slider
		aux.destroySlider();	
	  });
	  
	 }
	 return false;
}

function ocultarInfo2()
{
	 if( jQuery( this ).next().css("display") == "none" )
	 { 
	  jQuery( ".hideWork" ).show("slow");
	 }else{
	  jQuery( ".hideWork" ).hide("slow");
	 }
	 return false;
}

 //fn AMPLIAR Testimony
function verTestimony()
{
	 if( jQuery( this ).next().css("display") == "none" )
	 { 
	  jQuery( this ).next().show("slow");
	 }else{
	  jQuery( this ).next().hide("slow");
	 }
	 return false;
}

function getWorkContainer(filter)
{
	/*jQuery.blockUI({
					message: '<img src="Img/ajax-loader.gif" />' ,
					css: {backgroundColor: 'transparent', border : "0px" }
			   	});*/
 	
 	showSpinner();
	if(jQuery(".workContainer").children().length==0){
		$.ajax({	
			type: "get",
			dataType:"text",
			url: "html/workContainer.html",
			success: function(html){
				
				jQuery( ".workContainer" ).append(html);
				iniciarPorfolio();

				var images = jQuery('.workContainer img');
				var loaderCounter = 0;
				for(var i=0; i < images.length; i++){
					jQuery(images[i]).load(function(){
						loaderCounter++;
						if(loaderCounter == images.length ){ //all images are loaded								
							detectFilter(filter);
							hideSpinner();
							
						}				
					});
				}

			},
			error:function(data){
				page =data;
				
			}
			});

	}
	else
	{
		detectFilter(filter);
		/*jQuery.unblockUI();*/
		hideSpinner();
		
	}	

}

function detectFilter(filter)
{
	if(filter=="filterSoftw")
		filterSoftw();
	else if(filter =="filterLabs")
		filterLabs();
	else if(filter =="filterWeb")
		filterWeb();
	else if(filter =="filterGame")
		filterGame();
	else if(filter =="filterGD")
		filterGD();
	else if(filter =="filter")
		filterAll();
		
}

//fn Filtrar
function filterSoftw()
{
	jQuery( ".workContainer").fadeOut(400, function() {
		jQuery(".work").hide();
		jQuery( ".iconTypeSoftw" ).closest(".work").show();
		jQuery( ".workContainer").fadeIn(400);
	});
}

function filterLabs()
{
	jQuery( ".workContainer").fadeOut(400, function() {
		jQuery(".work").hide();
		jQuery( ".iconTypeLabs" ).closest(".work").show();
		jQuery( ".workContainer").fadeIn(400);
	});
}

function filterWeb()
{
	// Hide  container before showing web icons
	
	jQuery( ".workContainer").fadeOut(400, function() {
		jQuery(".work").hide();
		jQuery( ".iconTypeWeb" ).closest(".work").show();
		jQuery( ".workContainer").fadeIn(400);
	});	
}

function filterGame()
{
	jQuery( ".workContainer").fadeOut(400, function() {
		jQuery(".work").hide();
		jQuery( ".iconTypeGame" ).closest(".work").show();
		jQuery( ".workContainer").fadeIn(400);
	});
}

function filterGD()
{
	jQuery( ".workContainer").fadeOut(400, function() {
		jQuery(".work").hide();
		jQuery( ".iconTypeGD" ).closest(".work").show();
		jQuery( ".workContainer").fadeIn(400);
	});
}

function filterAll()
{
	jQuery( ".workContainer").fadeOut(400, function() {
		jQuery(".work").hide();
		jQuery( ".iconTypeGD" ).closest(".work").show();
		jQuery( ".iconTypeWeb" ).closest(".work").show();
		jQuery( ".iconTypeLabs" ).closest(".work").show();
		jQuery( ".iconTypeGame" ).closest(".work").show();
		jQuery( ".iconTypeSoftw" ).closest(".work").show();
		jQuery( ".workContainer").fadeIn(400);
	});
	jQuery( '.buttonPort' ).css("background-position-y", "bottom");
	jQuery( '.btn-all' ).css("background-position-y", "top");
}


//Slide Portfolio max-width 900px
var currentPosition = 1;
function GoBackPortfolioItem(){	
	if(currentPosition >= 2 ){	
	currentPosition--;
	
	var id = "#" + currentPosition;	
	var idC = "#cont"+currentPosition
	jQuery(id).css("display", "block");
	jQuery(idC).css("display", "block");
	jQuery("#PortFolioDesc").css("height", jQuery(idC).height() + 25);
	}
}
function GoNextPortfolioItem(){
	if(currentPosition>= 1  ){	

		var id = "#" + currentPosition;	
		var idC = "#cont"+currentPosition;
		var idNext = "#" + (currentPosition + 1);
		var idCNext	= "#cont"+ (currentPosition + 1);

		/** will **/
		//se va a buscar por ajax el siguiente item del portfolio si es que aun no está cargado. Siempre se inserta al final.
		if(jQuery(idNext).length > 0){ // hay mas elementos para mostrar
			if(jQuery(idCNext).length == 0){
				showSpinner();
				$.ajax({	
					type: "get",
					dataType:"text",
					url: "html/mobile/cont"+(currentPosition + 1)+".html",
					success: function(html){
						jQuery("#PortFolioDesc ul").append(html);
						jQuery(idCNext + ' img').load(function(){//espero a que la imagen termine de cargar
							printNextPortfolioItemInformation(id, idC);
							hideSpinner();
						});						
					},
					error:function(data){
						console.info(data);				
					}
				});
			}else{
				printNextPortfolioItemInformation(id, idC);
			}
		}	
	}
}

function printNextPortfolioItemInformation(id, idC){
	jQuery(id).css("display", "none");
	jQuery(idC).css("display", "none");		
	jQuery("#PortFolioDesc").css("height", jQuery(idC).next().height()+ 25);
	currentPosition++;
}

/*------ END PORTFOLIO ------*/

/*------ STAFF ------*/

 
  function iniciarStaff()
 {

	jQuery(document).delegate(".Staff_close", "click", function(){
		if( $( this ).parent().css("display") == "none" )
		 { 
		  $( this ).parent().css('display', 'block');
		 }else{
		  $( this ).parent().css('display', 'none');
		 }
		 return false;
	});
	
 }
 

function verStaff(id)
{

	if(jQuery("#Member"+ id).size()==0)
	{
		showSpinner();
		$.ajax({	
			type: "get",
			dataType:"text",
			url: "html/member"+id+".html",
			success: function(html){
				jQuery( "#photo"+id ).after(html);
				//jQuery('#Member_photo'+id).load(function(){
					viewMember(id);
					hideSpinner();
				//});										
				
			},
			error:function(data){
				
				
			}
			});
	}
	else
	{
		viewMember(id);
	}
}
function viewMember(id){

	if( jQuery("#Member" + id).css("display") == "none" )
	{ 
		jQuery( ".member" ).hide();
        //jQuery("#Member" + id).show("slow");
		jQuery("#Member" + id).css('display', 'block');
		
	}else{
		jQuery("#Member" + id).css('display', 'none');//hide("slow");
	}

}

/*------ END STAFF ------*/

/*------ NEWS ------*/

 // NEWS Document 
 function iniciarNews()
 {
 	/*jQuery('#newsDesc').find('img').load(function(){ // espera la carga de la imagen y el texto del primer cliente
		jQuery('#ClientDesc').find('p').load(function(){
			jQuery("#ClientDesc").css("height", jQuery("#News1").height() + 45);
		}); 		
 	});*/
 	jQuery('#newsDesc').load(function(){
 		jQuery("#ClientDesc").css("height", jQuery("#News1").height() + 45);
 	})
 }
//fn NEWS
 function verNews01()
 {
	if( jQuery( "#newshide" ).css("display") == "none" )
	{ 
	  jQuery( "#newshide" ).show("slow");
	  jQuery( "#newshide02" ).hide("slow");
	  jQuery( "#newshide03" ).hide("slow");
	  jQuery( "#newshide04" ).hide("slow");
	}else{
		jQuery( "#newshide" ).hide("slow");
	}
	return false;
}
 function verNews02()
 {
	if( jQuery( "#newshide02" ).css("display") == "none" )
	{ 
	  jQuery( "#newshide02" ).show("slow");
	  jQuery( "#newshide" ).hide("slow");
	  jQuery( "#newshide03" ).hide("slow");
	  jQuery( "#newshide04" ).hide("slow");
	  jQuery( "#newshide05" ).hide("slow");
	}else{
		jQuery( "#newshide02" ).hide("slow");
	}
	return false;
}
 function verNews03()
 {
	if( jQuery( "#newshide03" ).css("display") == "none" )
	{ 
	  jQuery( "#newshide03" ).show("slow");
	  jQuery( "#newshide" ).hide("slow");
	  jQuery( "#newshide02" ).hide("slow");
	  jQuery( "#newshide04" ).hide("slow");
	  jQuery( "#newshide05" ).hide("slow");
	}else{
		jQuery( "#newshide03" ).hide("slow");
	}
	return false;
}
 function verNews04()
 {
	if( jQuery( "#newshide04" ).css("display") == "none" )
	{ 
	  jQuery( "#newshide04" ).show("slow");
	  jQuery( "#newshide" ).hide("slow");
	  jQuery( "#newshide02" ).hide("slow");
	  jQuery( "#newshide03" ).hide("slow");
	  jQuery( "#newshide05" ).hide("slow");
	}else{
		jQuery( "#newshide04" ).hide("slow");
	}
	return false;
}

function verNews05()
 {
	if( jQuery( "#newshide04" ).css("display") == "none" )
	{ 
	  jQuery( "#newshide04" ).show("slow");
	  jQuery( "#newshide" ).hide("slow");
	  jQuery( "#newshide02" ).hide("slow");
	  jQuery( "#newshide03" ).hide("slow");
	}else{
		jQuery( "#newshide05" ).hide("slow");
	}
	return false;
}
function ocultarNews(item)
{
	 if( jQuery("#"+item).css("display") == "none" )
	 { 
	  jQuery("#"+item).show("slow");
	 }else{
	  jQuery("#"+item).hide("slow");
	  jQuery(".SbuttonServ").css("background-position-y", "top");
	 }
	 return false;
}
var currentNewPosition = 1;
function GoBackNewsItem(){
	
	if(currentNewPosition >= 2 ){	
		currentNewPosition--;
		var id = "#n" + currentNewPosition;	
		var idC = "#News"+currentNewPosition
		jQuery(id).css("display", "block");
		jQuery(idC).css("display", "block");
		jQuery("#newsDesc").css("height", jQuery(idC).height() + 45 )
	}
}
function GoNextNewsItem(){
	if(currentNewPosition>= 1 && currentNewPosition < jQuery("#news_Tilte li").length  ){		
		var id = "#n" + currentNewPosition;	
		var idC = "#News"+currentNewPosition;


		var idNext = "#n" + (currentNewPosition + 1);
		var idCNext	= "#News"+ (currentNewPosition + 1);

		/** will **/
		//se va a buscar por ajax la siguiente news si es que aun no está cargada. Siempre se inserta al final.
		if(jQuery(idNext).length > 0){ // hay mas elementos para mostrar
			if(jQuery(idCNext).length == 0){
				/*jQuery.blockUI({
					message: '<img src="Img/ajax-loader.gif" />' ,
					css: {backgroundColor: 'transparent', border : "0px" }
			   	});*/
 				showSpinner();
				$.ajax({	
					type: "get",
					dataType:"text",
					url: "html/mobile/News"+(currentNewPosition + 1)+".html",
					success: function(html){
						jQuery("#newsDesc ul").append(html);
						jQuery(idCNext + ' img').load(function(){//espero a que la imagen termine de cargar
							printNextNewsItemInformation(id, idC);
							/*jQuery.unblockUI();*/
							hideSpinner();
						});						
					},
					error:function(data){
						console.info(data);				
					}
				});
			}else{
				printNextNewsItemInformation(id, idC);
			}
		}	

	}
}

function printNextNewsItemInformation(id, idC){
	jQuery(id).css("display", "none");
	jQuery(idC).css("display", "none");		
	jQuery("#newsDesc").css("height", jQuery(idC).next().height()+ 45);
	currentNewPosition++;
}

/*------ END NEWS ------*/

/*------ SERVICE ------*/

// SERVICE

 
 function iniciarServices()
 {
	jQuery("#serviceshide").hide("");
	jQuery("#serviceshide2").hide("");
	jQuery("#serviceshide3").hide("");
	jQuery("#serviceshide4").hide("");
	jQuery("#serviceshide5").hide("");
}

jQuery(document).on("click", ".buttonServ", function() {
	var elementSelected2 = jQuery(this)[0];
	var allElements2 = jQuery('.buttonServ');
	allElements2.each(function() {
		if (elementSelected2 != this) {		
			jQuery(this).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});
	var service = jQuery(this).attr('data-name');
	switch(service){
		case "verServ1" :
			verServ1();
			break;
		case "verServ2" :
			verServ2();
			break;
		case "verServ3" :
			verServ3();
			break;
		case "verServ4" :
			verServ4();
			break;
		case "verServ5" :
			verServ5();
			break;
	}
});
	
	
	// botones
/*function softwareIcon() {
	var elementSelected2 = jQuery(this)[0];
	var allElements2 = jQuery('.buttonServ');
	allElements2.each(function() {
		if (elementSelected2 != this) {		
			jQuery(this).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});	
	verServ1();	
}

function iconWeb() {
	var elementSelected2 = jQuery(this)[0];
	var allElements2 = jQuery('.buttonServ');
	allElements2.each(function() {
		if (elementSelected2 != this) {
			jQuery(this).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});	
	verServ3();	
}

 function iconMobile() {
	var elementSelected2 = jQuery(this)[0];
	var allElements2 = jQuery('.buttonServ');
	allElements2.each(function() {
		if (elementSelected2 != this) {
			jQuery(this).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});	
	verServ2();	
}

function iconGraphic() {
	var elementSelected2 = jQuery(this)[0];
	var allElements2 = jQuery('.buttonServ');
	allElements2.each(function() {
		if (elementSelected2 != this) {
			
			jQuery(this).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});	
	verServ4();	
}

function iconGame() {
	var elementSelected2 = jQuery(this)[0];
	var allElements2 = jQuery('.buttonServ');
	allElements2.each(function() {
		if (elementSelected2 != this) {
			
			jQuery(this).css("background-position-y", "bottom");
		} else {
			jQuery(this).css("background-position-y", "top");
		}
	});	
	verServ5();	
}*/
 
 // VER/OCULTAR
 
 function verServ1()
 {
	if( jQuery( "#serviceshide" ).css("display") == "none" )
	{ 
	  jQuery( "#serviceshide" ).show("slow");
	  jQuery( "#serviceshide2" ).hide("slow");
	  jQuery( "#serviceshide3" ).hide("slow");
	  jQuery( "#serviceshide4" ).hide("slow");
	  jQuery( "#serviceshide5" ).hide("slow");
	}else{
		jQuery( "#serviceshide" ).hide("slow");
		jQuery('.buttonServ').css("background-position-y", "top");
	}
	return false;
}

 function verServ2()
 {
	if( jQuery( "#serviceshide2" ).css("display") == "none" )
	{ 
	  jQuery( "#serviceshide2" ).show("slow");
	  jQuery( "#serviceshide" ).hide("slow");
	  jQuery( "#serviceshide3" ).hide("slow");
	  jQuery( "#serviceshide4" ).hide("slow");
	  jQuery( "#serviceshide5" ).hide("slow");
	}else{
		jQuery( "#serviceshide2" ).hide("slow");
		jQuery('.buttonServ').css("background-position-y", "top");
	}
	return false;
}

 function verServ3()
 {
	if( jQuery( "#serviceshide3" ).css("display") == "none" )
	{ 
	  jQuery( "#serviceshide3" ).show("slow");
	  jQuery( "#serviceshide" ).hide("slow");
	  jQuery( "#serviceshide2" ).hide("slow");
	  jQuery( "#serviceshide4" ).hide("slow");
	  jQuery( "#serviceshide5" ).hide("slow");
	}else{
		jQuery( "#serviceshide3" ).hide("slow");
		jQuery('.buttonServ').css("background-position-y", "top");
	}
	return false;
}

 function verServ4()
 {
	if( jQuery( "#serviceshide4" ).css("display") == "none" )
	{ 
	  jQuery( "#serviceshide4" ).show("slow");
	  jQuery( "#serviceshide" ).hide("slow");
	  jQuery( "#serviceshide2" ).hide("slow");
	  jQuery( "#serviceshide3" ).hide("slow");
	  jQuery( "#serviceshide5" ).hide("slow");
	}else{
		jQuery( "#serviceshide4" ).hide("slow");
		jQuery('.buttonServ').css("background-position-y", "top");
	}
	return false;
}

 function verServ5()
 {
	if( jQuery( "#serviceshide5" ).css("display") == "none" )
	{ 
	  jQuery( "#serviceshide5" ).show("slow");
	  jQuery( "#serviceshide" ).hide("slow");
	  jQuery( "#serviceshide2" ).hide("slow");
	  jQuery( "#serviceshide3" ).hide("slow");
	  jQuery( "#serviceshide4" ).hide("slow");
	}else{
		jQuery( "#serviceshide5" ).hide("slow");
		jQuery('.buttonServ').css("background-position-y", "top");
	}
	return false;
}

function ocultarServ(id){
	 if( jQuery("#"+id).css("display") == "none" )	 
	  jQuery("#"+id).show("slow");
	 else
	  jQuery("#"+id).hide("slow");

	 jQuery('.buttonServ').css("background-position-y", "top");
	 return false;
}

function viewService(classItem){
	
	jQuery.each(jQuery(".contS"), function(i, val){
		if(jQuery(val).hasClass(classItem))
		{
			if (jQuery(val).css("display")=="block")
				jQuery(val).css("display","none");
			else
				jQuery(val).css("display","block");
		}
		else
		{
		jQuery(val).css("display","none");
		}
	});
	//jQuery(".contS").css("display","none");
	
}

/*------ END SERVICE ------*/

/*------ CLIENTS ------*/

// CLIENTS Document
 function iniciarClients()
 {	
	jQuery(document).delegate(".client", "click", function (){
		var item = this;
		var idItem = jQuery(item).attr("id");
		var id =  idItem.substring(6, 8);		
		verClient(id);
	});
	jQuery(document).delegate(".closeClient", "click", function(){	
	if( $( this ).parent().css("display") == "none" )
	 { 
	  $( this ).parent().show("slow");
	 }else{
	  $( this ).parent().hide("slow");
	 }
	 return false;
	
	})
	jQuery( ".hideClient" ).hide("");

	/*jQuery('#ClientDesc').find('img').load(function(){ // espera la carga de la imagen y el texto del primer cliente
		jQuery('#ClientDesc').find('p').load(function(){
			jQuery("#ClientDesc").css("height", jQuery("#cli_cont1").height() + 45);
		}); 		
 	});*/
	jQuery('#ClientDesc').load(function(){
		jQuery("#ClientDesc").css("height", jQuery("#cli_cont1").height() + 45);
	})
}
 $(window).resize(function(e) {
		jQuery("#ClientDesc").css("height", jQuery("#cli_cont1").height() + 45);
		jQuery("#newsDesc").css("height", jQuery("#News1").height() + 45);
		jQuery("#PortFolioDesc").css("height", jQuery("#cont1").height() + 45);

		jQuery( ".hideClient" ).hide("");
});
 
 function verClient(index)
{
	var hideClient="";	
	hideClient = "#hideClient" + index;	
	if( jQuery(hideClient ).css("display") == "none" )
	{ 
		jQuery(".hideClient").hide("slow");//.css("display","none");
		jQuery(hideClient).show("slow");		
		/*var otherItemHide;
		for(var i=1;i<19;i++)
		{ 
			if (index < 10)
				otherItemHide = "#hideClient0" + i;
			else
				otherItemHide = "#hideClient" + i;
				
			if (otherItemHide != hideClient)
			{
				jQuery( otherItemHide ).hide("2000");
			}
		} */
	  
	}else{
		jQuery(hideClient).hide("slow");
	}	
	return false;
} 
var currentClientPosition = 1;
function GoBackClientItem(){	
	if(currentClientPosition >= 2 ){	
	currentClientPosition--;	
	var id = "#c" + currentClientPosition;	
	var idC = "#cli_cont"+currentClientPosition;
	jQuery(id).css("display", "block");
	jQuery(idC).css("display", "block");
	jQuery("#ClientDesc").css("height", jQuery(idC).height() + 45)
	}
}
function GoNextClientItem(){
	if(currentClientPosition>= 1 && currentClientPosition < jQuery("#clientItems li").length  ){		
		var id = "#c" + currentClientPosition;	
		var idC = "#cli_cont"+currentClientPosition;


		var idNext = "#c" + (currentClientPosition + 1);
		var idCNext	= "#cli_cont"+ (currentClientPosition + 1);

		/** will **/
		//se va a buscar por ajax la siguiente news si es que aun no está cargada. Siempre se inserta al final.
		if(jQuery(idNext).length > 0){ // hay mas elementos para mostrar
			if(jQuery(idCNext).length == 0){
				/*jQuery.blockUI({
					message: '<img src="Img/ajax-loader.gif" />' ,
					css: {backgroundColor: 'transparent', border : "0px" }
			   	});*/
				showSpinner();
				$.ajax({	
					type: "get",
					dataType:"text",
					url: "html/mobile/cli_cont"+(currentClientPosition + 1)+".html",
					success: function(html){
						jQuery("#ClientDesc ul").append(html);
						jQuery(idCNext + ' img').load(function(){//espero a que la info termine de cargar
							//jQuery(idCNext + ' p').load(function(){
								printNextClientItemInformation(id, idC);
								hideSpinner();
							//})
						});
					},
					error:function(data){
						console.info(data);				
					}
				});
			}else{
				printNextClientItemInformation(id, idC);
			}
		}
	}
}

function printNextClientItemInformation(id, idC){
	jQuery(id).css("display", "none");
	jQuery(idC).css("display", "none");		
	jQuery("#ClientDesc").css("height", jQuery(idC).next().height()+ 45);
	currentClientPosition++;
}

/*------ END CLIENTS ------*/

/*------ ABOUT ------*/

function iniciarAbout()
 {
// activa fn ver y ocultar de ABOUT US		
	jQuery("#photoshide01").hide("");
	jQuery("#photoshide02").hide("");
	jQuery("#photoshide03").hide("");	
	jQuery("#video01").hide("");
	jQuery("#video02").hide("");
	jQuery("#video03").hide("");
}

function viewAbout(classItem){
	if(jQuery(classItem).css("display")=="block")
	{
		jQuery(classItem).css("display","none");
	}
	else
	{	
		//jQuery(".contA").css("display","none");
		if(jQuery(classItem).children().length == 0)
		{
			getGallery(classItem, function(html){
				jQuery(classItem).append(html);	
			});			
		}
		jQuery(classItem).css("display","block");
		
	}
}
function getGallery(classe, callback)
{
	var url ="";
	if (classe == ".Meals")
	{
		url ="html/meal.html";
	}
	else if(classe == ".Easter2013")
	{
	url ="html/easter2013.html";
	}

	$.ajax({	
		type: "get",
		url: url,
		dataType:"text",
		success: function(html){
			callback(html);
		},
		error:function(data){	
			 console.info(data)
		}
	});

}

// fn ABOUT US
function verAlbum1()
{	
	
	if (jQuery( "#photoshide01" ).children().length==0){
		/*jQuery.blockUI({
					message: '<img src="Img/ajax-loader.gif" />' ,
					css: {backgroundColor: 'transparent', border : "0px" }
			   	});*/
		showSpinner();
		$.ajax({	
		 type: "get",
		 dataType:"text",
		 url: "html/about1.html",
		success: function(html){
			
			jQuery( "#photoshide01" ).append(html);
			var images = jQuery('#slideA img');
			var loaderCounter = 0;
			for(var i=0; i < images.length; i++){
				jQuery(images[i]).load(function(){
					loaderCounter++;
					if(loaderCounter == images.length ){ //all images are loaded								
						//jQuery.unblockUI();
						hideSpinner();
					}				
				});
			}
			if( jQuery( "#photoshide01" ).css("display") == "none" )
			{
				jQuery( "#photoshide01" ).show("slow");		
				jQuery( "#photoshide02" ).hide("slow");
			}else{
				jQuery( "#photoshide01" ).hide("slow");
			}

		 },
		error:function(data){
			console.info(data)
		}
		  });
	}
	else{
		if( jQuery( "#photoshide01" ).css("display") == "none" )
		{
			jQuery( "#photoshide01" ).show("slow");		
			jQuery( "#photoshide02" ).hide("slow");
		}else{
			jQuery( "#photoshide01" ).hide("slow");
		}
		}
	
	
	
	
}

function verAlbum2()
{
if (jQuery( "#photoshide02" ).children().length==0){
	/*jQuery.blockUI({
					message: '<img src="Img/ajax-loader.gif" />' ,
					css: {backgroundColor: 'transparent', border : "0px" }
			   	});*/
	showSpinner();
	$.ajax({	
	 type: "get",
	  dataType:"text",
	 url: "html/about2.html",
     success: function(html){
		jQuery( "#photoshide02" ).append(html);
		var images = jQuery('#slideA2 img');
		var loaderCounter = 0;
		for(var i=0; i < images.length; i++){
			jQuery(images[i]).load(function(){
				loaderCounter++;
				if(loaderCounter == images.length ){ //all images are loaded								
					//jQuery.unblockUI();
					hideSpinner();
				}				
			});
		}
		/*jQuery(jQuery('#slideA2 img')[0]).load(function(){
			jQuery.unblockUI();
		});*/
		if( jQuery( "#photoshide02" ).css("display") == "none" )
		{
			jQuery( "#photoshide02" ).show("slow");		
			jQuery( "#photoshide01" ).hide("slow");
		}else{
			jQuery( "#photoshide02" ).hide("slow");
		}
	 },
	 error:function(data){
		console.info(data)
	}
      });
	}
	else{
		if( jQuery( "#photoshide02" ).css("display") == "none" )
		{
			jQuery( "#photoshide02" ).show("slow");		
			jQuery( "#photoshide01" ).hide("slow");
		}else{
			jQuery( "#photoshide02" ).hide("slow");
		}
		
	}
	
}
function verVideo01()
{
	var elem = jQuery('#video01');
	if(elem.length == 0){
		$.ajax({	
			type: "get",
			async : false,
			dataType:"text",
			url: "html/video01.html",
			success: function(html){
				jQuery('.btnvideo01').after(html);					
			},
			error:function(data){
				console.info(data);				
			}
		});
	}

	if( jQuery( "#video01" ).css("display") == "none" )
	{
		jQuery( "#video01" ).show("slow");		
		jQuery( "#video02" ).hide("slow");
		jQuery( "#video03" ).hide("slow");	
		jQuery( ".btnvideo01" ).html( '<span>Video CDS 2013</span><img src="img/btndown.png"/>' );
		jQuery( ".btnvideo02" ).html( '<span>Video Harlem Shake 2013</span><img src="img/btnright.png"/>' );
		jQuery( ".btnvideo03" ).html( '<span>Video CDS 2012</span><img src="img/btnright.png"/>' );
	}else{
			jQuery( "#video01" ).hide("slow");
			jQuery( ".btnvideo01" ).html( '<span>Video CDS 2013</span><img src="img/btnright.png"/>' );
	}
}
function verVideo02()
{	
	var elem = jQuery('#video02');
	if(elem.length == 0){
		$.ajax({	
			type: "get",
			async : false,
			dataType:"text",
			url: "html/video02.html",
			success: function(html){
				jQuery('.btnvideo02').after(html);					
			},
			error:function(data){
				console.info(data);				
			}
		});
	}

	if( jQuery( "#video02" ).css("display") == "none" )
	{
		jQuery( "#video02" ).show("slow");		
		jQuery( "#video01" ).hide("slow");
		jQuery( "#video03" ).hide("slow");		
		jQuery( ".btnvideo02" ).html( '<span>Video Harlem Shake 2013</span><img src="img/btndown.png"/>' );
		jQuery( ".btnvideo01" ).html( '<span>Video CDS 2013</span><img src="img/btnright.png"/>' );
		jQuery( ".btnvideo03" ).html( '<span>Video CDS 2012</span><img src="img/btnright.png"/>' );
	}else{
		jQuery( "#video02" ).hide("slow");
		jQuery( ".btnvideo02" ).html( '<span>Video Harlem Shake 2013</span><img src="img/btnright.png"/>' );
	}
}
function verVideo03()
{	
	var elem = jQuery('#video03');
	if(elem.length == 0){
		$.ajax({	
			type: "get",
			async : false,
			dataType:"text",
			url: "html/video03.html",
			success: function(html){
				jQuery('.btnvideo03').after(html);					
			},
			error:function(data){
				console.info(data);				
			}
		});
	}

	if( jQuery( "#video03" ).css("display") == "none" )
	{
		jQuery( "#video03" ).show("slow");		
		jQuery( "#video01" ).hide("slow");
		jQuery( "#video02" ).hide("slow");		
		jQuery( ".btnvideo03" ).html( '<span>Video CDS 2012</span><img src="img/btndown.png"/>' );
		jQuery( ".btnvideo01" ).html( '<span>Video CDS 2013</span><img src="img/btnright.png"/>' );
		jQuery( ".btnvideo02" ).html( '<span>Video Harlem Shake 2013</span><img src="img/btnright.png"/>' );
	}else{
		jQuery( "#video03" ).hide("slow");
		jQuery( ".btnvideo03" ).html( '<span>Video CDS 2012</span><img src="img/btnright.png"/>' );
	}
}
function ocultarAbout(item)
{
	if( $("#"+item).css("display") == "none" )
	 { 
	  $("#"+item).show("slow");
	 }else{
	  $("#"+item).hide("slow");
	 }
	 return false;
}

//var currentPhotoPosition = 1;

function prevphotoshide(id){
  var item_width = $(id +'li').outerWidth(); 
   var left_value = item_width * (-1); 
//get the right position            
        var left_indent = parseInt($(id+ ' ul').css('left')) + item_width;
        //slide the item            
        $(id+ ' ul').animate({'left' : left_indent}, 500,function(){    
            //move the last item and put it as first item                
            $(id + ' li:first').before($(id+' li:last'));           
            //set the default item to correct position
            $(id +' ul').css({'left' : left_value});        
        });
        //cancel the link behavior            


        /*if(currentPhotoPosition >= 2 ){	
			currentPhotoPosition--;
		}*/
        return false;
}
function nextphotoshide(id){

	/*var nextItem = jQuery('#f'+ (currentPhotoPosition+1));

	if(jQuery(nextItem).length > 0){ // hay mas elementos para mostrar
		if(jQuery(nextItem + ' img').length == 0){// si el li aun no tiene imagen 
			$.ajax({	
				type: "get",
				dataType:"text",
				url: "html/album"+id+"photo"+(currentPhotoPosition + 1)+".html",
				success: function(html){
					jQuery("#PortFolioDesc ul").append(html);
					jQuery(idCNext + ' img').load(function(){//espero a que la imagen termine de cargar
						printNextPortfolioItemInformation(id, idC);
					});						
				},
				error:function(data){
					console.info(data);				
				}
			});
		}else{
			printNextPortfolioItemInformation(id, idC);
		}
	}	*/


	var item_width = $(id +'li').outerWidth();
	var left_value = item_width * (-1); 
	//get the right position
    var left_indent = parseInt($(id+' ul').css('left')) - item_width;        
    //slide the item
    $(id +' ul').animate({'left' : left_indent}, 500, function () {            
        //move the first item and put it as last item
        $(id +' li:last').after($(id + ' li:first'));
        //set the default item to correct position
        $(id + ' ul').css({'left' : left_value});        
    });                 
    //cancel the link behavior

    //currentPhotoPosition++;

    return false;
}

/*------ END ABOUT ------*/

/*------ SPINNER FUNCTION ------*/

var spinner;
var target;

function iniciarSpinner(){
	target = jQuery('body')[0];
	spinner = new Spinner({"position" : "fixed", "left" : 0, "color" : "white"});		
}

function showSpinner(){
	jQuery.blockUI({
					message: '' ,
					css: {backgroundColor: 'transparent', border : "0px" }
			   	});
	spinner.spin(target);
	jQuery('.spinner').css('margin', 'auto');
	jQuery('.spinner').css('right', 0);
}

function hideSpinner(){
	spinner.stop();
	jQuery.unblockUI();	
}

/*------ END SPINNER FUNCTION ------*/

/*------ MAIL ------*/

function sendEmail(){
var data = {
"contact-name":jQuery("#Name").val(),
"contact-email":jQuery("#Email").val(),
"contact-company":jQuery("#Company").val(),
"contact-comments": jQuery("#Comments").val()
}	
$.ajax({
	type: "POST",
	url: 'contactProcess.php',
	data: data,
	success: function(d){
	var a = $.parseJSON(d);
	jQuery("#message").html(a.message);
	if (a.result != false){
		jQuery("#Name").val("");
		jQuery("#Email").val("");
		jQuery("#Company").val("");
		jQuery("#Comments").val("");
	}
		location.href="thank_you.html";

	},
	error:function(d){
	var a = $.parseJSON(d);
	jQuery("#message").html(a.message);
	}
});
}

/*------ END MAIL ------*/

