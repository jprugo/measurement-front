function reloadUsbData() {
    fetch("http://localhost:8000/drives", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {

        let select = document.getElementById("usbselect");
        
        // Limpiar opciones existentes
        while (select.options.length > 0) {
            select.remove(0);
        }
        // Agregar nuevas opciones
        data.result.forEach(item => {
            let opcion = document.createElement("option");
            opcion.text = item.mountpoint;
            opcion.value = item.mountpoint;
            select.add(opcion);
        });
    })
    .catch(error => {
        console.error("Error fetching USB data:", error);
    });
}

function exportData(measureType, detailName) {
    const fecha1Value = document.getElementById("date1").value;
    const fecha1 = fecha1Value.toString().replace("T", " ");

    const fecha2Value = document.getElementById("date2").value;
    const fecha2 = fecha2Value.toString().replace("T", " ");

    const select = document.getElementById("usbselect");
    const selected = select.value;
    
    const detail = detailName === null ? null : document.getElementById(detailName).value;

    fetch("http://localhost:8000/measurement/export", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            measure_type: measureType,
            start_date: fecha1,
            end_date: fecha2,
            mountpoint: selected,
            detail: detail,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        alert('Reporte generado');
    })
    .catch(error => {
        console.error("Error exporting data:", error);
    });
}