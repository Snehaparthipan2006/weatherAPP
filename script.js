

// const input=document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const Result = document.getElementById("weatherResult");

async function weatherCheck() {
  const myapi = "d1a16699f402c1d19904a9669a04ca12";
  const city = document.getElementById("cityInput").value.trim();
  document.getElementById("cityInput").value="";
   if (!city) {
        alert("Please enter a city name!");
        return;
      }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myapi}&units=metric`
    );
  
    const data = await res.json();

    if (data.cod === 200) {
      document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").innerText = `${data.main.temp}°C`;
      document.getElementById("description").innerText = data.weather[0].description;
      document.getElementById("details").innerText = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      Result.classList.remove("d-none");
     
    }
    
    else {
      alert("city not found")
    }

  }
  catch (error) {
    console.error("Error fetching data:", error);
      Result.innerHTML = `<p style="color:red;">Something went wrong. Please try again later.</p>`;
  }
}

// Search on button click
btn.addEventListener("click", weatherCheck);

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") weatherCheck();
});