document.addEventListener("DOMContentLoaded", function () {
    // Manejo de clics en el menú lateral
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".content-section");
  
    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        // Remover la clase "active" de todos los elementos del menú
        menuItems.forEach((i) => i.classList.remove("active"));
        // Agregar la clase "active" al elemento clickeado
        this.classList.add("active");
  
        // Ocultar todas las secciones
        sections.forEach((section) => section.classList.remove("active"));
        // Mostrar la sección correspondiente al atributo data-target
        const target = this.getAttribute("data-target");
        document.getElementById(target).classList.add("active");
      });
    });
  
    // Asegurar que por defecto se muestre "Estado General"
    document.getElementById("estadoGeneral").classList.add("active");
  
    // Inicializar Chart.js para el gráfico de consumo en "Estado General"
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
  
    // Funcionalidad para el botón de reportar fallos
    const reportBtn = document.querySelector(".report-button");
    reportBtn.addEventListener("click", function () {
      // Preguntar el tipo de reporte
      const tipoInput = prompt(
        "Ingrese el tipo de reporte: 'fallo' o 'mantenimiento'"
      ).toLowerCase();
      if (tipoInput !== "fallo" && tipoInput !== "mantenimiento") {
        alert("Tipo de reporte no reconocido. Intente nuevamente.");
        return;
      }
      // Preguntar por los detalles del reporte
      const detalle = prompt("Ingrese los detalles del reporte:");
      if (!detalle) {
        alert("No se ingresaron detalles. Reporte cancelado.");
        return;
      }
  
      // Crear nuevo elemento para el reporte
      let reportElement = document.createElement("div");
      reportElement.classList.add("alert-item");
  
      // Dependiendo del tipo, asignar clase y contenido
      if (tipoInput === "fallo") {
        reportElement.classList.add("critical");
        reportElement.innerHTML = `<strong>Reporte de Fallo</strong><p>${detalle}</p>`;
        // Agregar a la sección de Alertas Activas
        const alertasPanel = document.querySelector(
          "#alertasActivas .alert-panel"
        );
        if (alertasPanel) {
          alertasPanel.appendChild(reportElement.cloneNode(true));
        }
      } else if (tipoInput === "mantenimiento") {
        reportElement.classList.add("info");
        reportElement.innerHTML = `<strong>Reporte de Mantenimiento</strong><p>${detalle}</p>`;
        // Agregar a la sección de Mantenimiento
        const mantenimientoSection = document.getElementById("mantenimiento");
        if (mantenimientoSection) {
          mantenimientoSection.appendChild(reportElement.cloneNode(true));
        }
      }
  
      // Agregar reporte a Reportes Históricos
      const reportesHistoricos = document.getElementById("reportesHistoricos");
      if (reportesHistoricos) {
        let historicoReporte = document.createElement("div");
        historicoReporte.classList.add("historico-reporte");
        historicoReporte.innerHTML = `<strong>${
          tipoInput === "fallo" ? "Fallo" : "Mantenimiento"
        }:</strong> ${detalle}`;
        reportesHistoricos.appendChild(historicoReporte);
      }
  
      alert("Reporte agregado exitosamente.");
    });
  });
  