let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let $ = document;
let searchBox = $.querySelector(".search-box");
let modal = $.querySelector(".modal");
let city = $.querySelector(".city");
let date = $.querySelector(".date");
let temp = $.querySelector(".temp");
let weather = $.querySelector(".weather");
let hi_Low = $.querySelector(".hi-low");
let celsius;
let temp_min;
let temp_max;
let today;
searchBox.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&appid=4d5a1aad247adbd31bb44c9e1006dbe9`
		)
			.then((res) => {
				if (res.status == 404) {
					modal.style.display = "block";
					modal.innerHTML = "City Name Is Not Valid";
				} else if (res.status == 400) {
					modal.style.display = "block";
					modal.innerHTML = "This Field Is Required";
				} else {
					modal.style.display = "none";
					return res.json();
				}
			})
			.then((data) => {
				if (data) {
					Object.entries(data);
					// City Name
					city.innerHTML = data.name;
					// City Temp
					celsius = Math.floor(data.main.temp - 273.15);
					temp.innerHTML = `${celsius}<span>°c</span>`;
					// Date
					today = new Date();
					date.innerHTML = `${days[today.getDay()]} ${today.getDate()} ${
						months[today.getMonth()]
					} ${today.getFullYear()}`;
					// Min and Max Temp and Weather Type
					weather.innerHTML = data.weather[0].main;
					temp_min = Math.floor(data.main.temp_min - 273.15);
					temp_max = Math.floor(data.main.temp_max - 273.15);
					hi_Low.innerHTML = `${temp_min}/${temp_max}`;
				}
			});
	}
});
