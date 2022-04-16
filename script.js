function GetInfo() {
    const newName = document.getElementById("cityInput") //get input from search box
    const cityName = document.getElementById("cityName")
    cityName.innerHTML ="Weather in " + newName.value


    //  in order to get weather details fromthe api we need js promises
    // get the response i.e. response.json ->it will return data
    // toFixed method for how many digits should be there after decimal
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName.value + "&units=metric&appid=b3da2122ad94e902ba91a121fa3a2a48").then(response => response.json()).then(data => {

      

        document.getElementById("tmp").innerHTML = Number(data.list[0].main.temp).toFixed(2) + "°";

        document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png"

        document.getElementById("description").innerHTML = data.list[0].weather[0].description;

        document.getElementById("humidity").innerHTML = "Humidity : " + data.list[0].main.pressure;

        document.getElementById("wind").innerHTML = "Wind Speed : " + data.list[0].wind.speed;

        for (i = 0; i < 5; i++) {

            document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min : " + Number(data.list[i].main.temp_min).toFixed(2) + "°";
        }
        for (i = 0; i < 5; i++) {

            document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max : " + Number(data.list[i].main.temp_max).toFixed(2) + "°";
        }
        for (i = 0; i < 5; i++) {
            //  img available at - weather conditions page
            document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

        }
    })
        // in case promise doesn't work use catch
        .catch(err => alert("something went wrong"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Bangalore";
    GetInfo();
}

// display different days
const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function checkDay(day) {
    // getDay is js func which return the current day
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}
for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
}
const time1 = document.getElementById('time');
const date1 = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hours12hrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    time1.innerHTML = (hours12hrFormat < 10 ? '0' + hours12hrFormat : hours12hrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    date1.innerHTML = days[day] + ',' + date + ' ' + months[month]

}, 1000);

 