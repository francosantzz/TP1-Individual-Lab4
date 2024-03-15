const urlSearch = 'http://168.194.207.98:8081/tp/lista.php?action=BUSCAR';

const barraBusqueda = document.getElementById('container__search__input')
barraBusqueda.addEventListener("keypress", function(event){
    if(event.key === 'Enter'){
        buscarUsuario()
    }
});
function llamada() {
    fetch(urlSearch)
        .then(response => response.json())
        .then(data => cargarUsuarios(data))
        .catch(error => console.log(error));

    limpiarInput();
    
}

function limpiarInput(){
    document.getElementById("container__search__input").value = "";
}

function cargarUsuarios(data) {
    let registros = '';

    
    for(let i = 0; i < data.length; i++){
        registros += crearTabla(data[i]);
    }
    
    

    document.getElementById('users').innerHTML = registros;
}

function crearTabla(usuario) {
    let contenidoTabla = '';

    usuario.bloqueado == "Y" ? contenidoTabla += `<tr class="bloqueado">` : contenidoTabla += `<tr class="desbloqueado">`;

    contenidoTabla += `<td>${usuario.id}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.bloqueado}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.nombre}</td>
                    <td><button onclick="toggleBloqueo(${usuario.id}, 'Y')"><img src="disgusto.png"></button></td>
                    <td><button onclick="toggleBloqueo(${usuario.id}, 'N')"><img src="me-gusta.png"></button></td>
                </tr>`;
    
    return contenidoTabla;
}

const searchInput = document.getElementById('container__search__input');
const searchButton = document.getElementById('container__search__button');

searchButton.addEventListener('click', buscarUsuario);

function buscarUsuario() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        fetch(`http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                mostrarBuscados(data);
            })
            .catch(error => {
                console.error('Error al buscar usuario:', error);
            });
    } 
}

function mostrarBuscados(data) {
    let tabla = '';
    let input = document.getElementById("container__search__input").value;
    let num = 0;

    for(let i = 0; i < data.length; i++){
        if(data[i].usuario.includes(input)) {
            tabla += crearTabla(data[i]);
            num++;
        }
    }
    
    document.getElementById('users').innerHTML = tabla;


    if(num==0){
        mostrarError("Sin Coincidencias");
    }
}

function mostrarError(message) {
    const errorPopup = document.getElementById("errorPopup");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorPopup.style.display = "block";
}

function CerrarPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
}
function toggleBloqueo(id, accion){
    let url = `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=${accion}`;

    fetch(url)
        .then(response => response.json())
        .then(data => buscarUsuario())
        .catch(error => console.log(error));
}



window.addEventListener("load", llamada, false);