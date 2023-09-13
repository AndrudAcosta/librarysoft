document.addEventListener("DOMContentLoaded", () => {
    const yearSelector = document.getElementById("yearSelector");
    const generateExcelButton = document.getElementById("generateExcelButton");
    let currentChart; // Variable para mantener la instancia del gráfico actual

    fetch("http://localhost:8282/api/dashboard")
        .then(response => response.json())
        .then(years => {
            years.forEach(year => {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearSelector.appendChild(option);
            });

            const currentYear = new Date().getFullYear();
            yearSelector.value = currentYear;

            fetchDataAndRenderCharts(currentYear);
        })
        .catch(error => console.error("Error:", error));

    yearSelector.addEventListener("change", () => {
        const selectedYear = yearSelector.value;
        fetchDataAndRenderCharts(selectedYear);
    });

    generateExcelButton.addEventListener("click", () => {
        const selectedYear = yearSelector.value;
        generateExcelReport(selectedYear);
    });

    function fetchDataAndRenderCharts(year) {
        fetch(`http://localhost:8282/api/dashboard/${year}`)
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById("myBarChart1").getContext("2d");

                if (currentChart) {
                    currentChart.destroy(); // Destruir la instancia de gráfico actual si existe
                }

                const labels = Array.from({ length: 12 }, (_, index) => getMonthName(index + 1));
                const counts = Array.from({ length: 12 }, (_, index) => {
                    const monthData = data.find(item => item.month === index + 1);
                    return monthData ? monthData.count : 0;
                });

                currentChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Cantidad de Préstamos",
                            backgroundColor: "#16a084",
                            borderColor: "rgba(2,117,216,1)",
                            data: counts,
                        }],
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                },
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    maxTicksLimit: 5,
                                },
                                gridLines: {
                                    display: true,
                                },
                            }],
                        },
                        legend: {
                            display: false,
                        },
                    },
                });
            })
            .catch(error => console.error("Error:", error));
    }

    // Función para obtener el nombre del mes
    function getMonthName(monthNumber) {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return monthNames[monthNumber - 1];
    }

    // Función para generar el informe Excel
    function generateExcelReport(year) {
        fetch(`http://localhost:8282/api/dashboard/${year}`)
            .then(response => response.json())
            .then(data => {
                const XLSX = window.XLSX; // Accede a la librería cargada en el navegador

                // Crear una matriz de datos que incluya los meses y las cantidades de préstamos
                const monthsWithData = data.map(item => item.month);
                const months = Array.from({ length: 12 }, (_, index) => index + 1);
                const loanCounts = Array.from({ length: 12 }, (_, index) => {
                    const monthData = data.find(item => item.month === index + 1);
                    return monthData ? monthData.count : '';
                });

                const worksheetData = [['', ...months.map(month => getMonthName(month))], ['Cantidad de Préstamos', ...loanCounts]];

                // Crear una hoja de cálculo
                const ws = XLSX.utils.aoa_to_sheet(worksheetData);

                // Crear un libro de trabajo y agregar la hoja de cálculo
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Préstamos');

                // Convertir el libro de trabajo a un archivo Excel binario
                const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

                // Convertir el archivo binario a un Blob
                const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

                // Crear un enlace de descarga
                const excelFileName = `Reporte_Prestamos_${year}.xlsx`;
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = excelFileName;
                downloadLink.click();

                console.log(`Informe generado: ${excelFileName}`);
            })
            .catch(error => console.error("Error:", error));
    }


    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

});