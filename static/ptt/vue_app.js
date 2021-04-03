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
        search() { header_get.flag = 1 }
    }
}).mount('#ptt_form')

const header_get = Vue.createApp({
    data() { return { flag: 0 } },
    watch: { flag: () => { header_post.mount("#header") } },
    template: `
        <tr>
            <th class="col-1 text-end">#</th>
            <th class="col-2">Board</th>
            <th class="col">Title</th>
            <th class="col text-end">Users</th>
            <th class="col text-end">Users %</th>
        </tr>`,
}).mount("#header")

const header_post = Vue.createApp({
    template: `
        <tr>
            <th class="col-1 text-end">#</th>
            <th class="col-1 text-end">Hot</th>
            <th class="col">Title</th>
            <th class="col-1">Author</th>
            <th class="col-1">Date</th>
        </tr>`,
})

const view_board = Vue.createApp({
    mounted() { this.show = false },
    unmounted() { this.show = false },
}).mount('#view_board')

const pagination = Vue.createApp({
    mounted() { this.show = true },
    unmounted() { this.show = false },
}).mount('#pagination')
