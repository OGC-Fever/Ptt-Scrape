const view_board = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            mem_store: [],
            page_n: 1,
            init: 0,
            table: [],
            get: true
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
            this.hot_board(this.mem_store, this.page_n)
        },
        page_n() {
            this.hot_board(this.mem_store, this.page_n)
        }
    },
    methods: {
        init_load(page_n = 1) {
            if (this.init == 0) {
                $.ajax({
                    url: "/ptt/list",
                    type: "GET",
                    dataType: "json",
                    success: function (json) {
                        this.mem_store = json
                        view_board.load_action(json, page_n)
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
        }
    }
}).mount('#view_board')

$('.board_name').click(function () {
    var board = $(this).text();
    $('#board').val(board);
})