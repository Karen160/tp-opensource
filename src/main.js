const api_key = "66e2c2bd815945a7860144831212109";

const fetchButton = document.getElementById("fetch-button");
const addressInput = document.getElementById("address-input");
const cityInput = document.getElementById("city-input");
const codeInput = document.getElementById("code-input");

const cloudParagraph = document.getElementById("cloud");
const humidityParagraph = document.getElementById("humidity");
const lastUpdatedParagraph = document.getElementById("last-updated");
const temperatureParagraph = document.getElementById("temperature");
const windDegreeParagraph = document.getElementById("wind-degree");
const windKmhParagraph = document.getElementById("wind-kmh");

async function getAddressLocation() {
  let addressValue = addressInput.value;
  let cityValue = cityInput.value;
  let codeValue = codeInput.value;

  const addressLocationData = await fetch(
    "https://api-adresse.data.gouv.fr/search/?q=" +
      addressValue +
      cityValue +
      "$postcode=" +
      codeValue
  );

  const addressLocation = await addressLocationData.json();

  return addressLocation.features[0].geometry.coordinates;
}

async function getWeatherData(coords) {
  const weatherData = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=" +
      api_key +
      "&q=" +
      coords[1] +
      "," +
      coords[0]
  );

  const weatherDataResponse = await weatherData.json();

  return weatherDataResponse.current;
}

async function getData() {
  let data = await getWeatherData(await getAddressLocation());

  console.log(data);

  cloudParagraph.innerHTML += data.cloud;
  humidityParagraph.innerHTML += data.humidity;
  lastUpdatedParagraph.innerHTML += data.last_updated;
  temperatureParagraph.innerHTML += data.temp_c;
  windDegreeParagraph.innerHTML += data.wind_degree;
  windKmhParagraph.innerHTML += data.wind_kph;
}

fetchButton.addEventListener("click", getData);
