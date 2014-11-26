<?php
require_once("connect.php"); 
 
	$action = $_REQUEST["typeAction"];
	
	
	if($action == "save"){
	
	$image_name = basename($_FILES["fileToUpload"]["name"]);
	$target_dir = "uploads/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	$message = "";
	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
		$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
		if($check !== false) {
			//echo "File is an image - " . $check["mime"] . ".";
			
			$uploadOk = 1;
		} else {
			$message = "File is not an image.";
			//echo "File is not an image.";
			$uploadOk = 0;
		}
	}
	// Check if file already exists
	if (file_exists($target_file)) {
		//echo "Sorry, file already exists. <br>";
		$message = "Sorry, file already exists. <br>";
		
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["fileToUpload"]["size"] > 500000) {
		//echo "Sorry, your file is too large. <br>";
		$message = "Sorry, your file is too large. <br>";
		
		$uploadOk = 0;
	}
	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
	&& $imageFileType != "gif" ) {
		//echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed. <br>";
		$message = "Sorry, only JPG, JPEG, PNG & GIF files are allowed. <br>";
		$uploadOk = 0;
	}
	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		//echo "Sorry, your file was not uploaded. <br>";
		$message = "Sorry, your file was not uploaded. <br>";
	// if everything is ok, try to upload file
	} else {
		if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
			//echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		} else {
			$message = "Sorry, there was an error uploading your file. <br>";
			//echo "Sorry, there was an error uploading your file. <br>";
			$uploadOk = 0;
		}
	}
	
	
		//echo " <p> " . stripcslashes(nl2br($_REQUEST["area1"] ))."</p>";
		
		
	
	if($uploadOk == 1){	
	
		// $pos = 0;
		// $sentencia = "select max(position) as maxim from cdsNews";
		// $resultado = mysql_query($sentencia, $link);
		// $row=mysql_fetch_array($resultado);
		// $pos = $row["maxim"]; 
		 // if(!$resultado){
			$pos = 1;
		  // }else{
			// $pos = $pos + 1;
			
		  // }
		  
		$sentencia = "select * from cdsNews order by position asc"; 
		$resultado = mysql_query($sentencia, $link); 
		
		while ($fila = mysql_fetch_assoc($resultado)) {
			$posx = $fila['position'] + 1;
			$sentenciaAux = "update cdsNews set position =".$posx." where id = ".$fila['id']; 
			$resultadoAux = mysql_query($sentenciaAux, $link); 
		}	  
		 
		
	  $sentencia = "insert into cdsNews (name, text, image, position,link) values ('".$_REQUEST["tituloNew"]."','". stripcslashes(nl2br($_REQUEST["area1"] )) ."','".$image_name."','".$pos."','".$_REQUEST["linkNew"]."')"; 
 
	  $resultado = mysql_query($sentencia, $link); 
	  
	  if(!$resultado){
		$uploadOk = 0;
	  }else{
		$uploadOk = 1;
	  }
	}
	
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
</head>
<body>
    <header>
