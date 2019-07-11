var socket = io();

var params = new URLSearchParams( window.location.search);
if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

var usuario = {
    nombre : params.get('nombre'),
    sala : params.get('sala')
};

// "on" Escuchar
socket.on('connect', function(){
    console.log('conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){
    });

});
socket.on('disconnect', function(){
    console.log('perdimos conexion con el servidor');
    
});
//"emit" Enviar informacion
socket.emit('enviarMensaje', {
    mensaje : 'Hola server'
}, function(resp){
    console.log('respuesta server : ', resp);
});

socket.on('crearMensaje', function(mensaje){
    console.log('Servidor : ', mensaje);            
});

//Escuchar cambios de usuarios
//Cuando un usuario ingresa o abandona el chat
socket.on('listaPersonas', function(personas){
    console.log('personas', personas);            
});

//Mensaje privado
//El emit se realiza por consola
socket.on('mensajePrivado', function(mensaje){
    console.log('mensaje Privado', mensaje);
})