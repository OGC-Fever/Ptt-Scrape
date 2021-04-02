function ajax_pagination(json, page_n) {
    var page_count = Math.ceil(json["count"] / 10);
    if (page_count == 1) {
        return;
    }
    if (!page_n) {
        var page_n = 1;
    }
    for (let page = 1; page <= page_count; page++) {
        if (page == 1) {
            $('#pagination').prepend(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_start">|<</a>
                </li>`
            );
        }
        if (Math.abs(page - page_n) < 4 && page - page_n >= -1) {
            $('#pagination').append(`
                <li class="page-item">
                    <a class="page-link" href="#" id="page_nav_${page}">${page}</a>
                </li>`
            );
            if (page == page_n) {
                $(`#page_nav_${page}`).parent().addClass("active");
            }
        }
        if (page == page_count) {
            $('#pagination').append(`
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