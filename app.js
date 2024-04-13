// Botones tamaño texto menu principal
let tamañoTexto = 28; // Tamaño de texto base en píxeles

function btnAumentarTexto() {
    tamañoTexto += 2;
    document.getElementById('hdr-title-text').style.fontSize = tamañoTexto + 'px';
}

function btnDisminuirTexto() {
    tamañoTexto -= 2;
    document.getElementById('hdr-title-text').style.fontSize = tamañoTexto + 'px';
}

// Clases alimentos
class Destino {
    constructor(nombre, ubicacion, actividades) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.actividades = actividades;
    }
}

class Ciudad extends Destino {
    constructor(nombre, ubicacion, actividades, clima) {
        super(nombre, ubicacion, actividades);
        this.clima = clima;
    }
}

class Playa extends Destino {
    constructor(nombre, ubicacion, actividades, temperaturaAgua) {
        super(nombre, ubicacion, actividades);
        this.temperaturaAgua = temperaturaAgua;
    }
}

// Instancias de las clases

// Tres instancias adicionales de la clase Destino
const destino1 = new Destino('Pollo', 'Carne', ['3 veces por semana', 'Cocinar a la plancha']);
const destino2 = new Destino('Rape', 'Pescado', ['4 veces por semana', 'Cocinar al vapor']);
const destino3 = new Destino('Manzana', 'Fruta', ['1 cada día', 'Super sano y portátil!']);

// Tres instancias adicionales de la clase Ciudad
const ciudad1 = new Ciudad('Judía verde', 'Verduras', ['3 veces por semana', 'Se puede compartir con el perro'], 'Verde');
const ciudad2 = new Ciudad('Brocoli', 'Verduras', ['2 veces por semana', 'O te gusta o lo odias'], 'Verde claro');
const ciudad3 = new Ciudad('Gambas', 'Pescado', ['Tienen una forma divertida', 'No comer en exceso'], 'Rojo');
const ciudad4 = new Ciudad('Plátano', 'Frutas', ['El secreto de los tenistas', 'Comer 1 con el desayuno'], 'Maduro');
const ciudad5 = new Ciudad('Kiwi', 'Fruta', ['De textura y color sin igual', 'Suele ir bien con yogur'], 'Marrón');

// Tres instancias adicionales de la clase Playa
const playa1 = new Playa('Sushi', 'Asiático', ['Nutritivo', 'Arroz'], 'Variado');
const playa2 = new Playa('Gyoza', 'Asiático', ['Carne', 'Verduras'], 'Vapor');
const playa3 = new Playa('Rollito de primavera', 'Asiático', ['Frito', 'Verduras'], 'Variado');


