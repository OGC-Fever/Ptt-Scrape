const ptt_form = Vue.createApp({
    data() {
        return {
            prms: {
                board: "Beauty",
                keyword: "正妹",
                author: "",
                push: "",
                count: 10
            }
        }
    },
    methods: {
        clear() {
            for (let key in this.prms) {
                this.prms[key] = ""
            }
        },
        search() {
            header_get.flag = 1
            view_board.flag = 1
            pagination.flag = 1
        }
    }
}).mount('#ptt_form')

