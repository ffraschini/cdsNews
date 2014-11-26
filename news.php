<?php
require_once("connect.php");   

 $sentencia = "select * from cdsnews where position <= 5 order by position"; 
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
	<script type="text/javascript" src="js/unified.js"></script>
   
   
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

			<ul id="carousel">
				<?php
					while ($fila = mysql_fetch_assoc($resultado)) {
				?>
				<li class="icon-news icon-news1" onclick="verNews0<?php echo $fila['position']; ?>()"><div class="imageCircular" style="background-image:url('uploads/<?php echo $fila['image'];?> ');"></div><h5 style="width: 160;"><?php echo $fila['name']; ?></h5></li>
				
				<?php
					}
				?>
			</ul>
			
		
			<?php
				mysql_data_seek($resultado, 0);
				while ($fila = mysql_fetch_assoc($resultado)) {
			?>
			<div style="clear: left;">
			<div id="newshide0<?php echo $fila['position']; ?>" class="mT25">     <!-- NOVA 2013 - ESTO VA OCULTO -->
				<div id="firstlineNews0<?php echo $fila['position']; ?>"></div>
				<div id="txtNews">
					<div class="close" onclick="ocultarNews('newshide0<?php echo $fila['position']; ?>')"></div>
					<p>
						<?php echo $fila['text']; ?>
					</p>
				</div>
				
				<div class="LinkStore01"><a href="<?php echo $fila['link']; ?>" target="_blank" ><?php echo $fila['link']; ?></a></div>
				<div id="secondlineNews"></div>
			</div>
			
			<?php
					}
			?>
			
			
			<div class="content450" id="newsContent450" >						
				<a onClick="GoBackNewsItem()" class="btnleftPort"></a>
				<div>
					<ul id="news_Tilte" class="TitlePortfolio">
						<?php
							mysql_data_seek($resultado, 0);
							while ($fila = mysql_fetch_assoc($resultado)) {
						?>
							<li id="n<?php echo $fila['position']; ?>"><?php echo $fila['name']; ?></li>
						<?php
							}
						?>						
					</ul>
				</div>
				<a class="btnrightPort" onClick="GoNextNewsItem()"></a>
			</div>
			
			<div id="newsDesc" class="contInfoDesc450" >
				<ul class="InfoNews">
					<!-- para movile solo se carga la primera noticia, las otras se traen a demanda por ajax con el slider-->
					<?php
							mysql_data_seek($resultado, 0);
							while ($fila = mysql_fetch_assoc($resultado)) {
					?>
					<li id="News<?php echo $fila['position']; ?>">
						
						<img class="porfImg" src="uploads/<?php echo $fila['image'];?>"/>
						<p><?php echo $fila['text']; ?>
						<br><br>Reference:	<a href="<?php echo $fila['link']; ?>"><?php echo $fila['link']; ?></a></p>
					</li>
					<?php
						}
					?>		
					<!-- para movile solo se carga la primera noticia, las otras se traen a demanda por ajax con el slider-->
				</ul>
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