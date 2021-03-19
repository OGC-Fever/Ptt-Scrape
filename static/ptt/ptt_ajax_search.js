function search_result(json, page_n) {
    if (!page_n) {
        var page_n = 1;
    }

    for (let index = 0; index < json.length - 1; index++) {
        if ((Math.ceil(parseInt(index + 1) / 10)) == page_n) {
            if (`${json[index]["push"]}` == "爆") {
                $('#ajax_board').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td class="push text-danger">${json[index]["push"]}</td>
                    <td>
                        <a class="text-decoration-none link-light" href="${json[index]["url"]}" target="_blank" rel="noreferrer">
                            ${json[index]["title"]}
                        </a>
                    </td>
                    <td class="author_name">${json[index]["author"]}</td>
                    <td>${json[index]["date"]}</td>
                </tr>`
                );
            } else if (`${json[index]["push"]}`.includes("X")) {
                $('#ajax_board').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td class="push text-secondary">${json[index]["push"]}</td>
                    <td>
                        <a class="text-decoration-none link-light" href="${json[index]["url"]}" target="_blank" rel="noreferrer">
                            ${json[index]["title"]}
                        </a>
                    </td>
                    <td class="author_name">${json[index]["author"]}</td>
                    <td>${json[index]["date"]}</td>
                </tr>`
                );
            } else {
                $('#ajax_board').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td class="push">${json[index]["push"]}</td>
                    <td>
                        <a class="text-decoration-none link-light" href="${json[index]["url"]}" target="_blank" rel="noreferrer">
                            ${json[index]["title"]}
                        </a>
                    </td>
                    <td class="author_name">${json[index]["author"]}</td>
                    <td>${json[index]["date"]}</td>
                </tr>`
                );
            }
        }
    }
    $('.author_name').click(function () {
        var author = $(this).text();
        $('#author').val(author);
    })
}

