// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];
let sorteoRealizado = false;
let resultados = {};

function nuevoSorteo() {
    amigos = [];
    actualizarListaAmigos();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    sorteoRealizado = false;
    resultados = {};
}

function agregarAmigo() {
    if (sorteoRealizado) {
        alert('El sorteo ya se ha realizado. Inicia un nuevo sorteo para continuar.');
        return;
    }

    const amigoInput = document.getElementById('amigo');
    const entrada = amigoInput.value.trim();

    if (entrada) {
        const nombres = entrada.split(/\r\n|\r|\n/);

        nombres.forEach(nombre => {
            const nombreLimpio = nombre.trim();
            if (nombreLimpio) {
                if (/^[A-Za-zÀ-ÿ\s]+$/.test(nombreLimpio)) {
                    const nombreEnMinusculas = nombreLimpio.toLowerCase();
                    const amigosEnMinusculas = amigos.map(amigo => amigo.toLowerCase());

                    if (!amigosEnMinusculas.includes(nombreEnMinusculas)) {
                        amigos.push(nombreLimpio);
                    } else {
                        alert(`"${nombreLimpio}" ya está en la lista.`);
                    }
                } else {
                    alert(`"${nombreLimpio}" contiene caracteres no permitidos y fue omitido.`);
                }
            }
        });

        actualizarListaAmigos();
        amigoInput.value = '';
    }
}

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarAmigo(index));
        li.appendChild(botonEliminar);

        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    if (sorteoRealizado) {
        alert('No puedes eliminar amigos después de que se haya realizado el sorteo.');
        return;
    }

    amigos.splice(index, 1);
    actualizarListaAmigos();
}

function sortearAmigo() {
    if (sorteoRealizado) {
        alert('Realiza nuevo sorteo.');
        return;
    }

    if (amigos.length < 2) {
        alert('Necesitas al menos dos amigos para el sorteo.');
        return;
    }

    if (!nombresDiferentes(amigos)) {
        alert('Necesitas ingresar al menos dos nombres diferentes para el sorteo.');
        return;
    }

    let amigosSorteados = [...amigos];

    for (let i = 0; i < amigos.length * 10; i++) {
        mezclarArray(amigosSorteados);
    }

    while (amigosSorteados.some((amigo, index) => amigo === amigos[index])) {
        mezclarArray(amigosSorteados);
    }

    for (let i = 0; i < amigos.length; i++) {
        resultados[amigos[i]] = amigosSorteados[i];
    }

    mostrarResultados();
    sorteoRealizado = true;
}

function nombresDiferentes(array) {
    if (array.length < 2) {
        return false;
    }

    for (let i = 1; i < array.length; i++) {
        if (array[i] !== array[0]) {
            return true;
        }
    }

    return false;
}

function mostrarResultados() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = `${amigo} le regala a ${resultados[amigo]}`;
        resultado.appendChild(li);
    });
}

function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('amigo').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            agregarAmigo();
        }
    });
});

document.getElementById('agregar').addEventListener('click', agregarAmigo);
document.getElementById('sortear').addEventListener('click', sortearAmigo);
document.getElementById('nuevo').addEventListener('click', nuevoSorteo);
