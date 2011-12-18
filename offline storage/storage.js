        $(document).ready(function() {
            
            var map = new L.Map('map');
            
            //
            // Add openstreetmap tile layer
            //
            
            //var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmUrl='http://otile2.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
            var osmAttrib='Map data © openstreetmap contributors';
            var osm = new L.TileLayer(osmUrl,{minZoom: 8, maxZoom: 18, attribution: osmAttrib});
            
            //
            // create a map center
            //
            
            var center = new L.LatLng(63.417286087926236, 10.404160022735596); // geographical point (longitude and latitude)
            
            map.addLayer(osm);
            
            
            // get coordinates of last marker from localstorage
            var lastMarkerCoords = localStorage.getItem('lastMarker');
            if(lastMarkerCoords != null)
            {
                /*
                 * If there is a key "lastMarker" in localStorage :
                 * Parse the JSON string stored in localStorage, create the marker, and add to the map
                 * set the marker as the map center
                 */
                var lastMarker = JSON.parse(lastMarkerCoords);
                var latlng = new L.LatLng(lastMarker.lat, lastMarker.lng);
                var LlastMarker = new L.Marker(latlng);
                map.addLayer(LlastMarker);
                map.setView(latlng, 13)
            }
            else
            {
                /*
                 * If there is NOT a key "lastMarker" in localStorage :
                 * set the temporary map center created above as map center 
                 */
                map.setView(center, 13)
            }
            
            //
            // Callback event for creating markers (click on map)
            //
            function clickOnMap(event) {
                
                // create new marker
                var marker = new L.Marker(event.latlng);
                
                // create a marker dictionary for storing both latitude and longitude in one string
                var marker_dict = {};
                marker_dict.lat = event.latlng.lat;
                marker_dict.lng = event.latlng.lng;
                
                // create a JSON string from the dictionary object
                var marker_string = JSON.stringify(marker_dict);
                
                // save the object/marker to localStorage
                localStorage.setItem('lastMarker', marker_string);
                
                // add the marker to the map
                map.addLayer(marker);
            }
            
            map.on('click', clickOnMap);
        });
