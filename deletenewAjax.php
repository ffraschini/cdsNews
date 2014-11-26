<?php
require_once("connect.php"); 
	
	$rows = array();
	$id = $_POST['id'];
	//$id = 12;
	$sentencia = "select image from cdsNews where id = ". $id; 
	$resultado = mysql_query($sentencia, $link);
	$row=mysql_fetch_array($resultado);
	$file = "uploads/".$row["image"]; 	
	
	$sentencia = "delete from cdsNews where id = ". $id; 
	$resultado = mysql_query($sentencia, $link);
	if(!$resultado){
		echo "error";
	}else{	
		unlink($file);
		
	//UPDATE NEWS POSITIONS
		
		$sentencia = "select * from cdsNews order by position asc"; 
		$resultado = mysql_query($sentencia, $link); 
		$pos = 1;
		while ($fila = mysql_fetch_assoc($resultado)) {
			$sentenciaAux = "update cdsNews set position =".$pos." where id = ".$fila['id']; 
			$resultadoAux = mysql_query($sentenciaAux, $link); 
			$pos = $pos + 1;
		}
		
		
	//FIN	
		$sentencia = "select * from cdsNews order by position asc"; 
		$resultado = mysql_query($sentencia, $link); 
		
		if(!$resultado){
		echo "error";
		}
		
		while ($fila = mysql_fetch_assoc($resultado)) {
			$rows[] = $fila;
		}
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($rows, JSON_FORCE_OBJECT);
	
	}
	
	
	
	

?>