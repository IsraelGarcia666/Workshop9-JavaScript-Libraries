// I replaced OpenWeatherMap with the public REST API from Open-Meteo.
// This API doesn't require an API key for non-commercial use.
let tempChart = null; // Global chart reference
let chartData = {}; // Store data and labels for reuse
let city = "Helsinki";
const language = document.documentElement.lang === "en" ? "en" : "fi";

async function haeSaa() {
  city = document.getElementById("kaupunki").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    // Step 1: Find the city's coordinates.
    const geoResponse = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: city,
          count: 1,
          language: language,
        },
      },
    );

    const location = geoResponse.data.results?.[0];

    if (!location) {
      throw new Error("City not found");
    }

    // Step 2: Get the five-day temperature forecast.
    const weatherResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          hourly: "temperature_2m",
          forecast_days: 5,
          timezone: "auto",
        },
      },
    );

    const times = weatherResponse.data.hourly.time;
    const temps = weatherResponse.data.hourly.temperature_2m;

    // Keep one temperature measurement every three hours.
    const labels = times
      .filter((_, index) => index % 3 === 0)
      .map((time) => {
        const [date, hour] = time.split("T");
        const [year, month, day] = date.split("-");
        return `${Number(day)}.${Number(month)}. ${hour}`;
      });

    const temperatures = temps.filter((_, index) => index % 3 === 0);

    chartData = { labels, temperatures };

    // Step 3: Draw the chart using Chart.js.
    const type = document.getElementById("chartType").value;
    piirraKaavio(labels, temperatures, city, type);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Could not retrieve the weather forecast. Check the city name.");
  }
}

// Load the weather for Helsinki when the page opens.
haeSaa();

function piirraKaavio(labels, data, city, type) {
  const container = document.getElementById("tempChart");

  // I chose Apache ECharts instead of Chart.js because I wanted
  // a nicer visual presentation and more interactive weather charts.

  // Initialize the chart only once.
  if (!tempChart) {
    tempChart = echarts.init(container);
  }

  const isBar = type === "bar";
  const isArea = type === "area";

  const option = {
    title: {
      text: `5-Day Weather Forecast – ${city}`,
      left: "center",
      textStyle: {
        fontSize: 20,
        color: "#243b53",
      },
    },

    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => `${value} °C`,
    },

    grid: {
      left: 65,
      right: 30,
      top: 80,
      bottom: 90,
    },

    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        color: "#52667a",
        hideOverlap: true,
      },
    },

    yAxis: {
      type: "value",
      name: "Temperature (°C)",
      scale: true,
      axisLabel: {
        formatter: "{value} °C",
      },
    },

    dataZoom: [
      { type: "inside" },
      {
        type: "slider",
        start: 0,
        end: 100,
        bottom: 20,
      },
    ],

    series: [
      {
        name: "Temperature",
        type: isBar ? "bar" : "line",
        data: data,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: "#168aad",
        },
        areaStyle: isArea ? { opacity: 0.2 } : undefined,
      },
    ],
  };

  tempChart.setOption(option, true);
}

// Make the chart responsive when resizing the browser.
window.addEventListener("resize", () => {
  if (tempChart) tempChart.resize();
});

function paivitaKaavio() {
  // Get the selected chart type.
  let type = document.getElementById("chartType").value;
  console.log(type);
  // Redraw the chart with the selected type and previously fetched data.
  piirraKaavio(chartData.labels, chartData.temperatures, city, type);
}

// $("#haeSaaPainike").on("click", haeSaa);

$("#haeSaaPainike").on("click", function () {
  $("#saaYllatys").stop(true, true).hide().fadeIn(200).delay(1000).fadeOut(400);
  haeSaa();
});
