const header = Vue.createApp({
    data() {
        return {
            flag: 0,
            get: true,
            post: false
        }
    },
    watch: {
        flag() {
            this.get = false
            this.post = true
        }
    },
}).mount("#header")
