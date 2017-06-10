$(document).ready(function () {

    initCountries();
    $('#CountrySelect').change(countrySelect);



});

function countrySelect() {
    $("#Country").val($("#CountrySelect option:selected").text());

    $("#SelectedCatId").change(function () {

    });

    $.getJSON("/Content/countriesToCities.json", function (data) {
        $.each(data, function (key, val) {
            if (key == $("#CountrySelect option:selected").text()) {
                var s = $("<select class='form-control' id='citySelect' />");
                $.each(val, function (index, value) {
                    $("<option />", { value: value, text: value }).appendTo(s);
                });
                $("#CitySelectContainer").empty().html(s);

                $('#citySelect').change(function () {
                    $("#City").val($("#citySelect option:selected").text());
                });

                var options = $('#citySelect option');
                var arr = options.map(function (_, o) { return { t: $(o).text(), v: o.value }; }).get();
                arr.sort(function (o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
                options.each(function (i, o) {
                    o.value = arr[i].v;
                    $(o).text(arr[i].t);
                });
                return;
            }
        });
    });
}

function initCountries() {
    $.getJSON("/Content/countriesToCities.json", function (data) {
        $.each(data, function (key, val) {
            $('#CountrySelect')
                .append($("<option></option>")
                    .attr("value", key)
                    .text(key))
        });
        var options = $('#CountrySelect option');
        var arr = options.map(function (_, o) { return { t: $(o).text(), v: o.value }; }).get();
        arr.sort(function (o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
        options.each(function (i, o) {
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });
    });
}