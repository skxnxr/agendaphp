<div class="campos">
               <div class="campo">
                    <label for="nombre"> Nombre:</label>
                    <input type="text" placeholder="Nombre de contacto" id="nombre" value ="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : ''; ?>">
               </div>
               <div class="campo">
                    <label for="empresa">Empresa:</label>
                    <input type="text" placeholder="Nombre empresa" id="empresa" value ="<?php echo ($contacto['empresa']) ? $contacto['empresa'] : ''; ?>">
               </div>
               <div class="campo">
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" placeholder="Telefono de contacto" id="telefono" value ="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>">
               </div>

          </div>
               <div class="campo enviar">
               <?php 
                    //Operador ternario
                    $textoBtn = ($contacto['telefono']) ? 'Guardar' : 'Añadir';
                    $accion = ($contacto['telefono']) ? 'Editar' : 'Crear';
               ?>
                    <input type="hidden" value="<?php echo $accion; ?>" id="accion">
                    <?php if(isset($contacto['id'])) { ?>
                         <input type="hidden" value="<?php echo $contacto['id']; ?>" id="id">
                    <?php } ?>
                    <input type="submit" value="<?php echo $textoBtn; ?>">
               </div> 