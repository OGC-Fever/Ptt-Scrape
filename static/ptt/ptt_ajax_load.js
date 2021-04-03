function ajax_load(page_n) {
    if (init_ajax_load == 0) {
        $.ajax({
            url: "/ptt/list",
            type: "GET",
            dataType: "json",
            success: function (json) {
                mem_store = json;
                load_action(mem_store, page_n);
            },
        })
        init_ajax_load = 1;
    } else {
        load_action(mem_store, page_n);
    }
}

function load_action(mem_store, page_n) {
    $('#view_board').html("");
    // view_board.mount('#view_board')
    $('#pagination').html("");
    // pagination.mount('#pagination')
    hot_board(mem_store, page_n);
    ajax_pagination(mem_store, page_n);
}

