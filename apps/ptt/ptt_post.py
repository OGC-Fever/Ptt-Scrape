from bs4 import BeautifulSoup as bs
import requests
from config import ptt_app
from flask import render_template, request, jsonify
import math
from .ptt_get import get_content

@ptt_app.route("/search", methods=["POST"])
def ptt_search():
    board = request.form['board']
    keyword = request.form['keyword']
    author = request.form['author']
    count = request.form['count']
    query_prms = ""
    if not count:
        count = 10
    else:
        count = int(count)
    if not board:
        board = "allpost"
    if keyword and author:
        query_prms = f"{keyword}+author:{author}"
    if keyword and not author:
        query_prms = f"{keyword}"
    if not keyword and author:
        query_prms = f"author:{author}"
    if not keyword and not author:
        return render_template("ptt/ptt.html")
    url = "https://www.ptt.cc/bbs"
    search_url = f"{url}/{board}/search?q={query_prms}"
    cookies = {'over18': "1"}
    res = requests.get(search_url, cookies=cookies)
    html = bs(res.content, 'lxml')
    data = get_content(html)  # list
    if len(data) >= count:
        data = data[:count]
    elif len(data) < count:
        page = math.ceil(count/20)
        for page in range(2, page + 1):
            back_url = f"{url}/{board}/search?page={page}&q={query_prms}"
            res = requests.get(back_url, cookies=cookies)
            if res.status_code == 404:
                break
            html = bs(res.content, 'lxml')
            temp = get_content(html)
            data.extend(temp)
    temp = 0
    json = []
    for item in data:
        if len(json) >= count:
            break
        temp += 1
        json.append({"title": item[0],
                     "url": f"{url}/{item[1]}",
                     "push": item[3],
                     "author": item[4],
                     "date": item[2].strip()})
    json.append(len(json))
    return jsonify(json)
