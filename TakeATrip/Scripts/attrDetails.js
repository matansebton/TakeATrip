$(document).ready(function () {
    $("#MainMenuNavbar .active").removeClass('active');
    $('#NavbarAttr').addClass('active');

    var lat = parseFloat($("#Location_StartPoint_Latitude").val());
    var lng = parseFloat($("#Location_StartPoint_Longitude").val());

    var geocoder = new google.maps.Geocoder;

    var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    var placeId = null;

    $.get('../../Attractions/GetRanksList', { id: $("#Id").val() }, function (data) {
        var ranks = [];
        var sumOfWeight = 0;
        var result;
        $("#attractionRanks").empty().append("<ul class='list-group'>");
        $.each(data, function (index, value) {
            var item = { Rank: value.Rank, Scale: value.Scale, Weight: value.Weight };
            $("#attractionRanks").append("<li class='list-group-item rankList'><img class=logo src='" + value.Logo + "' alt='website logo' width='42' height='42'>" + value.Name + "<span class='label label-default websiteRank'>" + value.Rank + "</span></li>");
            ranks.push(item);
            sumOfWeight += value.Weight;
        });
        $("#attractionRanks").append("</ul>");
        result = calcRank(ranks, sumOfWeight);
        $("#rankLabel").text(result);
        $(".stars").text(result);
        $('span.stars').stars();

    });

    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                $("#addressSubtext").text(results[1].formatted_address);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });


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

function calcRank(Ranks,sumOfWeight)
{
    var totalRank = 0;
    $.each(Ranks, function (index, value) {
        totalRank += ((5 / value.Scale) * value.Rank) * (value.Weight / sumOfWeight);
    });
    return totalRank;
}

