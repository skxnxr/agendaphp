<?php 
    //  include 'inc/funciones/funciones.php';
     include 'inc/layout/header.php';
?>

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