const nav = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            items: [
                { link: "/msg", title: "Photo Board" },
                { link: "/ptt", title: "PTT Scraper" },
                { link: "#", title: "PTT Analyse" },
                { link: "#", title: "Food Stand POS" },
                { link: "#", title: "XYZ todo-list" }
            ]
        }
    }
}).mount('#nav')
