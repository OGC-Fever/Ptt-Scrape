var init = 0;
var flag = 0;
var init_ajax_load = 0;
var init_ajax_post = 0;
var mem_store;
var search_prms;

window.onload = function () {
    $("#post_header").hide();
}

$(document).ready(function () {
    $('.search_reset').click(function () {
        $('#board').val("");
        $('#keyword').val("");
        $('#author').val("");
        $('#count').val("");
    })
});


if (init == 0) {
    ajax_load(1);
    init = 1;
}


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

function ajax_pagination(json, page_n) {
    var page_count = Math.ceil(json.slice(-1) / 10);
    if (page_count == 1) {
        return;
    }
    if (!page_n) {
        var page_n = 1;
    }
    for (let item = 1; item <= page_count; item++) {
        if (item == 1) {
            $('#ajax_pagination').append(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_start">|<</a>
                </li>`
            );
        }
        if (Math.abs(item - page_n) <= 4) {
            if (item == page_n) {
                $('#ajax_pagination').append(`
                    <li class="page-item active">
                        <a class="page-link" href="#" id="page_nav_${item}">${item}</a>
                    </li>`
                );
            } else {
                $('#ajax_pagination').append(`
                    <li class="page-item">
                        <a class="page-link" href="#" id="page_nav_${item}">${item}</a>
                    </li>`
                );
            }
        }
        if (item == page_count) {
            $('#ajax_pagination').append(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_end">>|</a>
                </li>`
            );
        }
        $(`#page_nav_${item}`).click(function () {
            if (flag == 0) {
                ajax_load(item);
            } else {
                ajax_post(item)
            }
        });
    }
    $("#page_nav_start").click(function () {
        if (flag == 0) {
            ajax_load(1);
        } else {
            ajax_post(1)
        }
    });
    $("#page_nav_end").click(function () {
        if (flag == 0) {
            ajax_load(page_count);
        } else {
            ajax_post(page_count)
        }
    });
}

function ajax_load(page_n) {
    if (init_ajax_load == 0) {
        $.ajax({
            url: "/ptt/list",
            type: "GET",
            dataType: "json",
            success: function (json) {
                $('#ajax_board').html("");
                $('#ajax_pagination').html("");
                mem_store = json;
                hot_board(mem_store, page_n);
                ajax_pagination(mem_store, page_n);
            },
        })
        init_ajax_load = 1;
    } else {
        $('#ajax_board').html("");
        $('#ajax_pagination').html("");
        hot_board(mem_store, page_n);
        ajax_pagination(mem_store, page_n);
    }
}

function ajax_post(page_n) {
    var board = $("#board").val();
    var keyword = $("#keyword").val();
    var author = $("#author").val();
    var count = $("#count").val();
    var prms = {
        "board": board,
        "keyword": keyword,
        "author": author,
        "count": count
    }
    var action = function (mem_store, page_n) {
        $("#get_header").hide();
        $("#post_header").show();
        $('#ajax_board').html("");
        $('#ajax_pagination').html("");
        search_result(mem_store, page_n);
        ajax_pagination(mem_store, page_n);
    }
    if (!search_prms) {
        search_prms = prms;
    }
    cond = JSON.stringify(search_prms) == JSON.stringify(prms)
    if (init_ajax_post == 0 || !cond) {
        $.ajax({
            url: "/ptt/search",
            type: "POST",
            dataType: "json",
            data: prms,
            success: function (json) {
                search_prms = prms;
                mem_store = json;
                flag = 1;
                action(mem_store, page_n);
            },
        })
        init_ajax_post = 1;
    } else {
        action(mem_store, page_n);
    }
}

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

