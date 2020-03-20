<?php 
     include 'inc/funciones/funciones.php';
     include 'inc/layout/header.php';

     // echo "<pre>";
     // var_dump($_GET);
     // echo "</pre>";

     $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
     // var_dump($id);

     if (!$id) {
          die('No es válido');
     }

     $resultado = obtenerContacto($id);
     $contacto = $resultado->fetch_assoc();

?>
<!-- <pre>
     <?php var_dump($contacto); ?>
</pre> -->


<div class="contenedor-barra">
     <div class="contenedor barra">
         <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar contacto</h1>
     </div>
</div>

<div class="bg-amarillo contenedor sombra">
     <form action="#" id="contacto">
          <legend>Edite el contacto <br> <span>Todos los campos son obligatorios</span></legend>
          <?php include 'inc/layout/formulario.php'; ?>
    </form>
</div> 



<?php include 'inc/layout/footer.php'; ?>