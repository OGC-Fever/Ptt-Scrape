function hot_board(json, page_n) {
    if (!page_n) {
        var page_n = 1;
    }
    flag = 0;
    for (let index = 0; index < json.length - 1; index++) {
        if ((Math.ceil(parseInt(index + 1) / 10)) == page_n) {
            $('#ajax_board').append(`
            <tr>
                <td>${index + 1}</td>
                <td class="board_name">${json[index]["name"]}</td>
                <td>
                    <a class="text-decoration-none link-light" href="${json[index]["url"]}" target="_blank" rel="noreferrer">
                        ${json[index]["title"]}
                    </a>
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