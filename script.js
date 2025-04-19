document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".content-section");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      menuItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      sections.forEach((section) => section.classList.remove("active"));
      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });

  document.getElementById("estadoGeneral").classList.add("active");

  const ctx = document.getElementById("consumoChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          label: "Consumo Energético (MW)",
          data: [650, 720, 820, 910, 880, 950],
          borderColor: "#1A237E",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const reportBtn = document.querySelector(".report-button");
  reportBtn.addEventListener("click", function () {
    let tipoInput = prompt(
      "Ingrese el tipo de reporte: 'fallo' o 'mantenimiento'"
    );

    if (!tipoInput) {
      alert("Debe ingresar un tipo de reporte.");
      return;
    }

    tipoInput = tipoInput.toLowerCase();
    if (tipoInput !== "fallo" && tipoInput !== "mantenimiento") {
      alert("Tipo de reporte no reconocido. Intente nuevamente.");
      return;
    }

    const detalle = prompt("Ingrese los detalles del reporte:");
    if (!detalle) {
      alert("No se ingresaron detalles. Reporte cancelado.");
      return;
    }

    let reportElement = document.createElement("div");
    reportElement.classList.add("alert-item");

    if (tipoInput === "fallo") {
      reportElement.classList.add("critical");
      reportElement.innerHTML = `<strong>Reporte de Fallo</strong><p>${detalle}</p>`;
      const alertasPanel = document.querySelector(
        "#alertasActivas .alert-panel"
      );
      if (alertasPanel) {
        alertasPanel.appendChild(reportElement.cloneNode(true));
      }
    } else if (tipoInput === "mantenimiento") {
      reportElement.classList.add("info");
      reportElement.innerHTML = `<strong>Reporte de Mantenimiento</strong><p>${detalle}</p>`;
      const mantenimientoSection = document.getElementById("mantenimiento");
      if (mantenimientoSection) {
        mantenimientoSection.appendChild(reportElement.cloneNode(true));
      }
    }

    const reportesHistoricos = document.getElementById("reportesHistoricos");
    if (reportesHistoricos) {
      let historicoReporte = document.createElement("div");
      historicoReporte.classList.add("historico-reporte");
      let fecha = new Date().toLocaleString();
      historicoReporte.innerHTML = `<strong>${
        tipoInput === "fallo" ? "Fallo" : "Mantenimiento"
      }:</strong> ${detalle} <br><em>${fecha}</em>`;
      reportesHistoricos.appendChild(historicoReporte);
    }

    alert("Reporte agregado exitosamente.");
  });
});
