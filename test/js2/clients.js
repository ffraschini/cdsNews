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
 //-------------- FN CLIENTS -----------
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