let temperatura = 25;
let min = 20;
let max = 30;

let nombreEmpresa = "Tesya-Tejido tradicional";
document.getElementById("empresaLogin").innerText = nombreEmpresa;

// 🔐 LOGIN
let esAdmin = false;

// ☁️ Simulación de datos guardados en PaaS
let registros = [];

// ---------- LOGIN ----------
function login() {
  let user = document.getElementById("usuario").value;
  let pass = document.getElementById("clave").value;

  if (user === "admin" && pass === "1234") {
    esAdmin = true;
    iniciarApp();
    document.getElementById("btnAdmin").classList.remove("oculto");
  } else if (user !== "" && pass !== "") {
    esAdmin = false;
    iniciarApp();
  } else {
    document.getElementById("errorLogin").innerText =
      "Usuario o contraseña incorrectos";
  }
}

function iniciarApp() {
  document.getElementById("login").classList.add("oculto");
  document.getElementById("app").classList.remove("oculto");
}

// ---------- NAVEGACIÓN ----------
function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');

  if (id === "admin") {
    mostrarDatos();
  }
}

// ---------- CONTROL DE TEMPERATURA ----------
function guardarRango() {
  min = parseInt(document.getElementById('minTemp').value);
  max = parseInt(document.getElementById('maxTemp').value);

  let estado;

  if (temperatura < min || temperatura > max) {
    estado = "Fuera del rango";
    document.getElementById('mensajeControl').innerText =
      "⚠️ Temperatura fuera del rango permitido";
  } else {
    estado = "Dentro del rango";
    document.getElementById('mensajeControl').innerText =
      "✅ Temperatura dentro del rango";
  }

  // ☁️ Guardar datos (PaaS simulado)
  registros.push({
    temperatura: temperatura,
    minimo: min,
    maximo: max,
    estado: estado,
    fecha: new Date().toLocaleString()
  });
}

// ---------- SENSORES ----------
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

// ---------- MOSTRAR DATOS ADMIN ----------
function mostrarDatos() {
  let lista = document.getElementById("datos");
  let resumen = document.getElementById("resumen");

  lista.innerHTML = "";

  registros.forEach((r, i) => {
    let item = document.createElement("li");
    item.innerText =
      `Registro ${i + 1} | Temp: ${r.temperatura}°C | Rango: ${r.minimo}-${r.maximo} | Estado: ${r.estado} | ${r.fecha}`;
    lista.appendChild(item);
  });

  // 📊 Resumen administrativo
  if (registros.length > 0) {
    let ultimo = registros[registros.length - 1];

    resumen.innerHTML = `
      <h4>📈 Resumen del sistema</h4>
      <p>🔢 Total de registros: <strong>${registros.length}</strong></p>
      <p>🌡 Última temperatura: <strong>${ultimo.temperatura} °C</strong></p>
      <p>⚙️ Estado actual: <strong>${ultimo.estado}</strong></p>
      <p>☁️ Plataforma: <strong>PaaS (simulación tipo Firebase)</strong></p>
    `;
  } else {
    resumen.innerHTML = "<p>No hay datos registrados aún.</p>";
  }
}


// ---------- CLIMA Y TEMPERATURA AUTOMÁTICA ----------
setInterval(() => {
  let mensajeClima = document.getElementById("mensajeClima");

  if (temperatura < min) {
    mensajeClima.innerText = "🧥 Temperatura baja, tomar precauciones";
    mensajeClima.style.color = "blue";
  } else if (temperatura > max) {
    mensajeClima.innerText = "🔥 Temperatura alta, evitar sobrecalentamiento";
    mensajeClima.style.color = "red";
  } else {
    mensajeClima.innerText = "✅ Clima estable, sin riesgos";
    mensajeClima.style.color = "green";
  }

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

}, 30000);

