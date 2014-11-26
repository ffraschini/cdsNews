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
