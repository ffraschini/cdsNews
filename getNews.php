<?php
require_once("connect.php"); 
	
	$rows = array();
	$id = $_POST['id'];
		
	//FIN	
		$sentencia = "select * from cdsNews where id = ". $id;  
		$resultado = mysql_query($sentencia, $link); 
		
		if(!$resultado){
		echo "error";
		}
		
		while ($fila = mysql_fetch_assoc($resultado)) {
			$rows[] = $fila;
		}
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($rows, JSON_FORCE_OBJECT);
	
	
	
	
	
	

?>