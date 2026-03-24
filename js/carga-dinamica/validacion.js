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
    validarEmail: (v) => {
        if (v.length === 0) return "El correo es obligatorio";
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
    },
    alfanumerico: (v) => {
        if (v.length === 0) return "Este campo es obligatorio";
        if (v.length < 5) return "Por favor, da un poco más de detalle (mín. 5 caracteres)";
        return true;
    },
    selectorRelleno: (v) => {
        if (!v || v === "") return "Debes seleccionar un motivo";
        return true;
    },
    cuponOpcional: (v) => {
        if (v.length === 0) return true;
        const regexCupon = /^[a-zA-Z0-9]{6,}$/;
        if (!regexCupon.test(v)) return "Formato de cupón no válido (mín. 6 caracteres alfanuméricos)";
        return true;
    },
    tarjetaRegaloOpcional: (v) => {
        if (v.length === 0) return true;
        const regexGiftCard = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/;
        if (!regexGiftCard.test(v)) return "Formato requerido: XXXX-XXXX-XXXX";
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
    const btnRegistro = document.querySelector(".boton-negro");
    const form = document.querySelector(".formulario-contenedor");
    if (!btnRegistro || !form) return;

    btnRegistro.removeAttribute("onclick");

    const campos = [
        { id: "email", regla: reglas.validarEmail },
        { id: "nombre", regla: reglas.soloLetras },
        { id: "apellidos", regla: reglas.soloLetras },
        { id: "fecha", regla: reglas.fechaValida },
        { id: "password", regla: reglas.passwordValida }
    ];

    campos.forEach(campo => {
        const el = document.getElementById(campo.id);
        if (el) el.addEventListener("input", () => actualizarMensajeError(el, campo.regla(el.value.trim())));
    });

    const passEl = document.getElementById("password");
    const confirmEl = document.getElementById("confirm-password");
    if (confirmEl) {
        confirmEl.addEventListener("input", () => {
            actualizarMensajeError(confirmEl, reglas.confirmarPassword(confirmEl.value.trim(), passEl.value.trim()));
        });
    }

    btnRegistro.addEventListener("click", () => {
        let esValido = true;

        campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            const res = campo.regla(el.value.trim());
            actualizarMensajeError(el, res);
            if (res !== true) esValido = false;
        });

        const resConfirm = reglas.confirmarPassword(confirmEl.value.trim(), passEl.value.trim());
        actualizarMensajeError(confirmEl, resConfirm);
        if (resConfirm !== true) esValido = false;

        if (esValido) {
            simularRegistro();
        }
    });
}

function inicializarValidacionDireccion(form) {
    form.setAttribute("novalidate", true);
    const campos = [
        { id: "calle", regla: reglas.calleValida },
        { id: "cp", regla: reglas.cpValido },
        { id: "provincia", regla: reglas.soloLetras },
        { id: "nombre", regla: reglas.soloLetras },
        { id: "apellido", regla: reglas.soloLetras },
        { id: "fecha", regla: reglas.fechaValida },
        { id: "email", regla: reglas.validarEmail }
    ];

    campos.forEach(campo => {
        const el = document.getElementById(campo.id);
        if (el) el.addEventListener("input", () => actualizarMensajeError(el, campo.regla(el.value.trim())));
    });

    form.addEventListener("submit", (e) => {
        let esValido = true;
        campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            const res = campo.regla(el.value.trim());
            actualizarMensajeError(el, res);
            if (res !== true) esValido = false;
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

    const campos = [
        { id: "motivo", regla: reglas.selectorRelleno },
        { id: "asunto", regla: reglas.alfanumerico },
        { id: "descripcion", regla: reglas.alfanumerico }
    ];

    campos.forEach(campo => {
        const el = document.getElementById(campo.id);
        if (!el) return;

        const evento = el.tagName === "SELECT" ? "change" : "input";
        
        el.addEventListener(evento, () => {
            actualizarMensajeError(el, campo.regla(el.value.trim()));
        });
    });

    form.addEventListener("submit", (e) => {
        let esValido = true;
        campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            const res = campo.regla(el.value.trim());
            actualizarMensajeError(el, res);
            if (res !== true) esValido = false;
        });

        if (!esValido) {
            e.preventDefault();
        } else {
            alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
        }
    });
}

function inicializarValidacionPago() {
    const btnPagar = document.querySelector(".footer-pago .boton-negro");
    const inputsPago = document.querySelectorAll(".entrada-texto-pago");
    const inputCupon = inputsPago[0];
    const inputTarjeta = inputsPago[1];

    if (!btnPagar || !inputCupon) return;

    inputCupon.addEventListener("input", () => {
        actualizarMensajeError(inputCupon, reglas.cuponOpcional(inputCupon.value.trim()));
    });

    inputTarjeta.addEventListener("input", () => {
        actualizarMensajeError(inputTarjeta, reglas.tarjetaRegaloOpcional(inputTarjeta.value.trim()));
    });

    btnPagar.addEventListener("click", (e) => {
        const resCupon = reglas.cuponOpcional(inputCupon.value.trim());
        const resTarjeta = reglas.tarjetaRegaloOpcional(inputTarjeta.value.trim());

        actualizarMensajeError(inputCupon, resCupon);
        actualizarMensajeError(inputTarjeta, resTarjeta);

        if (resCupon === true && resTarjeta === true) {
            console.log("Procesando pago...");
            alert("¡Pago procesado con éxito!");
            window.location.href = "index.html";
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