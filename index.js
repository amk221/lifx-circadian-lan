const LifxClient = require('node-lifx').Client;
const client = new LifxClient();

client.init();

const kelvins = {
  cool: 4000,
  neutral: 3500,
  neutralWarm: 3200,
  warm: 3000,
  incandescent: 2750,
  ultraWarm: 2500
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
      brightness = 50;
      break;
    case 6:
    case 7:
      kelvin = 'cool';
      brightness = 30;
      break;
    case 8:
      kelvin = 'cool';
      brightness = 50;
      break;
    case 9:
      kelvin = 'cool';
      brightness = 70;
      break;
    case 10:
      kelvin = 'cool';
      brightness = 100;
      break;
    case 11:
    case 12:
    case 13:
    case 14:
      kelvin = 'neutral';
      brightness = 100;
      break;
    case 15:
    case 16:
      kelvin = 'neutralWarm';
      brightness = 100;
      break;
    case 17:
      kelvin = 'warm';
      brightness = 100;
      break;
    case 18:
      kelvin = 'warm';
      brightness = 70;
      break;
    case 19:
      kelvin = 'warm';
      brightness = 50;
      break;
    case 20:
    case 21:
      kelvin = 'incandescent';
      brightness = 50;
      break;
    case 22:
    case 23:
      kelvin = 'ultraWarm';
      brightness = 50;
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

  light.color(0, 0, brightness, kelvin, 1000);
}

client.on('light-online', autoSetConfig);
