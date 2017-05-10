$(document).ready(function () {
    $("#MainMenuNavbar .active").removeClass('active');
    $('#NavbarAttr').addClass('active');

    $("#Name").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Attractions/GetAttractionList",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.Name, value: item.Id };
                    }))

                }
            })
        },
        messages: {
            noResults: "No results", results: function (resultCount) { }
        },
        select: function (event, ui)
        {
            $("#Name").val(ui.item.label);
            $("#Id").val(ui.item.value);
            event.preventDefault();
        }

        });
});
