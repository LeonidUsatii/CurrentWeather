const contPlace = document.getElementById('contPlace');
const contWeather = document.getElementById('contWeather');

let urlWeather =
  'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true';
const urlMyPlace = 'https://get.geojs.io/v1/ip/geo.json';

let myCity,
  myCountry,
  myLatitude,
  myLongitude,
  myTemperature,
  myWindSpeed,
  myWindDirection;

function urlMyWeather() {
  const myArr1 = urlWeather.split('&');
  let s1 = myArr1[0];
  let s2 = myArr1[1];
  let s3 = myArr1[2];
  const myArr2 = s1.split('=');
  let s4 = myArr2[0];
  let latitude = myArr2[1];
  latitude = myLatitude;
  const myArr3 = s2.split('=');
  let s6 = myArr3[0];
  let longitude = myArr3[1];
  longitude = myLongitude;
  urlWeather = s4 + '=' + latitude + '&' + s6 + '=' + longitude + '&' + s3;
  return urlWeather;
}

const weather = async () => {
  let response = await fetch(urlMyPlace);
  let res = await response.json();
  const { country, city, longitude, latitude } = res;
  myCountry = country;
  myCity = city;
  myLongitude = longitude;
  myLatitude = latitude;
  showPlace();
  myWeather();
};

function showPlace() {
  let data = `<p class="coordinates">< <span class="coordinates-sp">${myLatitude}</span>,     
  <span class="coordinates-sp">${myLongitude}</span> ></p> 
  <p class="text">Страна: <span class="text-sp">${myCountry}</span></p> 
  <p class="text">Город: <span class="text-sp">${myCity}</span></p>`;
  contPlace.innerHTML = data;
}

const myWeather = async () => {
  let response = await fetch(urlMyWeather());
  let res = await response.json();
  myTemperature = res.current_weather.temperature;
  console.log(myTemperature);
  myWindSpeed = res.current_weather.windspeed;
  myWindDirection = res.current_weather.winddirection;
  showWeather();
};

function showWeather() {
  let data = `<h2><span class="h2-sp">Текущая погода : </span></h2> 
   <p class="text">Температура: <span class="text-sp">${myTemperature}</span></p>
   <p class="text">Скорость ветра: <span class="text-sp">${myWindSpeed}</span></p>
   <p class="text">Направление ветра: <span class="text-sp">${myWindDirection}</span></p>`;
  contWeather.innerHTML = data;
}

weather();
