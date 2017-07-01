$(document).ready(function () {
    $("#MainMenuNavbar .active").removeClass('active');
    $('#NavbarAttr').addClass('active');

    $("#Attr_Name").autocomplete({
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
            $("#Attr_Name").val(ui.item.label);
            $("#Attr_Id").val(ui.item.value);
            event.preventDefault();
        }

        });
});

function showRandomClick()
{
    $("#carouselExampleIndicators").removeAttr("hidden");
    $(".carousel-inner > .item").first().addClass('active');
    $('.pixabay_widget').each(function () {
        var url = $(this).children(".item").children("a").children("img").data("src");
        $("#attr_img_" + $(this).data('id')).attr('src', url);
    });
}