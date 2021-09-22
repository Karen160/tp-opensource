const fetchButton = document.getElementById("fetch-button");
const api_key = "66e2c2bd815945a7860144831212109";
const addressInput = document.getElementById("address-input");
const cityInput = document.getElementById("city-input");
const codeInput = document.getElementById("code-input");


  async function getAddressLocation() {
    let addressValue = addressInput.value;
    let cityValue = cityInput.value;
    let codeValue = codeInput.value; 


    const addressLocationData = await fetch(
        "https://api-adresse.data.gouv.fr/search/?q=" +
          addressValue +
          cityValue +
          "$postcode=" + codeValue 
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
  let addressValue = addressInput.value;
  let cityValue = cityInput.value;  

  if(addressValue != "" || cityValue != "") {
    document.getElementById("errorDiv").style.display = "none";
    console.log(await getWeatherData(await getAddressLocation()));
  }else{
    document.getElementById("errorMessage").innerHTML = "Veuillez remplir votre adresse ou votre ville";
    document.getElementById("errorDiv").style.display = "flex";
  }

}

  fetchButton.addEventListener("click", getData);
  
