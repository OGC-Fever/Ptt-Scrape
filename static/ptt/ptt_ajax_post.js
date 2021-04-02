function ajax_post(page_n) {
    var board = $("#board").val();
    var keyword = $("#keyword").val();
    var author = $("#author").val();
    var push = $("#push").val();
    var count = $("#count").val();
    var prms = {
        "board": board,
        "keyword": keyword,
        "author": author,
        "push": push,
        "count": count
    }
    function action(mem_store, page_n) {
        $("#get_header").hide();
        $("#post_header").show();
        $('#view_board').html("");
        $('#pagination').html("");
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