# lifx-circadian-lan

You can schedule LIFX day & dusk bulbs to adjust their Kelvin over the course of the day, in much the same was as f.lux and Night Shift.

But, if you're still using non-smart wall switches, then it's likely that come the next day - when you switch the bulb on it will be the wrong Kelvin.

Example: Go to bed at night, with ultraWarm @ 50. Wake up, turn light on, still ultraWarm @ 50 :( when it should be cool @ 4000.

It's a shame LIFX bulbs don't process the schedules when the light is turned on, that would help. In the meantime, this script is an attempt to fix the problem. Albeit with a slight delay when resuming an appropriate Kelvin.

### Installation

`yarn install`
`yarn start`



