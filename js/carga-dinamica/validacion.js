const reglas = {
    soloLetras: (v) => {
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/.test(v)) return "No se permiten números ni símbolos";
        return true;
    },
    cpValido: (v) => {
        if (!/^[0-9]+$/.test(v)) return "Solo se permiten números";
        if (v.length !== 5) return "Deben ser exactamente 5 dígitos";
        return true;
    },
    calleValida: (v) => {
        const regexCalle = /^.+ - [0-9]+$/;
        if (!regexCalle.test(v)) return "Formato requerido: Nombre de la calle - Número";
        return true;
    },
    fechaValida: (v) => {
        return true;
    },
    validarEmail: (v) => {
        if (!v.includes('@')) return "Falta el símbolo '@'";
        const partes = v.split('@');
        if (!partes[1]) return "Introduce un dominio después del '@'";
        if (!partes[1].includes('.')) return "Falta el punto (ej: .com) en el dominio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Formato de correo no válido";
        return true;
    },
    passwordValida: (v) => {
        if (v.length === 0) return "La contraseña es obligatoria";
        if (v.length < 4) return "Contraseña demasiado corta";
        return true;
    },
    confirmarPassword: (v, original) => {
        if (v.length === 0) return "Debes repetir la contraseña";
        if (v !== original) return "Las contraseñas no coinciden";
        return true;
    }
};


function actualizarMensajeError(input, resultadoRegla) {
    if (!input) return;
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
    } else {
        input.classList.add("input-error");
        mensajeError.textContent = resultadoRegla;
        mensajeError.style.display = "block";
    }
}


function inicializarValidacionRegistro() {
    const form = document.querySelector(".formulario-contenedor");
    if (!form) return;

    form.setAttribute("novalidate", true);

    const inputs = form.querySelectorAll("input");
    const passEl = document.getElementById("password");
    const confirmEl = document.getElementById("confirm-password");

    inputs.forEach(el => {
        el.addEventListener("input", () => {
            if (el.validity.valueMissing) {
                actualizarMensajeError(el, "Este campo es obligatorio");
            } 
            else {
                let resultado = true;
                const valor = el.value.trim();

                if (el.id === "email") resultado = reglas.validarEmail(valor);
                else if (el.id === "nombre" || el.id === "apellidos") resultado = reglas.soloLetras(valor);
                else if (el.id === "password") resultado = reglas.passwordValida(valor);
                else if (el.id === "confirm-password") {
                    resultado = reglas.confirmarPassword(valor, passEl.value.trim());
                }
                actualizarMensajeError(el, resultado);
            }
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let esValido = true;

        inputs.forEach(el => {
            el.dispatchEvent(new Event("input"));
            if (el.classList.contains("input-error")) esValido = false;
        });

        if (esValido) simularRegistro(); 
    });
}

function inicializarValidacionDireccion(form) {
    form.setAttribute("novalidate", true);

    const inputs = form.querySelectorAll("input");

    inputs.forEach(el => {
        el.addEventListener("input", () => {
            if (el.validity.valueMissing) {
                actualizarMensajeError(el, "Este campo es obligatorio");
            } 
            else {
                let resultado = true;
                const valor = el.value.trim();

                if (el.id === "calle") resultado = reglas.calleValida(valor);
                else if (el.id === "cp") resultado = reglas.cpValido(valor);
                else if (el.id === "provincia" || el.id === "nombre" || el.id === "apellido") {
                    resultado = reglas.soloLetras(valor);
                }
                else if (el.id === "email") resultado = reglas.validarEmail(valor);

                actualizarMensajeError(el, resultado);
            }
        });
    });

    form.addEventListener("submit", (e) => {
        let esValido = true;
        inputs.forEach(el => {
            el.dispatchEvent(new Event("input"));
            
            if (el.classList.contains("input-error")) esValido = false;
        });

        if (!esValido) e.preventDefault();
    });
}

function inicializarValidacionLogin() {
    const btnLogin = document.querySelector(".boton-negro");
    const emailEl = document.getElementById("email");
    const passEl = document.getElementById("password");

    btnLogin.removeAttribute("onclick");

    emailEl.addEventListener("input", () => actualizarMensajeError(emailEl, reglas.validarEmail(emailEl.value.trim())));
    passEl.addEventListener("input", () => actualizarMensajeError(passEl, reglas.passwordValida(passEl.value.trim())));

    btnLogin.addEventListener("click", () => {
        const resEmail = reglas.validarEmail(emailEl.value.trim());
        const resPass = reglas.passwordValida(passEl.value.trim());

        actualizarMensajeError(emailEl, resEmail);
        actualizarMensajeError(passEl, resPass);

        if (resEmail === true && resPass === true) {
            simularLogin();
        }
    });
}

function inicializarValidacionContacto(form) {
    form.setAttribute("novalidate", true);

    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach(el => {
        const evento = el.tagName === "SELECT" ? "change" : "input";
        
        el.addEventListener(evento, () => {
            if (el.validity.valid) {
                actualizarMensajeError(el, true);
            } else {
                let mensaje = "Este campo es obligatorio";
                if (el.validity.tooShort) mensaje = `Mínimo ${el.minLength} caracteres`;
                
                actualizarMensajeError(el, mensaje);
            }
        });
    });

    form.addEventListener("submit", (e) => {
        let esValido = true;

        inputs.forEach(el => {
            if (!el.validity.valid) {
                esValido = false;
                let mensaje = "Este campo es obligatorio";
                if (el.validity.tooShort) mensaje = `Mínimo ${el.minLength} caracteres`;
                actualizarMensajeError(el, mensaje);
            }
        });

        if (!esValido) {
            e.preventDefault();
        } else {
            alert("Formulario enviado con éxito!");
        }
    });
}

function inicializarValidacionPago() {
    const btnPagar = document.querySelector(".footer-pago .boton-negro");
    const inputsPago = document.querySelectorAll(".entrada-texto-pago");

    if (!btnPagar || inputsPago.length === 0) return;

    inputsPago.forEach(input => {
        input.addEventListener("input", () => {
            if (input.validity.valid) {
                actualizarMensajeError(input, true);
            } else {
                actualizarMensajeError(input, input.title || "Formato no válido");
            }
        });
    });

    btnPagar.addEventListener("click", (e) => {
        let esValido = true;

        inputsPago.forEach(input => {
            if (!input.validity.valid) {
                esValido = false;
                actualizarMensajeError(input, input.title || "Formato no válido");
            }
        });

        if (esValido) {
            console.log("Procesando pago...");
            alert("¡Pago procesado con éxito!");
        } else {
            e.preventDefault();
            console.warn("Revisa los códigos promocionales");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id === "pagar") {
        inicializarValidacionPago();
    }
    const formContenedor = document.querySelector(".formulario-contenedor");
    if (formContenedor && document.getElementById("motivo")) {
        inicializarValidacionContacto(formContenedor);
    }
    else if (formContenedor && document.getElementById("calle")) {
        inicializarValidacionDireccion(formContenedor);
    }
    else if (document.getElementById("confirm-password")) {
        inicializarValidacionRegistro();
    }
    else if (document.getElementById("password")) {
        inicializarValidacionLogin();
    }
});