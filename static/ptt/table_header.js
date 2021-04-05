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
            if (this.flag == 1) {
                this.get = false
                this.post = true
            } else {
                this.get = true
                this.post = false
            }
        }
    },
}).mount("#header")
