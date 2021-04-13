const about = Vue.createApp({
    delimiters: ['@', '@'],
    data() {
        return {
            texts: [
                [
                    "post and comment photo messages",
                    "packages : flask, sqlite3, sqlalchemy, pillow",
                    "ajax : scroll down to get more photo by jQuery",
                    "storing all data in sqlite database w/ sqlalchemy",
                    "resizing photo in pillow"
                ],
                [
                    "scraping data from ptt.cc and show on web",
                    "packages : BeautifulSoup, paramiko",
                    "fetch online users by paramiko",
                    "ajax : getting data from backend by jQuery",
                    "action in one page by Vue.js"
                ],
                [
                    "POS for food stand",
                    "packages : test",
                    "ajax : action in one page by Vue.js"
                ],
                [
                    "city hunter XYZ board fork",
                    "packages : test",
                    "ajax : action in one page by Vue.js"
                ]
            ],
            items: [],
        }
    },
    mounted() {
        this.items = nav.items
        for (let i = 0; i < this.texts.length; i++) {
            this.items[i]["texts"] = this.texts[i]
        }
    }
}).mount('#about')