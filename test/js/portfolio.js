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
	jQuery(document).delegate("[data-progress-text]", "change", function(){
		alert('hola');
	});
	
	//activar VER testimony
	jQuery(".titleTestimony").click(verTestimony);	
	jQuery(".hideWork").hide("");
	jQuery(".textTestimony").hide("");		
	
	//Inicialmente todos los items ocultos
	jQuery(".workContainer").fadeOut(400);

	/*jQuery('#PortFolioDesc').find('img').load(function(){ // espera la carga de la imagen y el texto del primer cliente
		jQuery('#ClientDesc').find('p').load(function(){
			jQuery("#ClientDesc").css("height", jQuery("#cont1").height() + 45);
		}); 		
 	});*/
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
 	Pace.restart();
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
							Pace.stop();
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
		Pace.stop();
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











