function search_result(json, page_n) {
    if (!page_n) {
        var page_n = 1;
    }
    for (let index = 0; index < json["data"].length; index++) {
        if ((Math.ceil(parseInt(index + 1) / 10)) == page_n) {
            $('#view_board').append(`
                <tr>
                    <td class="text-end">${index + 1}</td>
                    <td class="push text-end">${json["data"][index]["push"]}</td>
                    <td>
                        <a class="text-decoration-none link-light" href="${json["data"][index]["url"]}" target="_blank" rel="noreferrer">
                            ${json["data"][index]["title"]}
                        </a>
                    </td>
                    <td class="author_name">${json["data"][index]["author"]}</td>
                    <td>${json["data"][index]["date"]}</td>
                </tr>`
            );
        }
    }
    $('.author_name').click(function () {
        let author = $(this).text();
        $('#author').val(author);
    })
    $('td:contains("+99")').filter(".push").addClass("text-danger fw-bolder");
    $('td:contains("X")').filter(".push").addClass("text-secondary");
    let push = $("td").filter(".push")
    for (let index = 0; index < push.length; index++) {
        if (parseInt($(push[index]).text()) > 10) {
            $(push[index]).addClass("text-warning fw-bold");
        };
    }
}