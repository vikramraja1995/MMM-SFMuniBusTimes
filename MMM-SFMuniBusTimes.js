Module.register("MMM-SFMuniBusTimes", {
  // Define default config
  defaults: {
    stops: {
      6994: ["J", "KT", "L", "M", "N"],
      3328: ["33"],
    },
    updateInterval: 1000,
  },

  // Send start notification to node_helper
  start: function() {
    this.sendSocketNotification("START", this.config);
    Log.log(this.name + " has started!");
  },

  // Load required CSS files
  getStyles: function() {
    return ["MMM-SFMuniBusTimes.css"];
  },

  // Update DOM with appropriate view to display all Train / Bus data
  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    // If no route data has been fetched, display 'Loading...' message
    if (this.schedule === undefined) {
      wrapper.innerHTML = "Loading MUNI Times...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    // Loop through each stop in schedule and populate the UI
    for (let stop of this.schedule) {
      const stopWrapper = document.createElement("div");
      wrapper.appendChild(stopWrapper);

      // Create a header element that displays the stop name
      const stopName = document.createElement("header");
      stopName.innerHTML = stop.stop;
      stopName.className = "stop";
      stopWrapper.appendChild(stopName);

      // Create a table that will hold all train / bus times
      const table = document.createElement("table");
      table.className = "small";
      stopWrapper.appendChild(table);

      // Loop through each route for the current stop
      for (const routeObj of stop.routes) {
        const { route } = routeObj;

        if (routeObj.trains && routeObj.trains.length < 1) continue;

        // Create a row that will hold the route and next 3 bus / train times
        const row = document.createElement("tr");
        table.appendChild(row);

        // Create a route cell that will hold the route number / letter
        const routeCell = document.createElement("td");
        routeCell.innerHTML = route;
        routeCell.className = "route";
        row.appendChild(routeCell);

        let first = true;
        // Loop through each train for the current route
        for (const train of routeObj.trains) {
          const trainCell = document.createElement("td");
          // Calculate the minutes remaining for the train / bus to arrive
          const mins = Math.floor(train.seconds / 60);

          // If first train, display the seconds as well
          if (first) {
            const secs = "" + (train.seconds % 60);
            const secText = secs.length === 1 ? "0" + secs : secs;
            trainCell.innerHTML = `${mins}:${secText} mins`;
            first = false;
          }
          // If not, display only minutes
          else {
            trainCell.innerHTML = `${mins} mins`;
          }
          trainCell.className = "train";
          row.appendChild(trainCell);
        }
      }
    }
    return wrapper;
  },

  // Handle messages from node_helper.js
  socketNotificationReceived: function(notification, payload) {
    if (notification === "MUNI_TIMINGS") {
      // Update schedule property with route data received from node_helper and update the DOM
      this.schedule = payload;
      this.updateDom();
    }
  },
});
