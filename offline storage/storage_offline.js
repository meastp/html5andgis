        $(document).ready(function() {
            
            var map = new L.Map('map');
            
            //
            // Create a new GeoJSON layer for the map
            //
            // glosh_buildings_wgs84.json : Buildings on Gløshaugen, NTNU
            
            var glosh_buildings = new L.GeoJSON();
            
            // set the style for the layer
            glosh_buildings.on('featureparse', function(e) {
                e.layer.setStyle({ color:  '#BDBDBD', weight: 1, fill: true, fillColor: '#EF6548', fillOpacity: 0.85 });
            });
            
            // retrieve the geojson file with ajax
            $.getJSON('glosh_build_wgs84.json', function(data){
                glosh_buildings.addGeoJSON(data);
            });
            
            map.addLayer(glosh_buildings)
            
            //
            // Create a new GeoJSON layer for the map
            //
            // glosh_wgs84.json : Roads and paths on Gløshaugen, NTNU
            
            var glosh = new L.GeoJSON();
            
            // set the style for the layer
            glosh.on('featureparse', function(e) {
                e.layer.setStyle({ color:  '#FFFFFF', weight: 1 });
            });
            
            // retrieve the geojson file with ajax
            $.getJSON('glosh_wgs84.json', function(data){
                glosh.addGeoJSON(data);
            });
            
            map.addLayer(glosh)
            
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
