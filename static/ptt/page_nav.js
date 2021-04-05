const pagination = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            values: [],
            flag: 0,
            page_n: 1,
            counts: 0
        }
    },
    mounted() {
        this.page_nav(this.counts, this.page_n)
    },
    watch: {
        counts() {
            this.page_nav(this.counts, this.page_n)
        },
        page_n() {
            this.page_nav(this.counts, this.page_n);
        }
    },
    methods: {
        get_post(page) {
            if (page == "start") {
                page = 1
            } else if (page == "end") {
                page = Math.ceil(this.counts / 10)
            }
            view_board.page_n = page
            this.page_n = page
            return this
        },
        page_nav(counts, page_n = 1) {
            let page_count = Math.ceil(counts / 10);
            if (page_count == 1) {
                return;
            }
            this.values = []
            for (let page = 1; page <= page_count; page++) {
                if (page == 1) {
                    this.values.push(
                        { click: this.get_post, id: "start", active: false, text: "|<" }
                    )
                }
                if (Math.abs(page - page_n) < 4 && page - page_n >= -1) {
                    let active
                    if (page == page_n) {
                        active = true
                    } else {
                        active = false
                    }
                    this.values.push(
                        { click: this.get_post, id: page, active: active, text: page }
                    )
                }
                if (page == page_count) {
                    this.values.push(
                        { click: this.get_post, id: "end", active: false, text: ">|" }
                    )
                }
            }
        }
    }
}).mount('#pagination')

$("[id^=page_]").on("click", function () {
    if ($(this).attr("id").includes("start")) {
        item = 1;
    } else if ($(this).attr("id").includes("end")) {
        item = page_count
    } else {
        item = $(this).attr("id").split("_").slice(-1)
    }
    if (ptt.flag == 0) {
        ptt.init_load(item);
    } else {
        ptt.ajax_post(item);
    }
})