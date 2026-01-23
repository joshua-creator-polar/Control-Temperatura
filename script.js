let temperatura = 25;
let min = 20;
let max = 30;

function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');
}

function guardarRango() {
  min = parseInt(document.getElementById('minTemp').value);
  max = parseInt(document.getElementById('maxTemp').value);

  if (temperatura < min || temperatura > max) {
    document.getElementById('mensajeControl').innerText =
      "⚠️ Temperatura fuera del rango permitido";
  } else {
    document.getElementById('mensajeControl').innerText =
      "✅ Temperatura dentro del rango";
  }
}

function probarSensor() {
  for (let i = 1; i <= 4; i++) {
    let sensor = document.getElementById("sensor" + i);

    if (Math.random() > 0.5) {
      sensor.innerText = "✔ Funcionando";
      sensor.style.color = "green";
    } else {
      sensor.innerText = "❌ Falla detectada";
      sensor.style.color = "red";
    }
  }
}

setInterval(() => {
  temperatura = Math.floor(Math.random() * 15) + 20;
  document.getElementById("temp").innerText = temperatura;

  let alerta = document.getElementById("alertaTemp");

  if (temperatura < min || temperatura > max) {
    alerta.innerText = "⚠️ Temperatura inadecuada";
    alerta.style.color = "red";
  } else {
    alerta.innerText = "✅ Temperatura adecuada";
    alerta.style.color = "green";
  }

}, 30000); // 5000 ms = 5 segundos
