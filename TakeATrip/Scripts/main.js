$(document).ready(function () {
    $('.input-daterange input').each(function () {
        var today = new Date().toLocaleDateString('en-GB');
        $(this).datepicker({
            'autoClose': true,
            'clearBtn': true,
            'format': 'dd/mm/yyyy',
            'startDate':today,
            'todayHighlight':true
        });
    });
});