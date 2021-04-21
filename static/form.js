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
            cond: true,
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
        search(page_n = 1) {
            if (this.init_post == 0 || !cond) {
                $.ajax({
                    url: "/search",
                    type: "POST",
                    dataType: "json",
                    data: this.prms,
                    success: function (json) {
                        this.init_post = 1
                        ptt_form.load_mem(json, page_n)
                    },
                })
            } else {
                ptt_form.load_mem(view_board.mem_store, page_n);
            }
        },
        load_mem(json, page_n) {
            view_board.mem_store = json
            view_board.page_n = page_n
            pagination.counts = json["count"]
            pagination.page_n = page_n
            header.flag = 1
            view_board.flag = 1
        },
    }
}).mount('#ptt_form')