function initMap() {
  // Create the map.
  const the_living_room = { lat: 29.282981, lng: -94.800104 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: the_living_room,
    zoom: 15,
  });

  //create marker
  const marker = new google.maps.Marker({
    position: the_living_room,
    map,
    title: "The Living Room",
  });

  const content_string =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">The Living Room</h1>' +
    '<div id="bodyContent">' +
    "<p> 2402 Avenue Q 1/2, Galveston, TX 77550 </p>";

  const infowindow = new google.maps.InfoWindow({
    content: content_string,
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
  // Create the places service.
  const service = new google.maps.places.PlacesService(map);
  let getNextPage;
  const moreButton = document.getElementById("more");

  moreButton.onclick = function () {
    moreButton.disabled = true;
    if (getNextPage) {
      getNextPage();
    }
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: the_living_room, radius: 2000, type: "store" },
    (results, status, pagination) => {
      if (status !== "OK" || !results) return;

      addPlaces(results, map);
      moreButton.disabled = !pagination || !pagination.hasNextPage;
      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage();
        };
      }
    }
  );
}

function addPlaces(places, map) {
  const placesList = document.getElementById("places");

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      // let image = {
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25),
      // };

      // new google.maps.Marker({
      //   map,
      //   icon: image,
      //   title: place.name,
      //   position: place.geometry.location,
      // });

      const li = document.createElement("li");
      li.className = "place";

      li.textContent = place.name;
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.zoom = 18;
        map.setCenter(place.geometry.location);
      });
    }
  }

  const returns = document.getElementById("return");
  returns.addEventListener("click", () => {
    map.zoom = 15;
    map.setCenter({ lat: 29.282981, lng: -94.800104 });
  });
}

window.initMap = initMap;
