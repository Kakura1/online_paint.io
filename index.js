const canvas = document.getElementById('pizarra');
const ctx = canvas.getContext('2d');
const pencil = document.getElementById('pencil');
const brocha = document.getElementById('brocha');
const eraser = document.getElementById('eraser');
const rectangulo = document.getElementById('rectangulo');
const circulo = document.getElementById('circulo');
const triangulo = document.getElementById('triangulo');
const range = document.getElementById('ancho');
const clear = document.getElementById('clear');
const save = document.getElementById('save');
canvas.width = 1400;
canvas.height = 800;

canvas.style.backgroundColor = '#F5F5F5';

const opciones = ['lapiz', 'brocha', 'borrador', 'rectangulo', 'circulo', 'triangulo'];
let opcion_seleccionada = '';
var cords_triangulo = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    width: 0,
    height: 0
};
var cords_rectangulo = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    width: 0,
    height: 0
}
var cords_circulo = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    radio_1: 0,
    radio_2: 0,
}

var dibujar = false;


let color = document.getElementById('color');
var color_ant;

canvas.addEventListener("mousedown", (e) => {
    color_ant = color.value;
    switch (opcion_seleccionada) {
        case 'lapiz':
            dibujar = true;
            break;
        case 'brocha':
            dibujar = true;
            break;
        case 'borrador':
            dibujar = true;
            break;
        case 'rectangulo':
            dibujar = true;
            cords_rectangulo.x1 = e.x;
            cords_rectangulo.y1 = e.y;
            break;
        case 'circulo':
            dibujar = true;
            cords_circulo.x1 = e.x;
            cords_circulo.y1 = e.y;
            break;
        case 'triangulo':
            dibujar = true;
            cords_triangulo.x1 = e.x;
            cords_triangulo.y1 = e.y;
            break;
    }
});

canvas.addEventListener("mouseup", (e) => {
    color_ant = color.value;
    switch (opcion_seleccionada) {
        case 'lapiz':
            dibujar = false;
            break;
        case 'brocha':
            dibujar = false;
            break;
        case 'borrador':
            dibujar = false;
            break;
        case 'rectangulo':
            cords_rectangulo.x2 = e.x;
            cords_rectangulo.y2 = e.y;
            if (cords_rectangulo.x1 < cords_rectangulo.x2) {
                cords_rectangulo.width = cords_rectangulo.x2 - cords_rectangulo.x1;
            } else {
                cords_rectangulo.width = cords_rectangulo.x2 - cords_rectangulo.x1;
            }
            if (cords_rectangulo.y1 > cords_rectangulo.y2) {
                cords_rectangulo.height = cords_rectangulo.y2 - cords_rectangulo.y1;
            } else {
                cords_rectangulo.height = cords_rectangulo.y2 - cords_rectangulo.y1;
            }
            ctx.fillStyle = color.value;
            ctx.fillRect(cords_rectangulo.x1 - 100, cords_rectangulo.y1 - 50, cords_rectangulo.width, cords_rectangulo.height);
            break;
        case 'circulo':
            cords_circulo.x2 = e.x;
            cords_circulo.y2 = e.y;
            if (cords_circulo.x1 < cords_circulo.x2) {
                cords_circulo.radio_1 = (cords_circulo.x2 - cords_circulo.x1) / 2;
            } else {
                cords_circulo.radio_1 = (cords_circulo.x1 - cords_circulo.x2) / 2;
            }
            if (cords_circulo.y1 > cords_circulo.y2) {
                cords_circulo.radio_2 = (cords_circulo.y1 - cords_circulo.y2) / 2;
            } else {
                cords_circulo.radio_2 = (cords_circulo.y2 - cords_circulo.y1) / 2;
            }
            ctx.fillStyle = color.value;
            ctx.beginPath();
            if (cords_circulo.x1 < cords_circulo.x2){
                if (cords_circulo.y1 < cords_circulo.y2){
                    ctx.ellipse(cords_circulo.x1, cords_circulo.y1, cords_circulo.radio_1, cords_circulo.radio_2, 0, 0, 4* Math.PI);
                } else {
                    ctx.ellipse(cords_circulo.x1, cords_circulo.y2, cords_circulo.radio_1, cords_circulo.radio_2, 0, 0, 4* Math.PI);
                }
            } else {
                if (cords_circulo.y1 < cords_circulo.y2){
                    ctx.ellipse(cords_circulo.x2, cords_circulo.y1, cords_circulo.radio_1, cords_circulo.radio_2, 0, 0, 4* Math.PI);
                } else {
                    ctx.ellipse(cords_circulo.x2, cords_circulo.y2, cords_circulo.radio_1, cords_circulo.radio_2, 0, 0, 4* Math.PI);
                }
            }
            ctx.fill();
            ctx.closePath();
            break;
        case 'triangulo':
            cords_triangulo.x2 = e.x;
            cords_triangulo.y2 = e.y;
            if (cords_triangulo.x1 < cords_triangulo.x2){
                cords_triangulo.width = cords_triangulo.x2 - cords_triangulo.x1;
            } else {
                cords_triangulo.width = cords_triangulo.x1 - cords_triangulo.x2;
            }
            if (cords_triangulo.y1 < cords_triangulo.y2){
                cords_triangulo.width = cords_triangulo.y2 - cords_triangulo.y1;
            } else {
                cords_triangulo.width = cords_triangulo.y1 - cords_triangulo.y2;
            }
            ctx.fillStyle = color.value;
            ctx.beginPath();
            ctx.moveTo(cords_triangulo.x1 + (cords_triangulo.width/2), cords_triangulo.y1);
            ctx.lineTo(cords_triangulo.x1, cords_triangulo.y2);
            ctx.lineTo(cords_triangulo.x2, cords_triangulo.y2);
            ctx.closePath();
            ctx.fill();
            break;
    }
});

