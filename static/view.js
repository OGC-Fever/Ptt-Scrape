const view_board = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            mem_store: [],
            page_n: 1,
            init: 0,
            table: [],
            flag: 0
        }
    },
    mounted() {
        if (this.init == 0) {
            this.init_load(1)
            this.init = 1
        }
    },
    watch: {
        mem_store() {
            if (this.flag == 0) {
                this.hot_board(this.mem_store, this.page_n)
            } else {
                this.search_result(this.mem_store, this.page_n)
            }
        },
        page_n() {
            if (this.flag == 0) {
                this.hot_board(this.mem_store, this.page_n)
            } else {
                this.search_result(this.mem_store, this.page_n)
            }
        }
    },
    methods: {
        pass_name(data) {
            ptt_form.prms["board"] = data.name
        },
        pass_author(data) {
            ptt_form.prms["author"] = data.author
        },
        init_load(page_n = 1) {
            if (this.init == 0) {
                $.ajax({
                    url: "/list",
                    type: "GET",
                    dataType: "json",
                    success: function (json) {
                        view_board.load_action(json, page_n)
                        this.init = 1
                    }
                })
            } else {
                this.load_action(this.mem_store, page_n)
            }
        },
        load_action(json, page_n = 1) {
            this.mem_store = json
            this.page_n = page_n
            pagination.counts = json["count"]
            pagination.page_n = page_n
        },
        hot_board(json, page_n) {
            if (!page_n) {
                page_n = 1;
            }
            this.table = []
            for (let index = 0; index < json["data"].length; index++) {
                if ((Math.ceil(parseInt(index + 1) / 10)) == page_n) {
                    this.table.push(
                        {
                            no: index + 1,
                            name: json["data"][index]["name"],
                            link: json["data"][index]["url"],
                            title: json["data"][index]["title"],
                            users: Intl.NumberFormat().format(json["data"][index]["users"]),
                            percentage:
                                Math.round(json["data"][index]["users"] / json["users"] * 10000) / 100
                        }
                    )
                }
            }
        },
        search_result(json, page_n) {
            if (!page_n) {
                var page_n = 1;
            }
            this.table = []
            for (let index = 0; index < json["data"].length; index++) {
                if ((Math.ceil(parseInt(index + 1) / 10)) == page_n) {
                    let td = ts = tw = fb = false
                    if (String(json["data"][index]["push"]).includes("+")) {
                        td = fb = true
                    } else if (String(json["data"][index]["push"]).includes("X")) {
                        ts = true
                    } else if (json["data"][index]["push"] > 10) {
                        tw = fb = true
                    }
                    this.table.push(
                        {
                            no: index + 1,
                            push: json["data"][index]["push"],
                            link: json["data"][index]["url"],
                            title: json["data"][index]["title"],
                            author: json["data"][index]["author"],
                            date: json["data"][index]["date"],
                            td: td, ts: ts, tw: tw, fb: fb
                        }
                    )
                }
            }
        }
    }
}).mount('#view_board')
