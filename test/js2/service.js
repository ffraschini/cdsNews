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