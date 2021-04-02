var init = 0;
var flag = 0; // 0:get 1:post
var init_ajax_load = 0;
var init_ajax_post = 0;
var mem_store;
var search_prms;


if (init == 0) {
    ajax_load(1);
    init = 1;
}