// STAFF - ABOUT US - VIDEOS Document
 

 
  function iniciarStaff()
 {
 //--STAFF 
	
	
	
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
 
 // ------------------ fn STAFF -----------------
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



