# Workshop 9 – JavaScript Libraries

**Laurea University of Applied Sciences**  
**Course:** Web Development 1 – Front End

## Project Overview

In this workshop, I explored different JavaScript libraries and how they can be used to add functionality, animations, and interactive visualizations to web applications.

I started with the teacher's examples and decided to expand them with additional features and a more customized visual presentation.

The project includes three small applications.

## Live Demo

I published the workshop using GitHub Pages so the examples can be opened and tested directly in a browser, including on mobile devices.

**Website:** https://israelgarcia666.github.io/Workshop9-JavaScript-Libraries/

The main page contains links to the other two applications. An internet connection is required for the weather data and externally hosted libraries. Some 3D animations require a browser with WebGL support.

## 1. Weather Dashboard

**Files:** `index.html`, `script.js`

**Libraries and APIs:**

- Axios
- Apache ECharts
- jQuery
- Open-Meteo REST API

The application retrieves five-day weather forecasts for different cities and displays temperature information using interactive charts.

**My modifications:**

- Replaced OpenWeatherMap with Open-Meteo, which does not require an API key for noncommercial use.
- Replaced Chart.js with Apache ECharts because I wanted a nicer visual presentation and more interactive charts.
- Added Line, Bar, and Area chart options.
- Used jQuery for button events and a fade animation.
- Improved the page layout using CSS.

## 2. Cat's Scrambled Weather Forecast

**File:** `WS09_Jokeri_Koodikissan_Saaennuste_ENG.html`

**Libraries:**

- Baffle.js
- Vanta.js
- Three.js (used by Vanta.js)

This application displays funny weather forecasts using animated scrambled text.

**My modifications:**

- Added random forecast selection without repeating the previous message.
- Added an animated 3D cloud background using Vanta.js.
- Created a moonlit scene with moving clouds using CSS animations.
- Changed the layout to integrate the animations with the forecast.

## 3. 3D Weather Advisor

**Files:** `WS09_SweetAlert2_Saavinkki_ENG.html`, `weather-effects.js`

**Libraries:**

- SweetAlert2
- Three.js

The application allows users to select a weather condition and receive advice through a customized popup.

**My modifications:**

- Added four weather conditions: Sunny, Rainy, Snowy, and Windy.
- Created a different 3D animation for each condition.
- Added animated clouds, rain particles, falling snow, and wind effects.
- Added dynamic background colors depending on the selected condition.
- Used JavaScript objects to organize the advice messages.

_The Weather Advisor conditions are selected manually and are not connected to live weather forecasts._

## What I Learned

During this workshop, I practiced:

- Importing and using external JavaScript libraries.
- Working with public REST APIs and JSON data.
- Using Axios for HTTP requests.
- Manipulating HTML elements and handling events with jQuery.
- Creating interactive data visualizations.
- Using Three.js for 3D graphics and particle animations.
- Combining JavaScript functionality with CSS animations.
- Debugging JavaScript using Chrome Developer Tools.
- Organizing and publishing a web development project with GitHub.

## Running the Project

Open `index.html` using VS Code Live Server, or use the GitHub Pages link above.

The main page contains links to the other two applications.

An internet connection is required for the weather API and externally loaded JavaScript libraries.

## Mobile Testing

The project was published using GitHub Pages to test its functionality and responsiveness on desktop and mobile devices.

- [x] Weather dashboard and interactive charts.
- [x] City search and weather data retrieval.
- [x] Baffle.js text animation.
- [x] Vanta.js animated cloud background.
- [x] Three.js weather animations.
- [x] SweetAlert2 popups.
- [x] Navigation between all three applications.
- [x] Mobile layout and readability.

During mobile testing, I noticed that the sun and clouds in the Sunny scene were not visible on narrow screens. I fixed this by dynamically adjusting the position, scale, and movement of the 3D objects according to the screen width.

All three applications were successfully tested on desktop and mobile devices.

## Credits

Original workshop materials: [Laurea Web Development 1 – Workshop 9](https://github.com/juhkast/laurea-web-development-1/tree/main/WS09_JS_libraries).

Weather data: [Open-Meteo](https://open-meteo.com/).

JavaScript libraries: [Axios](https://axios-http.com/), [Apache ECharts](https://echarts.apache.org/), [jQuery](https://jquery.com/), [Baffle.js](https://camwiegert.github.io/baffle/), [Vanta.js](https://www.vantajs.com/), [Three.js](https://threejs.org/), and [SweetAlert2](https://sweetalert2.github.io/).

## AI Assistance

I used ChatGPT for guidance, explanations, debugging, and suggestions during the development of the workshop. I tested the applications and made decisions about their functionality and visual design.
