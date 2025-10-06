const apiKey = "4c035477614a2997bdb29c17e7b070ff"; // Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    result.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  result.innerHTML = "<p>Loading...</p>";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    result.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const icon = weather[0].icon;

  result.innerHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather[0].description}">
      <p><strong>${main.temp}°C</strong> — ${weather[0].description}</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    </div>
  `;
}
