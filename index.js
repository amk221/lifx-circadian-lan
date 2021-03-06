const LifxClient = require('lifx-lan-client').Client;
const cron = require('node-cron');

const thirtySeconds = 30000;

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
  incandescent: 2700,
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
    case 13:
    case 14:
    case 15:
      return 'neutral';
    case 16:
    case 17:
      return 'neutralWarm';
    case 18:
    case 19:
      return 'warm';
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

function autoSetKelvin(light) {
  light.getState((error, state) => {
    if (error) {
      console.error(error);
      return;
    }

    const { color: current } = state;
    const name = kelvinForNow();
    const kelvin = kelvins[name];

    if (current.kelvin === kelvin) {
      return;
    }

    light.color(
      current.hue,
      current.saturation,
      current.brightness,
      kelvin,
      thirtySeconds
    );
  });
}

function main() {
  const client = new LifxClient;

  client.init();

  // Light switched on at the wall...
  client.on('light-new', autoSetKelvin);

  // Light switched on using the app...
  client.on('light-online', autoSetKelvin);

  // Every minute...
  cron.schedule('* * * * *', () => {
    client.lights('on').forEach(autoSetKelvin);
  });
}

main();