canvas.addEventListener("mousemove", (e) => {
    color_ant = color.value;
    if (dibujar) {
        switch (opcion_seleccionada) {
            case 'lapiz':
                ctx.fillStyle = color.value;
                ctx.beginPath();
                ctx.arc(e.x - 100, e.y - 50, ancho.value, 0, 4 * Math.PI);
                ctx.fill();
                ctx.closePath();
                break;
            case 'brocha':
                ctx.fillStyle = color.value;
                ctx.beginPath();
                ctx.arc(e.x - 100, e.y - 50, ancho.value, 0, 4 * Math.PI);
                ctx.fill();
                ctx.closePath();
                break;
            case 'borrador':
                ctx.fillStyle = color.value;
                ctx.beginPath();
                ctx.arc(e.x - 100, e.y - 50, ancho.value, 0, 4 * Math.PI);
                ctx.fill();
                ctx.closePath();
                break;
        }
    }
});

document.addEventListener("mouseup", (e) => {
 dibujar = false;
});


pencil.addEventListener('click', (e) => {
    opcion_seleccionada = opciones[0];
    range.max = 50;
    color.value = color_ant;
    color.disabled = false;
    pencil.disabled = true;
    pencil.style.opacity = 0.2;
    if (brocha.disabled) {
        brocha.disabled = false;
        brocha.style.opacity = 1;
    }
    if (eraser.disabled) {
        eraser.disabled = false;
        eraser.style.opacity = 1;
    }
    if (rectangulo.disabled) {
        rectangulo.disabled = false;
        rectangulo.style.opacity = 1;
    }
    if (circulo.disabled) {
        circulo.disabled = false;
        circulo.style.opacity = 1;
    }
    if (triangulo.disabled) {
        triangulo.disabled = false;
        triangulo.style.opacity = 1;
    }
});
brocha.addEventListener('click', (e) => {
    opcion_seleccionada = opciones[1];
    range.max = 100;
    color.value = color_ant;
    color.disabled = false;
    brocha.disabled = true;
    brocha.style.opacity = 0.2;
    if (pencil.disabled) {
        pencil.disabled = false;
        pencil.style.opacity = 1;
    }
    if (eraser.disabled) {
        eraser.disabled = false;
        eraser.style.opacity = 1;
    }
    if (rectangulo.disabled) {
        rectangulo.disabled = false;
        rectangulo.style.opacity = 1;
    }
    if (circulo.disabled) {
        circulo.disabled = false;
        circulo.style.opacity = 1;
    }
    if (triangulo.disabled) {
        triangulo.disabled = false;
        triangulo.style.opacity = 1;
    }
});
eraser.addEventListener('click', (e) => {
    color_ant = color.value;
    opcion_seleccionada = opciones[2];
    range.max = 100;
    color.value = '#F5F5F5';
    color.disabled = true;
    eraser.disabled = true;
    eraser.style.opacity = 0.2;
    if (brocha.disabled) {
        brocha.disabled = false;
        brocha.style.opacity = 1;
    }
    if (pencil.disabled) {
        pencil.disabled = false;
        pencil.style.opacity = 1;
    }
    if (rectangulo.disabled) {
        rectangulo.disabled = false;
        rectangulo.style.opacity = 1;
    }
    if (circulo.disabled) {
        circulo.disabled = false;
        circulo.style.opacity = 1;
    }
    if (triangulo.disabled) {
        triangulo.disabled = false;
        triangulo.style.opacity = 1;
    }
});
rectangulo.addEventListener('click', (e) => {
    color_ant = color.value;
    opcion_seleccionada = opciones[3];
    rectangulo.disabled = true;
    rectangulo.style.opacity = 0.2;
    if (brocha.disabled) {
        brocha.disabled = false;
        brocha.style.opacity = 1;
    }
    if (eraser.disabled) {
        eraser.disabled = false;
        eraser.style.opacity = 1;
    }
    if (pencil.disabled) {
        pencil.disabled = false;
        pencil.style.opacity = 1;
    }
    if (circulo.disabled) {
        circulo.disabled = false;
        circulo.style.opacity = 1;
    }
    if (triangulo.disabled) {
        triangulo.disabled = false;
        triangulo.style.opacity = 1;
    }
});
circulo.addEventListener('click', (e) => {
    color_ant = color.value;
    opcion_seleccionada = opciones[4];
    circulo.disabled = true;
    circulo.style.opacity = 0.2;
    if (brocha.disabled) {
        brocha.disabled = false;
        brocha.style.opacity = 1;
    }
    if (eraser.disabled) {
        eraser.disabled = false;
        eraser.style.opacity = 1;
    }
    if (rectangulo.disabled) {
        rectangulo.disabled = false;
        rectangulo.style.opacity = 1;
    }
    if (pencil.disabled) {
        pencil.disabled = false;
        pencil.style.opacity = 1;
    }
    if (triangulo.disabled) {
        triangulo.disabled = false;
        triangulo.style.opacity = 1;
    }
});
triangulo.addEventListener('click', (e) => {
    color_ant = color.value;
    opcion_seleccionada = opciones[5];
    triangulo.disabled = true;
    triangulo.style.opacity = 0.2;
    if (brocha.disabled) {
        brocha.disabled = false;
        brocha.style.opacity = 1;
    }
    if (eraser.disabled) {
        eraser.disabled = false;
        eraser.style.opacity = 1;
    }
    if (rectangulo.disabled) {
        rectangulo.disabled = false;
        rectangulo.style.opacity = 1;
    }
    if (circulo.disabled) {
        circulo.disabled = false;
        circulo.style.opacity = 1;
    }
    if (pencil.disabled) {
        pencil.disabled = false;
        pencil.style.opacity = 1;
    }
});
clear.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
});
save.addEventListener("click", () => {
    let enlace = document.createElement('a');
    enlace.download = "image.jpg";
    enlace.href = canvas.toDataURL("image/jpeg", 1);
    enlace.click();
});