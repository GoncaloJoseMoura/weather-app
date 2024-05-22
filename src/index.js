import './style.css';
import { format } from 'date-fns';

import sunny from './assets/weather/sunny.svg';
import cloudy from './assets/weather/cloudy.svg';
import rain from './assets/weather/rain.svg';

import Portugal from './assets/background/Portugal.jpg';
import Australia from './assets/background/Australia.jpg';
import Brazil from './assets/background/Brasil.jpg';
import Dubai from './assets/background/Dubai.jpg';
import France from './assets/background/France.jpg';
import Germany from './assets/background/Germany.jpg';
import Greece from './assets/background/Greece.jpg';
import Iceland from './assets/background/Iceland.jpg';
import India from './assets/background/India.jpg';
import Italy from './assets/background/Italy.jpg';
import Japan from './assets/background/Japan.jpg';
import Mexico from './assets/background/Mexico.jpg';
import Netherlands from './assets/background/Netherlands.jpg';
import NewZealand from './assets/background/New Zealand.jpg';
import Random from './assets/background/Random.jpg';
import SouthAfrica from './assets/background/South Africa.jpg';
import Spain from './assets/background/Spain.jpg';
import Switzerland from './assets/background/Switzerland.jpg';
import Thailand from './assets/background/Thailand.jpg';
import UnitedKingdom from './assets/background/United Kigdom.jpg';
import UnitedStates from './assets/background/United States.jpg';
import Vietnam from './assets/background/Vietnam.jpg';

const API_KEY = 'fc0fbc8accc6479c8fb193345242105';

const countries = {
    Australia,
    Brazil,
    Dubai,
    France,
    Germany,
    Greece,
    Iceland,
    India,
    Italy,
    Japan,
    Mexico,
    Netherlands,
    'New Zealand': NewZealand,
    Portugal,
    'South Africa': SouthAfrica,
    Spain,
    Switzerland,
    Thailand,
    'United Kingdom': UnitedKingdom,
    'United States': UnitedStates,
    Vietnam,
};

async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`, {
        mode: 'cors',
    });
    const info = await response.json();

    const weatherdata = formatData(info);

    if (countries[weatherdata.country] !== undefined) {
        document
            .querySelector('body')
            .style.setProperty(
                'background-image',
                `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${countries[weatherdata.country]})`,
            );
    } else {
        document
            .querySelector('body')
            .style.setProperty(
                'background-image',
                `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Random})`,
            );
    }

    return weatherdata;
}

function formatData(info) {
    return {
        city: info.location.name,
        country: info.location.country,
        region: info.location.region,
        forecast: info.forecast.forecastday,
    };
}

async function CreateDom(data) {
    const inputs = await data;

    console.log(inputs);

    const ul = document.querySelector('.weather ul');

    const title = document.querySelector('.title');
    title.innerHTML = '';
    ul.innerHTML = '';

    const titleContent = document.createElement('h3');
    titleContent.textContent = inputs.city;
    title.appendChild(titleContent);

    inputs.forecast.forEach((element) => {
        const rawDate = new Date(element.date.split('-'));

        const li = document.createElement('li');
        const week = ul.innerHTML === '' ? 'Today' : format(rawDate, 'EEEE');
        const dateFormatted = format(rawDate, 'dd MMM yy');

        li.innerHTML = `
                            <h3>${week}<br><span>${dateFormatted}</span></h3>
                            <img src="" alt="">
                            <p>T: ${element.day.avgtemp_c} C</p>
                            <p>H: ${element.day.avghumidity} %</p>
                        `;

        if (element.day.condition.text.toLowerCase().includes('sunny')) {
            li.querySelector('img').src = sunny;
        } else if (element.day.condition.text.toLowerCase().includes('rain')) {
            li.querySelector('img').src = rain;
        } else {
            li.querySelector('img').src = cloudy;
        }

        ul.appendChild(li);
    });
}
CreateDom(getWeather('lisbon'));

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    CreateDom(getWeather(formData.get('location')));
});
