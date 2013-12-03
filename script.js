$().ready(function(){
    //$("#myModal").modal();
    
    // Map
    var mapOptions = {
        center: new google.maps.LatLng(50.445, 30.52),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var geocoder = new google.maps.Geocoder();
    var myDataRef = new Firebase('https://kipyatok.firebaseio.com/');
    
    $('.btn-success').bind('click', function(){
        myDataRef.push({
            placeName: $('#placeName').val(),
            placeUrl: $('#placeUrl').val(),
            placeAddress: $('#placeAddress').val(), 
            placeHours: $('#placeHours').val(),
            placePhone: $('#placePhone').val(),  
            placeLat: $('#placeLat').val(), 
            placeLng: $('#placeLng').val(), 
            placeComment: $('#placeComment').val()
        });
        $('#placeName, #placeUrl, #placeAddress, #placeHours, #placePhone, #placeLat, #placeLng, #placeComment').val('');
        $('#myModal').modal('hide');
        return false;
    });
    
    myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        console.log(message.placeName);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(message.placeLat, message.placeLng),
            map: map,
            title: message.placeName
        });
    });
    
    $('#placeAddress').bind('keyup, change', function(){
        var address = $(this).val();
        geocoder.geocode( {'address': 'Киев, ' + address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                $('#placeLng').val(results[0].geometry.location.lng());
                $('#placeLat').val(results[0].geometry.location.lat());
            }
        });
    });
    
});
