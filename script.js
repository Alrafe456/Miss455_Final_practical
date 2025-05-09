function searchCountry() {
    const input = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');
  
    resultDiv.innerHTML = '';
    loader.style.display = 'block';
  
    if (!input) {
      loader.style.display = 'none';
      resultDiv.innerHTML = `<p style="color:red; text-align:center;">Please enter a country name.</p>`;
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${input}`)
      .then(res => {
        if (!res.ok) throw new Error("Country not found.");
        return res.json();
      })
      .then(data => {
        loader.style.display = 'none';
  
        data.forEach(country => {
          const card = document.createElement('div');
          card.className = 'country-card';
  
          const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : 'N/A';
          const currency = country.currencies?.[currencyKey]?.name || 'N/A';
          const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  
          card.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
            <p><strong>Currency:</strong> ${currencyKey} - ${currency}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Languages:</strong> ${languages}</p>
          `;
          resultDiv.appendChild(card);
        });
      })
      .catch(err => {
        loader.style.display = 'none';
        resultDiv.innerHTML = `<p style="color:red; text-align:center;">${err.message}</p>`;
      });
  }
  