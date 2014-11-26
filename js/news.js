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
	  jQuery( "#newshide05" ).hide("slow");
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
	if( jQuery( "#newshide05" ).css("display") == "none" )
	{ 
	  jQuery( "#newshide05" ).show("slow");
	  jQuery( "#newshide" ).hide("slow");
	  jQuery( "#newshide02" ).hide("slow");
	  jQuery( "#newshide03" ).hide("slow");
	  jQuery( "#newshide04" ).hide("slow");
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