const destinos = [destino1, destino2, destino3, ciudad1, ciudad2, ciudad3, ciudad4, ciudad5, playa1, playa2, playa3];
document.addEventListener("DOMContentLoaded", function() {
    const destinosSection = document.getElementById('destinos');
    const resultadosSection = document.getElementById('resultados');
    const resultadosComparacion = document.getElementById('resultadosComparacion');

    let duracionTotalMax = 0;
    
    // Función para agregar campo de destino
    function agregarCampoDestino() {
        const nuevoCampo = document.createElement ('div');
        nuevoCampo.innerHTML = `
            <label for="destino">Alimento:</label>
            <select name="destino" onchange="mostrarOpciones(this)">
                <option value="seleccionar" disabled selected>Seleccionar</option>
                ${crearOpcionesDestinos()}
            </select>
            <div id="opciones"></div>
            <label for="duracion">Consumo (días):</label>
            <input class="textBox" type="text" name="duracion" placeholder="Ingrese el total de días" aria-required="true" autocomplete="number" required>
        `;
        destinosSection.appendChild(nuevoCampo);
    }

    // Función para crear las opciones del desplegable
    function crearOpcionesDestinos() {
        let opciones = '';
        destinos.forEach(destino => {
            opciones += `<option value="${destino.nombre}">${destino.nombre}</option>`;
        });
        return opciones;
    }

    // Función para mostrar opciones específicas según el destino seleccionado
    function mostrarOpciones(select) {
        const opcionSeleccionada = select.value;
        const opcionesDiv = select.nextElementSibling;

        // Limpiar opciones anteriores
        opcionesDiv.innerHTML = '';

        // Encontrar el destino seleccionado
        const destinoSeleccionado = destinos.find(destino => destino.nombre === opcionSeleccionada);

    
    }


// Función para calcular el itinerario
    function calcularItinerario() {
        let duracionTotal = 0;

        let resultadosHTML = `
            <h2>Resultados:</h2>
            <table>
                <tr>
                    <th>Alimento</th>
                    <th>Consumo (días)</th>
                    <th>Observaciones</th>
                    <th>Comentarios</th>
                </tr>
        `;

        const destinosInputs = document.getElementsByName('destino');
        const duracionesInputs = document.getElementsByName('duracion');

        for (let i = 0; i < destinosInputs.length; i++) {
            const tipoDestino = destinosInputs[i].value;
            const duracion = parseInt(duracionesInputs[i].value);

            // Validar duración ingresada
            if (isNaN(duracion) || duracion <= 0) {
                alert('Por favor, ingrese un alimento ' + destinosInputs[i].value);
                return;
            }

            let actividadesSugeridas = '';
            let mejorEpoca = '';

            // Buscar el destino seleccionado en la lista de destinos
            const destinoSeleccionado = destinos.find(destino => destino.nombre === tipoDestino);

            if (destinoSeleccionado) {
                // Asignar actividades sugeridas según tipo de destino
                if (destinoSeleccionado instanceof Ciudad || destinoSeleccionado instanceof Playa || destinoSeleccionado instanceof Destino) {
                    actividadesSugeridas = destinoSeleccionado.actividades.join(', ');
                }

                // Determinar mejor época para viajar
                if (destinoSeleccionado instanceof Ciudad) {
                    mejorEpoca = 'Mediodía o noche';
                } else if (destinoSeleccionado instanceof Playa) {
                    mejorEpoca = 'Mediodía';
                } else if (destinoSeleccionado instanceof Destino) {
                    mejorEpoca = 'Cualquier momento – según planificación';
                }

                // Agregar fila a la tabla de resultados
                resultadosHTML += `
                    <tr>
                        <td>${destinoSeleccionado.nombre}</td>
                        <td>${duracion}</td>
                        <td>${actividadesSugeridas}</td>
                        <td>${mejorEpoca}</td>
                    </tr>
                `;

                duracionTotal += duracion;
            }
        }

        resultadosHTML += `</table>`;
        resultadosSection.innerHTML = resultadosHTML;

        // Mostrar duración total del viaje
        alert('El consumo es de ' + duracionTotal + ' días.');
        duracionTotalMax = duracionTotal;

    }

function calcularComparacion(){

    let diasMaximos = document.getElementById('comparacionDias');
    let valorMaximo = parseFloat(diasMaximos.value);

    if(duracionTotalMax > valorMaximo){
        let diasSobrantes = duracionTotalMax - valorMaximo;
        resultadosComparacion.innerHTML = `<p> ¡Te has pasado de días! (Tienes que eliminar ${diasSobrantes} días de tu plan) </p>`;
    } else if(duracionTotalMax == valorMaximo){
        resultadosComparacion.innerHTML = `<p> ¡Has planificado la duración de tus días a la perfección! No te sobran ni te faltan días. </p>`;
    } else{
        let diasRestantes = valorMaximo - duracionTotalMax;
        resultadosComparacion.innerHTML = `<p> Aún puedes añadir más días a tu rutina (${diasRestantes} días restantes). </p>`;
    }
}


// Evento para agregar campo de destino al hacer clic en un botón
document.getElementById('agregar-destino').addEventListener('click', agregarCampoDestino);

// Evento para calcular el itinerario al hacer clic en un botón
document.getElementById('calcular-itinerario').addEventListener('click', calcularItinerario);

// Evento para calcular la comparación de días al hacer clic en un botón
document.getElementById('calcular-comparacion').addEventListener('click', calcularComparacion);

});


// Manejo de errores

function control() {
    if (document.getElementsByClassName('textBox') == null
        || document.getElementById('uname') == "") {
        alert("El campo no puede estar vacío.");
        document.getElementById('uname').focus();
        return false;
    }
    return true;
}
