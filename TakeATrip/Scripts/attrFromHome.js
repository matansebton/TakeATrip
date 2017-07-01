var table;
var placesId = [];
var geocoder;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var locations;
    //['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //['Bondi Beach', -33.890542, 151.274856, 4],
    //['Coogee Beach', -33.923036, 151.259052, 5],
    //['Maroubra Beach', -33.950198, 151.259302, 1],
    //['Cronulla Beach', -34.028249, 151.157507, 3]


$(document).ready(function () {
    
    table = $('#attrTable').DataTable({
        'columns': [
            {
                visible: false,
                orderable: false,
            },
            {

            },
            {
                render: function (data, type, row) {
                    var returnRank;
                    $.ajax({
                        url: '/Attractions/GetRanksList',
                        cache: false,
                        async: false,
                        data: 
                        {
                            id: row[0]
                        },
                        success: function (data) {
                            var ranks = [];
                            var sumOfWeight = 0;
                            var result;
                            $.each(data, function (index, value) {
                                var item = { Rank: value.Rank, Scale: value.Scale, Weight: value.Weight };
                                ranks.push(item);
                                sumOfWeight += value.Weight;
                            });
                            returnRank = Math.round(calcRank(ranks, sumOfWeight) * 100) / 100;
                        }
                    });
                    return returnRank;
                }
            },
            {
                visible: false,
                orderable: false,
            },
            {
                visible: false,
                orderable: false,
            },
            {
                visible: false,
                orderable: false,
            }

        ]
    });

    $('#attrTable tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        url = url.replace("__id__", data[0]);
        window.location.href = url;
    });

    $("#SelectedCatId").change(function () {
        table.draw();
    });

    

    $("#MainMenuNavbar .active").removeClass('active');
    $('#NavbarAttr').addClass('active');

});
$.fn.stars = function () {
    return $(this).each(function () {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var selectedCat = $("#SelectedCatId").val();
        if (selectedCat != "")
        {
            var catArr = data[3].split(",");
            catArr.pop();
            return ($.inArray(selectedCat, catArr) > -1);
        }
        return true;
    }
);

function calcRank(RanksArr, sumOfWeight) {
    var totalRank = 0;
    $.each(RanksArr, function (index, value) {
        totalRank += ((5 / value.Scale) * value.Rank) * (value.Weight / sumOfWeight);
    });
    return totalRank;
}

function createLocations()
{
    table.rows({ page: 'current' }).every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();
        var loc = [ data[1], parseFloat(data[4]), parseFloat(data[5]), rowIdx ];
        locations.push(loc);
    });
}



function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(locations[0][1], locations[0][2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsDisplay.setMap(map);
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    var request = {
        travelMode: google.maps.TravelMode.DRIVING
    };
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
        if (i == 0) request.origin = marker.getPosition();
        else if (i == locations.length - 1) request.destination = marker.getPosition();
        else {
            if (!request.waypoints) request.waypoints = [];
            request.waypoints.push({
                location: marker.getPosition(),
                stopover: true
            });
        }

    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

function CreateTrack()
{
    locations = [];
    createLocations();
    $("#map").fadeIn(0);
    initialize();
}