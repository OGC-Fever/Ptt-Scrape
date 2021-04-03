var init_ajax_load = 0;
var init_ajax_post = 0;
var mem_store;
var search_prms;
var flag = 0; // 0:get, 1:post
var init = 0; // 0:first load,1:not

if (init == 0) {
    ajax_load(1);
    init = 1;
}