// api key
const api_key = "66e2c2bd815945a7860144831212109";

//Recovery of the elements of the dom on which we interact
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

//Function for get the latitude and the longitude thanks to the adress, city and postcode
  async function getAddressLocation() {
    // Recovery of input values
    let addressValue = addressInput.value;
    let cityValue = cityInput.value;
    let codeValue = codeInput.value; 

//Api call to the french geo gouv thanls to teh city, adress and post cod
    const addressLocationData = await fetch(
        "https://api-adresse.data.gouv.fr/search/?q=" +
          addressValue +
          cityValue +
          "&postcode=" + codeValue 
      );
    
     //parse data into json
    const addressLocation = await addressLocationData.json();
    //return the coordinates 
    return addressLocation.features[0].geometry.coordinates;
  }
  
  //function to get the weather of a place
  async function getWeatherData(coords) {
    //Api cal to the weatherapi thanks to the api keyn the latitude and longitude gets on the geo gouv api call
    const weatherData = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=" +
        api_key +
        "&q=" +
        coords[1] +
        "," +
        coords[0]
    );
  //parse data into json
    const weatherDataResponse = await weatherData.json();

    //return data
    return weatherDataResponse.current;
  }

  //function for use previous function on the same time + manage the dom and display data in it + validator of inputs and data  value
  async function getData() {
      cloudParagraph.innerHTML = "<strong>Cloud</strong> : ";
      humidityParagraph.innerHTML = "<strong>Humidity</strong> : ";
      lastUpdatedParagraph.innerHTML =  "<strong>Last Updated</strong> : ";
      temperatureParagraph.innerHTML = "<strong>Temperature</strong> : " ;
      windDegreeParagraph.innerHTML = "<strong>Wind Degree</strong> : " ;
      windKmhParagraph.innerHTML = "<strong>Wind Speed</strong> : " ;

      let addressValue = addressInput.value;
      let cityValue = cityInput.value;

      //if the adress or the city is not empty 
      if (addressValue != "" || cityValue != "") {
        document.getElementById("errorDiv").style.display = "none";
        // get the weather with coordinate in parameters  wich are gets by getAdress function
        var data = await getWeatherData(await getAddressLocation());
      } else {
        // else display error message and set data to null
        var data = null;
        document.getElementById("errorMessage").innerHTML ="Please fill in your address or city";
        document.getElementById("errorDiv").style.display = "flex"; 
      }

      //if data is not null display the data else display a predefined message
      if (data != null) {
        cloudParagraph.innerHTML += data.cloud + "%";
        humidityParagraph.innerHTML += data.humidity + "%";
        lastUpdatedParagraph.innerHTML += "at " + data.last_updated;
        temperatureParagraph.innerHTML += data.temp_c + " degrees celcius";
        windDegreeParagraph.innerHTML += data.wind_degree + " degree";
        windKmhParagraph.innerHTML += data.wind_kph + " Km/h";
      }else {
        cloudParagraph.innerHTML += "No information" ;
        humidityParagraph.innerHTML += "No information";
        lastUpdatedParagraph.innerHTML += "No information";
        temperatureParagraph.innerHTML += "No information";
        windDegreeParagraph.innerHTML += "No information";
        windKmhParagraph.innerHTML += "No information";
      }
  }

//call the getData function when a click is do on the fetchbutton 
fetchButton.addEventListener("click", getData);
