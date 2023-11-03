// Daten von einer API abrufen
fetch('http://ergast.com/api/f1/2023/drivers.json')
    .then(response => response.json())
    .then(data => {
        // Annahme: JSON-Daten aus der API
        const apiData = data.MRData.DriverTable.Drivers;

        // Finde den Datensatz mit dem driver.code "VER" (Max Verstappen)
        const maxVerstappen = apiData.find(driver => driver.code === "VER");

        if (maxVerstappen) {
            // Tabelle im HTML-Dokument finden
            const tableBody = document.getElementById("table-body");

            // Neue Zeile für die Tabelle erstellen
            const newRow = document.createElement("tr");

            // Tabellenzellen erstellen und mit Daten füllen
            const cell1 = document.createElement("td");
            cell1.textContent = maxVerstappen.familyName;

            const cell2 = document.createElement("td");
            cell2.textContent = maxVerstappen.givenName;

            const cell3 = document.createElement("td");
            cell3.textContent = maxVerstappen.permanentNumber;

            const cell4 = document.createElement("td");
            cell4.textContent = maxVerstappen.code;

            const cell5 = document.createElement("td");
            const driverLink = document.createElement("a");
            driverLink.href = maxVerstappen.url;
            driverLink.textContent = maxVerstappen.givenName + " " + maxVerstappen.familyName;
            cell5.appendChild(driverLink);

            const cell6 = document.createElement("td");
            cell6.textContent = maxVerstappen.dateOfBirth;

            const cell7 = document.createElement("td");
            cell7.textContent = maxVerstappen.nationality;

            // Tabellenzellen zur Zeile hinzufügen
            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);
            newRow.appendChild(cell4);
            newRow.appendChild(cell5);
            newRow.appendChild(cell6);
            newRow.appendChild(cell7);

            // Zeile zur Tabelle hinzufügen
            tableBody.appendChild(newRow);
        } else {
            console.error('Datensatz mit code "VER" wurde nicht gefunden.');
        }
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
    });
