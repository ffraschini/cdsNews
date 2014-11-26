<?php
require_once("connect.php");   

 $sentencia = "select * from cdsNews order by position asc"; 
 $resultado = mysql_query($sentencia, $link); 
	
	  
?>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <!--meta name="viewport" content="target-densitydpi=device-dpi, initial-scale=1.0, user-scalable=no" /-->
    <title>Código del Sur</title>
    <link rel="shortcut icon" href="Img/iconoBrowser.png">
    <!-- To allow your media queries to take full effect a typical mobile-optimized site contains something like the following: -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="webCDS.css">
    <!-- jQuery library (served from Google) -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>    
    <link href="jquery.bxslider/jquery.bxslider.css" rel="stylesheet" />    
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
   
   <style type="text/css">
		.rmvNew{
		 cursor:pointer;
		}
		
		.goUp{
		 cursor:pointer;
		}
		
		.goDown{
		 cursor:pointer;
		}
	</style>

</head>
<body>
   
	
		<div id="div_News" >
				<section id="SecContactUs">
					<form id="form1" action="upload.php" method="post" enctype="multipart/form-data">
					
					<div id="newsTextArea">					
						<p>Titulo de la noticia</p>
							<input type="text" name="tituloNew" id="tituloNew"></input>
					</div>
					
					<div id="newsTextArea">					
						<p>Link de la noticia</p>
							<input type="text" name="linkNew" id="linkNew" style="width: 592px;"></input>
					</div>
					<div id="newsTextArea">
					<!--<h22 id="ContactUs">Thank you for contacting us!</h22>-->
						<p>Texto de la noticia</p>
							<textarea name="area1" id="area1" style="margin: 0px; height: 261px; width: 592px;" ></textarea>
					</div>
					
					<div style="clear: both"></div>                
					 <span id="message" style="float: left; width:200px; font-size:13px; line-height: 15px;"></span>
                       
                    <div style="clear: both;"></div>
					<div  style= "text-align:center;  margin-bottom: 20px;">
						
							Seleccionar imagen (JPG, JPEG, PNG):
							<input type="file" name="fileToUpload" id="fileToUpload">
							<!--<input id="submit" type="submit" value="Upload Image" name="submit" style="display: none;">-->
						
					</div>
					 <div style="clear: both;"></div>
					 <div  style= "text-align:center;  margin-bottom: 20px;">
                          <a id="contact-submit" style="margin: 0;" onclick="save();"  href="#">Save</a>
                     </div>
					</form> 
					<div style="text-align: center; height: 40px;">
						<span id="exito" style="display: inherit;display: none;" > Se guardo con exito.</span>						
					</div>
					<div  style= "text-align:center;">
						
                        <table id="newsList" width="500px;" style="display:inline;" cellspacing="0" cellpadding="5" border="1">
							<tbody>
							<?php
								$x = 1;
								while ($fila = mysql_fetch_assoc($resultado)) {
										
								
							?>
								<tr id="<?php echo $x ?>">
									<td>
										<span><?php echo $fila['position'];?></span>
									</td>
									<td>
										<span><?php echo $fila['name'];?></span>
									</td>
									<td style="text-align: center;">
									<div style="display: inline;">	
										<img class="goUp" id="up<?php echo $fila['id'];?>" src="img/go_Up.png" style="width: 20px;"/>
									</div>
									<div style="display: inline;">	
										<img class="goDown" id="down<?php echo $fila['id'];?>" src="img/go_down.png" style="width: 20px;"/>
									</div>
									<div style="display: inline;">	
										<img class="rmvNew" id="<?php echo $fila['id'];?>" src="img/remove.png"/>
									</div>	
									</td>
								</tr>
							<?php
									$x = $x + 1;
								}
							?>	
							</tbody>
						</table>
                    </div>
					
				</section>
				
			</div>	
	
	<script>
  
  function save(){	
	  document.getElementById("form1").submit();
 }
 
 
 
 $(".goUp").click(function(){
	$("#exito").hide();	
	var x = this.id.split("up");
	var newsId = x[1];
	var pos = $("#"+this.id).parents('tr').attr('id');
	pos = parseInt(pos,10);
	var posUp = pos - 1;
	var actual =  document.getElementById(pos);
	var before = document.getElementById(posUp);
	
	if(before){
	var idDown = $("#"+posUp).find('img.rmvNew').attr('id');
		var parametros = {
			"idUp" : newsId,  
			"idDown" : idDown ,
			"posUp" : posUp ,
			"posDown" : pos,
		};
		$.ajax({
                data:  parametros,
                url:   'reorderAjax.php',
                type:  'post',
                beforeSend: function () {
                       // $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (data) {
                      before.parentNode.insertBefore(actual, before);
						before.id = pos;
						actual.id = posUp;
						$("#"+pos).children().first().html("<span>"+pos+"</span>");
						$("#"+posUp).children().first().html("<span>"+posUp+"</span>");
						$("#exito").show();	
                }
        });
		
	}
	
	
 });
 
 function reorder(){
	
 
 }
 
 
 $(".goDown").click(function(){
	$("#exito").hide();	 
	var x = this.id.split("down");
	var newsId = x[1];
	var pos = $("#"+this.id).parents('tr').attr('id');
	pos = parseInt(pos,10);
	var posUp = pos + 1;
	var actual =  document.getElementById(pos);
	var before = document.getElementById(posUp);
	if(before){
	
		var idDown = $("#"+posUp).find('img.rmvNew').attr('id');
		var parametros = {
			"idUp" : newsId,  
			"idDown" : idDown ,
			"posUp" : posUp ,
			"posDown" : pos,
		};
		$.ajax({
                data:  parametros,
                url:   'reorderAjax.php',
                type:  'post',
                beforeSend: function () {
                       // $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (data) {
					actual.parentNode.insertBefore(before,actual);
					before.id = pos;
					actual.id = posUp;
					$("#"+pos).children().first().html("<span>"+pos+"</span>");
					$("#"+posUp).children().first().html("<span>"+posUp+"</span>");
					$("#exito").show();	
                }
        });
	
		
	}
	
	
 });

 $( ".rmvNew" ).click(function() {
   var parametros = {
        "id" : this.id,          
     };

        $.ajax({
                data:  parametros,
                url:   'deletenewAjax.php',
                type:  'post',
                beforeSend: function () {
                      //  $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (data) {
                       refreshTable(data);
                }
        });

});

	function refreshTable(x){
		document.getElementById("newsList").innerHTML = "";
		$.each(x, function(k,v){
			var tr = document.createElement("tr");
			tr.id = k;	
			tr.innerHTML = "<td><span>"+v.position+"</span></td><td><span>"+v.name+"</span></td><td style='text-align: center;'><div style='display: inline;'><img class='goUp' id='up"+v.id+"' src='img/go_Up.png' style='width: 20px;'></div><div style='display: inline;'><img class='goDown' id='down"+v.id+"' src='img/go_down.png' style='width: 20px;'></div><div style='display: inline;'><img class='rmvNew' id='"+v.id+"' src='img/remove.png'></div></td>"		
			
			
			document.getElementById("newsList").appendChild(tr);	
		});
		
		$( ".rmvNew" ).click(function() {
		   var parametros = {
				"id" : this.id,          
			 };

				$.ajax({
						data:  parametros,
						url:   'deletenewAjax.php',
						type:  'post',
						beforeSend: function () {
							  //  $("#resultado").html("Procesando, espere por favor...");
						},
						success:  function (data) {
							   refreshTable(data);
						}
				});

		});
		
		
			 $(".goUp").click(function(){
				$("#exito").hide();	
				var x = this.id.split("up");
				var newsId = x[1];
				var pos = $("#"+this.id).parents('tr').attr('id');
				pos = parseInt(pos,10);
				var posUp = pos - 1;
				var actual =  document.getElementById(pos);
				var before = document.getElementById(posUp);
				
				if(before){
				var idDown = $("#"+posUp).find('img.rmvNew').attr('id');
					var parametros = {
						"idUp" : newsId,  
						"idDown" : idDown ,
						"posUp" : posUp ,
						"posDown" : pos,
					};
					$.ajax({
							data:  parametros,
							url:   'reorderAjax.php',
							type:  'post',
							beforeSend: function () {
								   // $("#resultado").html("Procesando, espere por favor...");
							},
							success:  function (data) {
								  before.parentNode.insertBefore(actual, before);
									before.id = pos;
									actual.id = posUp;
									$("#"+pos).children().first().html("<span>"+pos+"</span>");
									$("#"+posUp).children().first().html("<span>"+posUp+"</span>");
									$("#exito").show();	
							}
					});
					
				}
				
				
			 });
			 

			 
			 
			 $(".goDown").click(function(){	
				$("#exito").hide();	
				var x = this.id.split("down");
				var newsId = x[1];
				var pos = $("#"+this.id).parents('tr').attr('id');
				pos = parseInt(pos,10);
				var posUp = pos + 1;
				var actual =  document.getElementById(pos);
				var before = document.getElementById(posUp);
				if(before){
				
					var idDown = $("#"+posUp).find('img.rmvNew').attr('id');
					var parametros = {
						"idUp" : newsId,  
						"idDown" : idDown ,
						"posUp" : posUp ,
						"posDown" : pos,
					};
					$.ajax({
							data:  parametros,
							url:   'reorderAjax.php',
							type:  'post',
							beforeSend: function () {
								   // $("#resultado").html("Procesando, espere por favor...");
							},
							success:  function (data) {
								actual.parentNode.insertBefore(before,actual);
								before.id = pos;
								actual.id = posUp;
								$("#"+pos).children().first().html("<span>"+pos+"</span>");
								$("#"+posUp).children().first().html("<span>"+posUp+"</span>");	
								$("#exito").show();		
							}
					});
				
					
				}
				
				
			 });
	
	}
  
  
</script>
</body>
</html>	