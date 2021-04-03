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