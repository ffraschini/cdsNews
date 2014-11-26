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
	},
	error:function(d){
	var a = $.parseJSON(d);
	jQuery("#message").html(a.message);
	}
});
}