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
        }
    }
})

const get_header = Vue.createApp({
    data() {
        return {
            show: true
        }
    },
    template: `
        <tr v-if="show">
            <th class="col-1 text-end">#</th>
            <th class="col-2">Board</th>
            <th class="col">Title</th>
            <th class="col text-end">Users</th>
            <th class="col text-end">Users %</th>
        </tr>`
})

const post_header = Vue.createApp({
    data() {
        return {
            show: true
        }
    },
    template: `
        <tr v-if="show">
            <th class="col-1 text-end">#</th>
            <th class="col-1 text-end">Hot</th>
            <th class="col">Title</th>
            <th class="col-1">Author</th>
            <th class="col-1">Date</th>
        </tr>`
})

const view_board = Vue.createApp({
    mounted() {
        this.show = true
    },
    unmounted() {
        this.show = false
    },
})

const pagination = Vue.createApp({
    mounted() {
        this.show = true
    },
    unmounted() {
        this.show = false
    },
})
