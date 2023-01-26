export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo email no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "Este campo password está vacío",
        patternMismatch: "Al menos 6 caracteres máximo 12 debe contener una letra minúscula una mayúscula un número y ningun caracter especial.",
    },
    nacimiento: {
        valueMissing: "Este cmapo fecha está vacío",
        customError: "Debes tener al menos 18 años",
    },
    numero: {
        valueMissing: "Este campo numero está vacío",
        patternMismatch: "El formato requerido es XXXXXXXXX 10 números",
    },
    direccion: {
        valueMissing: "Este camp dirección está vacío",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este camp dirección está vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "Este camp dirección está vacío",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje ="";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;

}
//se trabajarán con data-atribute
/*
const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});
*/

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje ="";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return (diferenciaFechas <= fechaActual);
}