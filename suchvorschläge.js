// Daten von einer API abrufen
fetch('http://ergast.com/api/f1/2023/drivers.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Extrahiere die Fahrerdaten aus der API-Antwort
        const drivers = data.MRData.DriverTable.Drivers;

        // Funktion, um Suchvorschläge anzuzeigen
        function displaySuggestions(searchString) {
            const matchingDrivers = drivers.filter(driver => {
                const driverName = `${driver.givenName} ${driver.familyName}`;
                return driverName.toLowerCase().includes(searchString);
            });

            const suggestionsList = document.getElementById("suggestions");
            suggestionsList.innerHTML = ""; // Leere die vorhandenen Vorschläge.

            if (searchString.length > 0) {
                matchingDrivers.forEach(driver => {
                    const driverName = `${driver.givenName} ${driver.familyName}`;
                    const suggestionItem = document.createElement("li");
                    suggestionItem.textContent = driverName;
                    suggestionsList.appendChild(suggestionItem);
                });

                if (matchingDrivers.length > 0) {
                    suggestionsList.style.display = "block";
                } else {
                    suggestionsList.style.display = "none";
                }
            } else {
                suggestionsList.style.display = "none";
            }
        }

        // HTML-Elemente abrufen
        const searchInput = document.getElementById("search-input");
        const suggestionsList = document.getElementById("suggestions");

        // Event-Listener für die Eingabe im Suchfeld
        searchInput.addEventListener("input", () => {
            const searchString = searchInput.value.toLowerCase();
            displaySuggestions(searchString);
        });

        // Event-Listener für das Klicken auf einen Vorschlag
        suggestionsList.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                searchInput.value = e.target.textContent;
                suggestionsList.style.display = "none";
            }
        });
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
    });
