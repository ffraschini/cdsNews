<?php
require_once("connect.php");   

 $sentencia = "select count(*) as cantidad from cdsnews";
 $count = mysql_query($sentencia, $link); 
 $row = mysql_fetch_array( $count );

 $repetir = ceil($row['cantidad'] / 4);

 $actual = 1;
 $hasta = 4;
 $desde = 1;
 
	
	  
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
	<script type="text/javascript" src="js/unified.js"></script>
  
<script>
	  jQuery(document).ready(function () {
	jQuery(document).delegate(".client1", "click", function (){
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
});
</script>  
   
</head>
<body>


<!-- 1er triangulo-->
    <div class="triangulo">
        <img src="img/red01.png" />
    </div>
    <!-- Fin -->
    <!-- NEWS -->
    <div id="divNews">
        <section id="SecNews">
			<div id="titles">
				<h2 id="News">News /</h2>
			</div>	
		<div class="min-900">
			
			<?php
				
			for ($i = 1; $i <= $repetir; $i++) {
				
				$sentencia = "select * from cdsnews where position between ".$desde." and  ". $hasta ."  order by position"; 
				$resultado = mysql_query($sentencia, $link); 
				
				while ($fila = mysql_fetch_assoc($resultado)) {
			?>
				<div id="client0<?php echo $fila['position']; ?>" class="client1" >
					<div id="imgClient0<?php echo $fila['position']; ?>" class="imgNews">
						<div class="imageCircular" style="width: 136px; height: 135px; background-image: url('uploads/<?php echo $fila['image'];?> ');"></div>
					</div>										
					<div id="nameClient0<?php echo $fila['position']; ?>" class="nameNews"><h5><?php echo $fila['name']; ?></h5><br></div>					
				
				</div>
			<?php
				}
			?>
			
			
			
			<?php
				mysql_data_seek($resultado, 0);
				while ($fila = mysql_fetch_assoc($resultado)) {
			?>
				
					
				<div id="hideClient0<?php echo $fila['position']; ?>" class="hideClient" style="float:left;">
					<div id="lineUpClient0<?php echo $fila['position']; ?>" class="lineUpClient1"></div>
					<div id="closeClient0<?php echo $fila['position']; ?>" class="closeClient" ></div>
					<div id="infoClient0<?php echo $fila['position']; ?>" class="infoClient">
						<p>
						<?php echo $fila['text']; ?>
					</p>
					</div>
					<div class="LinkStore01"><a href="<?php echo $fila['link']; ?>" target="_blank" ><?php echo $fila['link']; ?></a></div>
					<div id="lineDownClient0<?php echo $fila['position']; ?>" class="lineDownClinet"></div>
				</div>
						
				
			<?php
				}
				$hasta = $hasta + 4;
				$desde = $desde + 4;	
			}	
			?>
			
			
		</div>
		</section>
    </div>
    <!-- 2er triangulo -->
    <div class="triangulo">
        <img src="img/blue01.png" />
    </div>
    <!-- Fin -->
</body>
</html>		