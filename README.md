[![dependencies Status](https://david-dm.org/vikramraja1995/MMM-SFMuniBusTimes/status.svg)](https://david-dm.org/vikramraja1995/MMM-SFMuniBusTimes) [![Module Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#) [![Project Status](https://img.shields.io/badge/Status-Maintained-brightgreen.svg)](https://github.com/vikramraja1995/MMM-SFMuniBusTimes/issues)  [![GNU GPLv3 License](https://img.shields.io/badge/license-GPLv3-blueviolet.svg)](https://github.com/vikramraja1995/MMM-SFMuniBusTimes/blob/master/LICENSE) [![Known Vulnerabilities](https://snyk.io/test/github/vikramraja1995/MMM-SFMuniBusTimes/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vikramraja1995/MMM-SFMuniBusTimes?targetFile=package.json)
# MMM-SFMuniBusTimes

This module gets the schedule of San Francisco's MUNI Bus / Rail for any given stop. It displays how long the next 3 busses or trains will take to arrive (in minutes), with the closest one showing the seconds until it's arrival as well.

## Table Of Contents

- [Screenshot](#screenshot)
- [Installation](#installation)
- [Configuration](#configuration)
- [Contribute](#contribute)

## Screenshot

![Screenshot of the module](https://github.com/vikramraja1995/MMM-SFMuniBusTimes/raw/master/screenshot.png)

## Installation

1. Navigate to the modules directory within your MagicMirror installation and run the following command to clone the repository: `git clone https://github.com/vikramraja1995/MMM-SFMuniBusTimes.git`
2. Inside the `MMM-SFMuniBusTimes` directory, run the following command to install all dependencies: `npm install`
3. Edit your MagicMirror config file located at `[MagicMirror]/config/config.js` and add the following piece of code inside the `modules` array to enable the module. _Check out the [Configuration](#configuration) section for more information on how to properly configure the module._

```js
{
 module: "MMM-SFMuniBusTimes",
 position: "top_right",
 config: {
   stops: {
     6994: ["J", "KT", "L", "M", "N"],
     3328: ["33"],
   },
   updateInterval: 1000,
 },
},
```

## Configuration

| **Config**       | **Description**                                                                                                                                                                                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`       | The location of the module in which the module will be loaded. Possible values are `top_bar`, `top_left`, `top_center`, `top_right`, `upper_third`, `middle_center`, `lower_third`, `bottom_left`, `bottom_center`, `bottom_right`, `bottom_bar`, `fullscreen_above`, and `fullscreen_below`. |
| `config>stops`   | This is an object that contains the stop IDs as key and an array of route IDs as the value. See below for instructions on how to find your stop and route IDs.                                                                                                                                |
| `updateInterval` | This is the amount of time in ms that the module will wait before calling the API and updating the schedule.                                                                                                                                                                                  |

---

For a list of routes, go to the following URL `https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=sf-muni`.

You will see each route is displayed in the following format: `<route tag="F" title="F-Market & Wharves"/>`. The `title` contains the actual route name, and the `tag` denotes the route ID.

---

For a list of stops on a route, go to the following URL `https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=sf-muni&r=<ROUTE_ID>` (Replace `<ROUTE_ID>` with the appropriate route ID found in the URL mentioned earlier).

You will see each stop displayed in the following format `<stop tag="6293" title="Sacramento St & Cherry St" lat="37.7869099" lon="-122.45656" stopId="16293"/>`. Just like the route information seen earlier, the `title` denotes the actual stop name and the `tag` denotes the stop ID. Although there is a separate `stopId` property as seen above, we actually want what's inside the tag property.

Make sure you have the correct stop, as some stations have different IDs for Inbound and Outbound directions. For example:

```xml
<stop tag="5731" title="Montgomery Station Inbound" lat="37.7886999" lon="-122.40192" stopId="15731"/>
<stop tag="6994" title="Montgomery Station Outbound" lat="37.78879" lon="-122.4021299" stopId="16994"/>
```

---

The NextBus API that is being used here is free and open to the public, and does not require that you obtain an access key.
If you are interested in learning more about the API, have a look at its documentation here: https://retro.umoiq.com/xmlFeedDocs/NextBusXMLFeed.pdf

## Contribute

Would you like to contribute to this module? Well you are more than welcome to! Clone this repo and make your changes, and submit your pull request.

Have any feature suggestions or bug reports? Submit them [here](https://github.com/vikramraja1995/MMM-SFMuniBusTimes/issues) and I will check them out!
