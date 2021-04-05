const pagination = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            values: [],
            page_n: 1,
            counts: 0,
        }
    },
    mounted() {
        this.page_nav(this.counts, this.page_n)
    },
    watch: {
        counts(value, old_value) {
            if (value != old_value) {
                this.page_nav(this.counts, this.page_n)
            }
        },
        page_n(value, old_value) {
            if (value != old_value) {
                this.page_nav(this.counts, this.page_n)
            }
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
            this.values = []
            let page_count = Math.ceil(counts / 10)
            if (page_count == 1) {
                return;
            }
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