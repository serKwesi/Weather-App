const apiKey = "0cbda6f7812bbb8d40c6d6ba9062d3ef"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

// Array of colors for rotating banner backgrounds
const bannerColors = ["#71dfe4", "#ffd700", "#ffa07a", "#90ee90", "#9370db"];
let colorIndex = 0; // Keep track of the current color

// Add event listeners for both button click and Enter key press
searchButton.addEventListener("click", fetchWeather);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

function fetchWeather() {
  const city = cityInput.value;

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      createWeatherBanner(data);
    })
    .catch((error) => {
      console.error(error);
      alert("Could not fetch weather data. Please try again.");
    });
}

function createWeatherBanner(data) {
  const { name, main, weather } = data;

  // Create a new banner element
  const weatherBanner = document.createElement("div");
  weatherBanner.classList.add("weather-banner");

  // Add weather details to the banner
  weatherBanner.innerHTML = `
    <div class="weather-content">
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon">
    </div>
    <button class="menu-btn" title="Delete">-</button>
  `;

  // Center the weather content
  const weatherContent = weatherBanner.querySelector(".weather-content");
  weatherContent.style.textAlign = "center";

  // Style the delete button
  const menuButton = weatherBanner.querySelector(".menu-btn");
  menuButton.style.backgroundColor = "red"; // Red background
  menuButton.style.color = "white"; // White text
  menuButton.style.border = "none"; // No border
  menuButton.style.padding = "8px 12px"; // Padding for the button
  menuButton.style.borderRadius = "50%"; // Circular button
  menuButton.style.cursor = "pointer"; // Pointer cursor on hover

  // Add functionality to delete the specific banner
  menuButton.addEventListener("click", () => {
    weatherBanner.remove();
  });

  // Append the new banner to the body or a container
  const container = document.querySelector(".container");
  container.insertAdjacentElement("afterend", weatherBanner);

  // Apply a rotating background color from the color list
  weatherBanner.style.backgroundColor = bannerColors[colorIndex];
  colorIndex = (colorIndex + 1) % bannerColors.length; // Move to the next color

  // Style the weather banner
  weatherBanner.style.margin = "20px auto"; // Add spacing
  weatherBanner.style.padding = "20px";
  weatherBanner.style.borderRadius = "8px"; // Rounded corners
  weatherBanner.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"; // Shadow
  weatherBanner.style.display = "flex";
  weatherBanner.style.flexDirection = "column"; // Stack content vertically
  weatherBanner.style.alignItems = "center"; // Center horizontally
}
