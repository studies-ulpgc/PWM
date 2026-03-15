const reglas = {
    soloLetras: (v) => {
        if (v.length === 0) return "Este campo es obligatorio";
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/.test(v)) return "No se permiten números ni símbolos";
        return true;
    },
    cpValido: (v) => {
        if (v.length === 0) return "El código postal es obligatorio";
        if (!/^[0-9]+$/.test(v)) return "Solo se permiten números";
        if (v.length !== 5) return "Deben ser exactamente 5 dígitos";
        return true;
    },
    calleValida: (v) => {
        if (v.length === 0) return "La calle es obligatoria";
        const regexCalle = /^.+ - [0-9]+$/;
        if (!regexCalle.test(v)) return "Formato requerido: Nombre de la calle - Número";
        return true;
    },
    fechaValida: (v) => {
        if (!v || v === "") return "La fecha de nacimiento es obligatoria";
        return true;
    },
    validarEmailPro: (v) => {
        if (v.length === 0) return "El correo es obligatorio";
        if (!v.includes('@')) return "Falta el símbolo '@'";
        const partes = v.split('@');
        if (!partes[1]) return "Introduce un dominio después del '@'";
        if (!partes[1].includes('.')) return "Falta el punto (ej: .com) en el dominio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Formato de correo no válido";
        return true;
    }
};

function actualizarMensajeError(input, resultadoRegla) {
    const contenedorPadre = input.parentElement;
    let mensajeError = contenedorPadre.querySelector(".error-text");

    if (!mensajeError) {
        mensajeError = document.createElement("span");
        mensajeError.className = "error-text";
        contenedorPadre.appendChild(mensajeError);
    }

    if (resultadoRegla === true) {
        input.classList.remove("input-error");
        mensajeError.style.display = "none";
        mensajeError.textContent = "";
    } else {
        input.classList.add("input-error");
        mensajeError.textContent = resultadoRegla;
        mensajeError.style.display = "block";
    }
}

async function configurarValidaciones() {
    const formulario = document.querySelector(".formulario-contenedor");
    if (!formulario) return;

    formulario.setAttribute("novalidate", true);

    const campos = [
        { id: "calle", regla: reglas.calleValida },
        { id: "cp", regla: reglas.cpValido },
        { id: "provincia", regla: reglas.soloLetras },
        { id: "nombre", regla: reglas.soloLetras },
        { id: "apellido", regla: reglas.soloLetras },
        { id: "fecha", regla: reglas.fechaValida },
        { id: "email", regla: reglas.validarEmailPro }
    ];

    campos.forEach(campo => {
        const elemento = document.getElementById(campo.id);
        if (!elemento) return;

        elemento.addEventListener("input", () => {
            const resultado = campo.regla(elemento.value.trim());
            actualizarMensajeError(elemento, resultado);
        });
        
        if(campo.id === "fecha") {
            elemento.addEventListener("change", () => {
                const resultado = campo.regla(elemento.value.trim());
                actualizarMensajeError(elemento, resultado);
            });
        }
    });

    formulario.addEventListener("submit", (e) => {
        let esTodoValido = true;

        campos.forEach(campo => {
            const elemento = document.getElementById(campo.id);
            if (elemento) {
                const resultado = campo.regla(elemento.value.trim());
                actualizarMensajeError(elemento, resultado);
                
                if (resultado !== true) {
                    esTodoValido = false;
                }
            }
        });

        if (!esTodoValido) {
            e.preventDefault();
            console.log("Formulario bloqueado: faltan campos obligatorios o hay errores.");
        }
    });
}

document.addEventListener("DOMContentLoaded", configurarValidaciones);