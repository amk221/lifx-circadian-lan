const LifxClient = require('node-lifx').Client;
const client = new LifxClient;

client.init();
client.on('light-new', lightNew);
client.on('light-online', lightOnline);

const fadeDuration = 5000;

const kelvins = {
  blueIce: 9000,
  blueWater: 8500,
  blueOvercast: 8000,
  blueDaylight: 7500,
  cloudyDaylight: 7000,
  brightDaylight: 6500,
  noonDaylight: 6000,
  daylight: 5000,
  softDaylight: 5000,
  coolDaylight: 4500,
  cool: 4000,
  neutral: 3500,
  neutralWarm: 3200,
  warm: 3000,
  incandescent: 2750,
  ultraWarm: 2500,
  sunset: 2000,
  candleLight: 1500
};

function configForHour(hour) {
  let kelvin;
  let brightness;

  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      kelvin = 'ultraWarm';
      brightness = 80;
      break;
    case 6:
    case 7:
      kelvin = 'neutral';
      brightness = 80;
      break;
    case 8:
    case 9:
    case 10:
    case 11:
      kelvin = 'neutral';
      brightness = 100;
      break;
    case 12:
    case 13:
    case 14:
      kelvin = 'neutralWarm';
      brightness = 100;
      break;
    case 15:
    case 16:
    case 17:
      kelvin = 'warm';
      brightness = 100;
      break;
    case 18:
    case 19:
    case 20:
    case 21:
      kelvin = 'incandescent';
      brightness = 100;
      break;
    case 22:
    case 23:
      kelvin = 'ultraWarm';
      brightness = 80;
      break;
  }

  return { kelvin, brightness };
}

function configForNow() {
  const hour = (new Date).getHours();
  return configForHour(hour);
}

function autoSetConfig(light) {
  const { kelvin, brightness } = configForNow();
  light.color(0, 0, brightness, kelvins[kelvin], fadeDuration);
}

function logError() {
  console.error(...arguments);
}

function logLight(message, light, info) {
  const now = new Date;
  const { label, color: { brightness, kelvin }} = info;
  console.log(`${now} | ${message}: ${label} (Brightness: ${brightness}, Kelvin: ${kelvin})`);
}

function lightOnline(light) {
  light.getState((error, info) => {
    if (error) {
      logError(error);
    } else {
      logLight('Light online', light, info);
      autoSetConfig(light);
    }
  });
}

function lightNew(light) {
  light.getState((error, info) => {
    if (error) {
      logError(error);
    } else {
      logLight('New light', light, info);
      autoSetConfig(light);
    }
  });
}

