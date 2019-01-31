const LifxClient = require('node-lifx').Client;

const interval = 10000;
const duration = 5000;

const kelvins = {
  blueIce: 9000,
  blueWater: 8500,
  blueOvercast: 8000,
  blueDaylight: 7500,
  cloudyDaylight: 7000,
  brightDaylight: 6500,
  noonDaylight: 6000,
  daylight: 5500,
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

function kelvinForHour(hour) {
  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
      return 'ultraWarm';
    case 4:
    case 5:
      return 'incandescent';
    case 6:
    case 7:
      return 'warm';
    case 8:
    case 9:
      return 'neutralWarm';
    case 10:
    case 11:
    case 12:
      return 'neutral';
    case 13:
    case 14:
    case 15:
      return 'neutralWarm';
    case 16:
    case 17:
    case 18:
      return 'warm';
    case 19:
    case 20:
    case 21:
      return 'incandescent';
    case 22:
    case 23:
      return 'ultraWarm';
  }
}

function kelvinForNow() {
  const hour = (new Date).getHours();
  return kelvinForHour(hour);
}

function autoSetConfig(light) {
  const name = kelvinForNow();

  light.getState((error, { color: current }) => {
    const kelvin = kelvins[name];

    if (error || current.kelvin === kelvin) {
      return;
    }

    light.color(
      current.hue,
      current.saturation,
      current.brightness,
      kelvin,
      duration
    );
  });
}

function main() {
  const client = new LifxClient;

  client.init();
  client.on('light-new', autoSetConfig);
  client.on('light-online', autoSetConfig);

  setInterval(() => {
    client.lights('on').forEach(autoSetConfig);
  }, interval);
}

main();