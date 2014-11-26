<?php
require_once("connect.php");

	$idUp = $_POST['idUp'];
	$idDown = $_POST['idDown'];
	$posUp = $_POST['posUp'];
	$posDown = $_POST['posDown'];	
	
	$sentencia = "update cdsNews set position =".$posUp." where id = ". $idUp; 
	$resultado = mysql_query($sentencia, $link);
	$sentencia = "update cdsNews set position =".$posDown." where id = ". $idDown; 
	$resultado = mysql_query($sentencia, $link);
	
 

?>