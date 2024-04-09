// Global Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b2c57e3c19d8aeee4caaf2f03dfaea33';
const userInfo = document.getElementById('userInfo');
const generateBtn = document.getElementById('generate');

// Event listener
generateBtn.addEventListener('click', performAction);

// Event handler function
function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        generateBtn.classList.remove('invalid');
        getWeatherData(baseUrl, zipCode, apiKey)
            .then((data) => {
                postData('/add', { temp: convertKelvinToCelsius(data.main.temp), date: newDate, content: content })
                    .then(updateUI)
                    .catch((error) => {
                        console.log(error);
                        alert('An error occurred while posting data. Please try again.');
                    });
            })
            .catch((error) => {
                console.log(error);
                alert('The zip code is invalid. Please try again.');
            });

        userInfo.reset();
    } else {
        generateBtn.classList.add('invalid');
    }
}

// Function to fetch weather data
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    const data = await res.json();
    return data;
};

// Function to post data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const newData = await response.json();
    return newData;
};

// Function to update UI
const updateUI = async () => {
    const request = await fetch('/all');
    const allData = await request.json();

    if (allData.date && allData.temp && allData.content) {
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = `${allData.temp} degree C`;
        document.getElementById('content').innerHTML = allData.content;
    }
};

// Function to convert Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    return kelvin < 0 ? 'below absolute zero (0 K)' : (kelvin - 273.15).toFixed(2);
}

// Create a new date instance dynamically
const d = new Date();
const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
