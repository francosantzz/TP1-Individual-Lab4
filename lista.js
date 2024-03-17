
function limpiarInput(){
    document.getElementById("container__search__input").value = "";
    buscarUsuario();
}

    const searchInput = document.getElementById("container__search__input");
    const searchButton = document.getElementById("container__search__button");
    const tableBody = document.getElementById("users");

    
    const searcher = document.getElementById('container__search__input')
    searcher.addEventListener("keypress", function (event) {
        if (event.key === 'Enter') {
            buscarUsuario()
        }
    });

    function cargarDatos(data) {
        data.sort((a, b) => a.usuario.localeCompare(b.usuario));

        tableBody.innerHTML = ""; 
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan='7' class="no-results">No se encontraron resultados</td></tr>`;
        } else {
            data.forEach(function (usuario) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.bloqueado}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.nombre}</td>
                <td><button class="bloquear-btn" data-id="${usuario.id}"><img src="disgusto.png"></button></td>
                <td><button class="desbloquear-btn" data-id="${usuario.id}"><img src="me-gusta.png"></button></td>
            `;
                tr.classList.add(usuario.bloqueado === "Y" ? "bloqueado" : "desbloqueado");
                tableBody.appendChild(tr);
            });
        }
    }

    function buscarUsuario() {
        const searchTerm = searchInput.value.trim();
        fetch(`http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=${searchTerm}`)
            .then(response => response.json())
            .then(data => cargarDatos(data))
            .catch(error => {
                console.error("Error al buscar usuarios:", error);
                alert("Ocurrió un error al buscar usuarios. Por favor, inténtalo de nuevo.");
            });
    }

    searchButton.addEventListener("click", buscarUsuario);
    buscarUsuario();

    tableBody.addEventListener("click", function (event) {
        if (event.target.closest(".bloquear-btn")) {
            const userId = event.target.closest(".bloquear-btn").dataset.id;
            bloquearUsuario(userId, "Y");
        } else if (event.target.closest(".desbloquear-btn")) {
            const userId = event.target.closest(".desbloquear-btn").dataset.id;
            bloquearUsuario(userId, "N");
        }
    });

    function bloquearUsuario(userId, estado) {
        fetch(`http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${userId}&estado=${estado}`)
            .then(response => {
                if (response.ok) {
                    buscarUsuario();
                } else {
                    throw new Error("Error al bloquear/desbloquear usuario");
                }
            })
            .catch(error => {
                console.error("Error al bloquear/desbloquear usuario:", error);
                alert("Ocurrió un error al bloquear/desbloquear usuario. Por favor, inténtalo de nuevo.");
            });
    }
