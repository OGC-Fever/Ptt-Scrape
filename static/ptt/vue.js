const post_header = Vue.createApp({
    mounted() {
        this.show = false
    },
})
post_header.mount('#post_header')

const btn_click = Vue.createApp({
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
        }
    }
})
btn_click.mount('#ptt_form')
