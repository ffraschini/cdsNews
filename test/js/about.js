
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