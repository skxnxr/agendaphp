const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners(){
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    //Listener para eliminar el boton
    if(listadoContactos){
        listadoContactos.addEventListener('click', eliminarContacto)
    }

    //Buscador
    inputBuscador.addEventListener('input', buscarContactos)

    numeroContactos();
}
function leerFormulario(e){
    e.preventDefault();
    
    //leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        //Dos parametros, texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        // mostrarNotificacion('Contacto creado correctamente', 'exito');

    }else{
        //Pasa la validacion, crea llamado a AJAX
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // console.log(...infoContacto);

        if (accion === 'crear') {
            //Crearemos un nuevo contacto
            inserarBD(infoContacto);
        }else{
            //Editar el contacto
            //leer el id
            const idRegistro = document.querySelector('#id').value; 
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);

        }
    }
}

function inserarBD(datos){
    // Inserta en la base de datos via Ajax
    //Llamado a Ajax

    //Crear el objeto
    const xhr = new XMLHttpRequest();

    //Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    //Pasar los datos
    xhr.onload = function() {
          if(this.status === 200) {
               console.log(JSON.parse( xhr.responseText) ); 
               // leemos la respuesta de PHP
               const respuesta = JSON.parse( xhr.responseText);

               // Inserta un nuevo elemento a la tabla
               const nuevoContacto = document.createElement('tr');

               nuevoContacto.innerHTML = `
                    <td>${respuesta.datos.nombre}</td>
                    <td>${respuesta.datos.empresa}</td>
                    <td>${respuesta.datos.telefono}</td>
               `;

               // crear contenedor para los botones
               const contenedorAcciones = document.createElement('td');

               // crear el icono de Editar
               const iconoEditar = document.createElement('i');
               iconoEditar.classList.add('fas', 'fa-pen-square');

               // crea el enlace para editar
               const btnEditar = document.createElement('a');
               btnEditar.appendChild(iconoEditar);
               btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
               btnEditar.classList.add('btn', 'btn-editar');

               // agregarlo al padre
               contenedorAcciones.appendChild(btnEditar);

               // crear el icono de eliminar
               const iconoEliminar = document.createElement('i');
               iconoEliminar.classList.add('fas', 'fa-trash-alt');

               // crear el boton de eliminar
               const btnEliminar = document.createElement('button');
               btnEliminar.appendChild(iconoEliminar);
               btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
               btnEliminar.classList.add('btn', 'btn-borrar');

               // agregarlo al padre
               contenedorAcciones.appendChild(btnEliminar);

               // Agregarlo al tr
               nuevoContacto.appendChild(contenedorAcciones);

               // agregarlo con los contactos
               listadoContactos.appendChild(nuevoContacto);       
               
               // Resetear el formulario
               document.querySelector('form').reset();

               // Mostrar la notificacion
               mostrarNotificacion('Contacto Creado Correctamente', 'correcto');

               // Actualizar el número
               numeroContactos();
          }
     }

    //Enviar los datos
    xhr.send(datos);
}

function actualizarRegistro(datos){
    // console.log(...datos);
    //Crear el objeto
    const xhr = new XMLHttpRequest();

    //Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    //Leer la respuesta
    xhr.onload = function(){
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);
            // console.log(respuesta);
            if(respuesta.respuesta === 'correcto'){
                //Mostrar notificacion
                mostrarNotificacion('Contacto editado correctamente', 'correcto')
            }else{
                //Hubo un error
                mostrarNotificacion('Hubo un error', 'error')
            }
            //Despues de 3 segundos redireccionar
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);
        }
    }

    //Enviar la peticion
    xhr.send(datos);

}

//Eliminar el contacto
function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        //Tomar el id del elemento a eliminar
        const id = e.target.parentElement.getAttribute('data-id');
        // console.log(id);

        //Preguntar al usuario si esta seguro
        const respuesta = confirm('¿Estas seguro?');
        if (respuesta) {
            //Llamado a Ajax
            //Crear el objeto
            const xhr = new XMLHttpRequest();

            //Abrir la conexion
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            //Leer la respuesta
            xhr.onload = function() {
                if (this.status === 200) {
                     const resultado = JSON.parse(xhr.responseText);
                    //  console.log(resultado);

                    if (resultado.respuesta == 'correcto') {
                        //Eliminar el registro del DOM
                        e.target.parentElement.parentElement.parentElement.remove();
                        
                        //Mostrar noficiacion
                        mostrarNotificacion('Contacto eliminado', 'correcto');
                        // Actualizar el número
                        numeroContactos();
                    }else{
                        mostrarNotificacion('Hubo un error...', 'error');
                    }
                }
            }
            //Enviar la peticion
            xhr.send();
        }
    }
}

//Notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //Formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y mostrar la notificación
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}

/** Buscador de registros */
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i" );
          registros = document.querySelectorAll('tbody tr');

          registros.forEach(registro => {
               registro.style.display = 'none';

               if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){
                    registro.style.display = 'table-row';
               }
               numeroContactos();
          })
}

/** Muestra el número de Contactos */
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
         contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
         if(contacto.style.display === '' || contacto.style.display === 'table-row'){
              total++;
         }
    });

    // console.log(total);
    contenedorNumero.textContent = total;
}