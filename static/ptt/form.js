const ptt_form = Vue.createApp({
    data() {
        return {
            prms: {
                board: "Beauty",
                keyword: "正妹",
                author: "",
                push: "",
                count: 10
            },
            init_post: 0,
            cond: true
        }
    },
    watch: {
        prms() {
            cond = false
        }
    },
    methods: {
        clear() {
            for (let key in this.prms) {
                this.prms[key] = ""
            }
        },
        search(page_n) {

            // if (!search_prms) {
            //     search_prms = prms;
            // }
            // cond = JSON.stringify(search_prms) == JSON.stringify(prms)
            if (this.init_post == 0 || !cond) {
                $.ajax({
                    url: "/ptt/search",
                    type: "POST",
                    dataType: "json",
                    data: this.prms,
                    success: function (json) {
                        // search_prms = prms;
                        view_board.mem_store = json
                        ptt_form.load_mem(json, page_n)
                        this.init_post = 1
                        view_board.flag = 1
                        pagination.flag = 1
                        header.flag = 1
                    },
                })
            } else {
                load_mem(view_board.mem_store, page_n);
            }
        },
        load_mem(json, page_n) {
            header.flag = 1
            // $('#view_board').html("");
            // $('#pagination').html("");
            search_result(json, page_n);
            pagination.page_nav(json, page_n);
        },
    }
}).mount('#ptt_form')

