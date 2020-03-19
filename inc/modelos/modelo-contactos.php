<?php

if($_POST['accion'] == 'crear'){
     //Creará un nuevo registro en la BD
     require_once('../funciones/bd.php');

     // //Validar las entradas
     $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
     $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
     $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

     try {
          $stmt = $conn->prepare("INSERT INTO contactos(nombre, empresa, telefono) VALUES(?,?,?)");
          $stmt->bind_param("sss", $nombre, $empresa, $telefono);
          $stmt->execute();
          $respueta = array(
                          'respuesta' => 'correcto',
                          'info' => $stmt);
          // if ($stmt->affected_rows == 1) {
          //      $respueta = array(
          //           'respuesta' => 'correcto',
          //           'id_insertado' => $stmt->insert_id,
          //           'datos' => array(
          //                'nombre' => $nombre,
          //                'empresa' => $empresa,
          //                'telefono' => $telefono,
                        
          //           );
          //      ); echo json_encode($respueta);
          // }
          $stmt->close();
          $conn->close();
     } catch (Exception $e) {
          $respueta = array(
               'error' => $e->getMessage()
          );
     }
echo json_encode($respueta);
     
}










?>