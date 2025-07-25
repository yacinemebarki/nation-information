function showError(msg) {
    const text = document.querySelector('.error-message');
    if (!text) return;

    text.textContent = msg;
    text.classList.add("show");
    text.classList.remove("hide");

    setTimeout(() => {
        text.textContent = "";
        text.classList.remove("show");
        text.classList.add("hide");
    }, 3000);
}

document.getElementById('sub').addEventListener('click', async function () {
    const code = document.getElementById('nations').value;
    
    if (!code) {
        showError(`You need to choose a country ${code}` );
        return;
    }

    showError("Loading country info...");

    
    const api = `https://restcountries.com/v3.1/alpha/${code}`;

    try {
        const response = await fetch(api);
        const data = await response.json();

        const country = data[0]; 
        const name = country.name.common;
        const official=country.name.official;
        const capital = country.capital?.[0] || "N/A";

        
        const population = country.population.toLocaleString();
        const region=country.region;

        
        const flag = country.flags.png;
        

        const tbody = document.getElementById('nation');
        tbody.innerHTML = "";

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;
        const officialCell=document.createElement("td");
        officialCell.textContent=official;

        const capitalCell = document.createElement("td");
        capitalCell.textContent = capital;

        const populationCell = document.createElement("td");
        populationCell.textContent = population;
        const regionCell=document.createElement("td");
        regionCell.textContent=region;

        

        const flagCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = flag;
        img.alt = "flag";
        img.width = 40;
        flagCell.appendChild(img);

        
        row.appendChild(nameCell);
        row.appendChild(officialCell);
        row.appendChild(capitalCell);
        row.appendChild(populationCell);
        row.appendChild(regionCell);
        row.appendChild(flagCell);
        
        tbody.appendChild(row);
    } catch (err) {
        showError(error);
        console.error(err);
    }
});
