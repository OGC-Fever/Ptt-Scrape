const ptt = Vue.createApp({
    data() {
        return {
            init: 0,
            init_ajax_load: 0,
            init_ajax_post: 0,
            mem_store: "",
            search_prms: "",
            flag: 0
        }
    },
    methods: {
        ajax_load(page_n) {
            if (this.init_ajax_load == 0) {
                $.ajax({
                    url: "/ptt/list",
                    type: "GET",
                    dataType: "json",
                    success: function (json) {
                        mem_store = json;
                        ptt.load_action(mem_store, page_n);
                    },
                })
                this.init_ajax_load = 1;
            } else {
                ptt.load_action(mem_store, page_n);
            }
        },
        load_action(mem_store, page_n) {
            $('#view_board').html("");
            // this.unmount()
            $('#pagination').html("");
            // pagination.unmount()
            view_board.hot_board(mem_store, page_n);
            pagination.page(mem_store, page_n);
        }
    }
}).mount("#dummy")
