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