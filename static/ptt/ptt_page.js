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
            $('#ajax_pagination').prepend(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_start">|<</a>
                </li>`
            );
        }
        if (Math.abs(item - page_n) <= 3) {
            $('#ajax_pagination').append(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_${item}">${item}</a>
                </li>`
            );
            if (item == page_n) {
                $(`#page_nav_${item}`).parent().addClass("active");
            }
        }
        if (item == page_count) {
            $('#ajax_pagination').append(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_end">>|</a>
                </li>`
            );
        }
    }
    $("[id^=page_nav_]").on("click", function () {
        if ($(this).attr("id").includes("start")) {
            item = 1;
        } else if ($(this).attr("id").includes("end")) {
            item = page_count
        } else {
            item = $(this).attr("id").split("_").slice(-1)
        }
        if (flag == 0) {
            ajax_load(item);
        } else {
            ajax_post(item);
        }
    })
}