const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners(){
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
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
        }
    }

// Inserta en la base de datos via Ajax
function inserarBD(datos){
    //Llamado a Ajax

    //Crear el objeto
    const xhr = new XMLHttpRequest();

    //Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    //Pasar los datos
    xhr.onload = function(){
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //Leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta.empresa);
        }
    }

    //Enviar los datos
    xhr.send(datos);
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