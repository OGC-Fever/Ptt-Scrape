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