<?php	
		if($uploadOk == 1){			
		echo "<div id='divThankYou' >
				<section id='ecContactUs'>
					<div id='titlesThankYou'><h22 id='ContactUs'>Noticia creada con exito!</h22>																	
					</div>
					<div style='clear: both'></div>                
					 <span id='message' style='float: left; width:200px; font-size:13px; line-height: 15px;'></span>
                        <div  style= 'text-align:center;  margin-bottom: 20px;'>
                            <a id='contact-submit' style='margin: 0;' href ='news_editor.php'>Go Back</a>
                        </div>  
                    <div style='clear: both;'></div>
				</section>
			</div>";
		//echo "Noticia creada con exito <br>";
		//echo "<a href ='news_editor.php'> Go Back </a>";
	}else{
		echo "<div id='divThankYou' >
				<section id='ecContactUs'>
					<div id='titlesThankYou'><h22 id='ContactUs'>Error! no se pudo crear la noticia. Asegure de ingresar toda la informacion.</h22>
					<h4>".$message."</h4>						
					</div>
					<div style='clear: both'></div>                
					 <span id='message' style='float: left; width:200px; font-size:13px; line-height: 15px;'></span>
                        <div  style= 'text-align:center;  margin-bottom: 20px;'>
                            <a id='contact-submit' style='margin: 0;' href ='news_editor.php'>Go Back</a>
                        </div>  
                    <div style='clear: both;'></div>
				</section>
			</div>";
		//echo "Error no se pudo crear la noticia. Asegure de ingresar toda la informacion. <br>";
		//echo "<a href ='news_editor.php'> Go Back </a>";
	}

}else if($action == "update" ){
	$image_name = basename($_FILES["fileToUpload"]["name"]);
	$id = $_REQUEST["idToUpdate"];
	
	$uploadOk = 1;
	
	if(!empty($image_name)){		
			//echo PPPPPPPP;
			//DELETE ACTUAL IMAGE
			$sentencia = "select image from cdsNews where id = ". $id; 
			$resultado = mysql_query($sentencia, $link);
			$row=mysql_fetch_array($resultado);
			$file = "uploads/".$row["image"]; 
			unlink($file);	
			//END DELETE
			
			
			$target_dir = "uploads/";
			$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
			$uploadOk = 1;
			$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
			$message = "";
			// Check if image file is a actual image or fake image
			if(isset($_POST["submit"])) {
				$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
				if($check !== false) {
					//echo "File is an image - " . $check["mime"] . ".";
					
					$uploadOk = 1;
				} else {
					$message = "File is not an image.";
					//echo "File is not an image.";
					$uploadOk = 0;
				}
			}
			// Check if file already exists
			if (file_exists($target_file)) {
				//echo "Sorry, file already exists. <br>";
				$message = "Sorry, file already exists. <br>";
				
				$uploadOk = 0;
			}
			// Check file size
			if ($_FILES["fileToUpload"]["size"] > 500000) {
				//echo "Sorry, your file is too large. <br>";
				$message = "Sorry, your file is too large. <br>";
				
				$uploadOk = 0;
			}
			// Allow certain file formats
			if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
			&& $imageFileType != "gif" ) {
				//echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed. <br>";
				$message = "Sorry, only JPG, JPEG, PNG & GIF files are allowed. <br>";
				$uploadOk = 0;
			}
			// Check if $uploadOk is set to 0 by an error
			if ($uploadOk == 0) {
				//echo "Sorry, your file was not uploaded. <br>";
				$message = "Sorry, your file was not uploaded. <br>";
			// if everything is ok, try to upload file
			} else {
				if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
					//echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
				} else {
					$message = "Sorry, there was an error uploading your file. <br>";
					//echo "Sorry, there was an error uploading your file. <br>";
					$uploadOk = 0;
				}
			}
			
			
				//echo " <p> " . stripcslashes(nl2br($_REQUEST["area1"] ))."</p>";
		
	}	
	
	if($uploadOk == 1){	
	
		// $pos = 0;
		// $sentencia = "select max(position) as maxim from cdsNews";
		// $resultado = mysql_query($sentencia, $link);
		// $row=mysql_fetch_array($resultado);
		// $pos = $row["maxim"]; 
		 // if(!$resultado){
			$pos = 1;
		  // }else{
			// $pos = $pos + 1;
			
		  // }
		 
		if(!empty($image_name)){	
			$sentencia = "update cdsNews set name = '".$_REQUEST["tituloNew"]."', text = '". stripcslashes(nl2br($_REQUEST["area1"] )) ."', image = '".$image_name."',  link = '".$_REQUEST["linkNew"]."' where id = ".$id ;
		
		}else{
			$sentencia = "update cdsNews set name = '".$_REQUEST["tituloNew"]."', text = '". stripcslashes(nl2br($_REQUEST["area1"] )) ."',  link = '".$_REQUEST["linkNew"]."' where id = ".$id ;
		}
	   // $sentencia = "insert into cdsNews (name, text, image, position,link) values ('".$_REQUEST["tituloNew"]."','". stripcslashes(nl2br($_REQUEST["area1"] )) ."','".$image_name."','".$pos."','".$_REQUEST["linkNew"]."')"; 
 
	    $resultado = mysql_query($sentencia, $link); 
	  
	  if(!$resultado){
		$uploadOk = 0;
	  }else{
		$uploadOk = 1;
	  }
	}

}
	
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
</head>
<body>
    <header>
<?php	
		if($uploadOk == 1){			
		echo "<div id='divThankYou' >
				<section id='ecContactUs'>
					<div id='titlesThankYou'><h22 id='ContactUs'>Noticia editada con exito!</h22>																	
					</div>
					<div style='clear: both'></div>                
					 <span id='message' style='float: left; width:200px; font-size:13px; line-height: 15px;'></span>
                        <div  style= 'text-align:center;  margin-bottom: 20px;'>
                            <a id='contact-submit' style='margin: 0;' href ='news_editor.php'>Go Back</a>
                        </div>  
                    <div style='clear: both;'></div>
				</section>
			</div>";
		//echo "Noticia creada con exito <br>";
		//echo "<a href ='news_editor.php'> Go Back </a>";
	}else{
		echo "<div id='divThankYou' >
				<section id='ecContactUs'>
					<div id='titlesThankYou'><h22 id='ContactUs'>Error! no se pudo editat la noticia. Asegure de ingresar toda la informacion.</h22>
					<h4>".$message."</h4>						
					</div>
					<div style='clear: both'></div>                
					 <span id='message' style='float: left; width:200px; font-size:13px; line-height: 15px;'></span>
                        <div  style= 'text-align:center;  margin-bottom: 20px;'>
                            <a id='contact-submit' style='margin: 0;' href ='news_editor.php'>Go Back</a>
                        </div>  
                    <div style='clear: both;'></div>
				</section>
			</div>";
		//echo "Error no se pudo crear la noticia. Asegure de ingresar toda la informacion. <br>";
		//echo "<a href ='news_editor.php'> Go Back </a>";
	}	
?>
</body>
</html>		