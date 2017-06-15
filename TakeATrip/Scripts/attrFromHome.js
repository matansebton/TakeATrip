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
                            returnRank = calcRank(ranks, sumOfWeight);
                        }
                    });
                    return returnRank;
                }
            },
            {
                visible: false,
                orderable: false,
            }
        ]
    });


    $("#SelectedCatId").change(function () {
        table.draw();
    });



    $("#MainMenuNavbar .active").removeClass('active');
    $('#NavbarAttr').addClass('active');

    $(function () {
        $('span.stars').stars();
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

