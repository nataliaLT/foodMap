let map;
let infowindow;
let imagen = object.photo.getUrl:
function initMap(){
    //mapa con coordenadas actuales
    navigator.geolocation.getCurrentPosition(function(pos){
        lat=pos.coords.latitude;
        lon=pos.coords.longitude;
        let myLatIng = new google.maps.LatLng(lat, lon);

        let mapOptions = {
            center: myLatIng,
            zoom: 14,
           mapTypeId: google.maps.MapTypeId.SATELITE
        };
        map= new google.maps.Map(document.getElementById('map'), mapOptions);

        //infowindow
        infowindow = new google.maps.InfoWindow();

        //especificamos la localizacion, el radio y el tipo de lugares que queremos obtener
        let request = {
            location: myLatIng,
            radius: 5000,
            fields:['rating', 'opening_hours'],
            types: ['restaurant']
            
        };
        console.log(request.fields);
        //creamos el servicio placeService y enviamos la peticion
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status){
            if(status === google.maps.places.PlacesServiceStatus.OK){
                for(var i=0; i<results.length; i++){
                    crearMarcador(results[i]);
                    console.log(results[i]);
                }
            }
        });
    });
}
function crearMarcador(place){
    //creamos un marcador
    let marker= new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    //asignamos el evento click del marcador
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

/*

let map;
let infowindow;
const santiago = {lat: -33.418952, lng:  -70.641750};

// Initialize and add the map
function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: santiago});

        var request = {
            location: santiago,
            radius: '500',
            type:['restaurant', 'food']
        };
          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
        };
       
        
        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }        
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: santiago, map: map});
  */