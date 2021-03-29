function hot_board(json, page_n) {
    if (!page_n) {
        var page_n = 1;
    }
    flag = 0;
    for (let index = 0; index < json["data"].length; index++) {
        if ((Math.ceil(parseInt(index + 1) / 10)) == page_n) {
            $('#ajax_board').append(`
            <tr>
                <td class="text-end">${index + 1}</td>
                <td class="board_name">${json["data"][index]["name"]}</td>
                <td>
                    <a class="text-decoration-none link-light" href="${json["data"][index]["url"]}" target="_blank" rel="noreferrer">
                        ${json["data"][index]["title"]}
                    </a>
                </td>
                <td class="board_users text-end">
                    ${Intl.NumberFormat().format(json["data"][index]["users"])}
                </td>
                <td class="board_users text-end">
                    ${Math.round(json["data"][index]["users"] / json["users"] * 10000) / 100} %
                </td>
            </tr>`
            );
        }
    }
    $('.board_name').click(function () {
        var board = $(this).text();
        $('#board').val(board);
    })
}