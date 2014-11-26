//About us...Photos



//a simple function to click next link
//a timer will call this function, and the rotation will begin :)  

//---------- FIN about 01 ----------

//ABOUT US 02

$(document).ready(function() {

	jQuery("#folderone").click(function(){

		iniSlide01();

	})
	jQuery("#foldertwo").click(function(){

		iniSlide02();

	});
});

function iniSlide01(){
 //rotation speed and timer
    var speed = 1500;  
    
    //grab the width and calculate left value
    var item_width = $('#slideA li').outerWidth(); 
    var left_value = item_width * (-1); 
        
    //move the last item before first item, just in case user click prev button
    $('#slideA li:first').before($('#slideA li:last'));
    
    //set the default item to the correct position 
    $('#slideA ul').css({'left' : left_value});
    

}
function iniSlide02(){
    var speed = 1000;   
    
    var item_width = $('#slideA2 li').outerWidth(); 
    var left_value = item_width * (-1); 
        
    $('#slideA2 li:first').before($('#slideA2 li:last'));
    $('#slideA2 ul').css({'left' : left_value});
	
    
      
}



//---------- FIN about 02 ----------