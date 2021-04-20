const week = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            week: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
        }
    },
}).mount("#week")

const day = Vue.createApp({})
day.component("day", {
    delimiters: ['@', '@'],
    data() {
        return {
            month: [],
            weeks: 0
        }
    },
    methods: {
        alert(n, index) {
            let input = prompt("schedule:", "")
            if (input) {
                this.month[(n - 1) * 7 + index].push(input)
            }
        },
        init() {
            let month = new Date().getMonth()
            let year = new Date().getFullYear()
            let first_day = new Date(year, month, 1).getDay()
            let last_date = new Date(year, month + 1, 0).getDate()
            let index = 0
            while (index < first_day) {
                this.month.push([""])
                index++
            }
            for (let day = 1; day <= last_date; day++) {
                this.month.push([day])
            }
            while (this.month.length % 7 != 0) {
                this.month.push([""])
            }
            console.log(this.month)
            this.weeks = this.month.length / 7
        }
    },
    mounted() {
        this.init()
    },
    template: `
    <div class="row mx-auto" v-for="n in weeks">
        <div class="col inner date" v-for="(,index) in month.slice(7*n-7,7*n)" @click="alert(n,index)">
            <div v-for="(,i) in month.slice(7*n-7,7*n)[index]">
                @month.slice(7*n-7,7*n)[index][i]@
            </div>
        </div>
    </div>`,
})
day.mount("#day")