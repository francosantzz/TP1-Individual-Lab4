function login() {
    event.preventDefault();

    const user = { username: document.getElementById("user").value ,
                password: document.getElementById("password").value };
    const url = `http://168.194.207.98:8081/tp/login.php?user=${user.username}&pass=${user.password}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.respuesta == "ERROR") {
                mostrarError("Error: Nombre de usuario o contraseña incorrectos")
            }
            else {location.href = 'http://127.0.0.1:5500/lista.html';}
        })
        .catch(error => alert(error));
};
function mostrarError(message) {
    const errorPopup = document.getElementById("errorPopup");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorPopup.style.display = "block";
}

function cerrarPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
}