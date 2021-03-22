from bs4 import BeautifulSoup as bs
import requests
from config import ptt_app
from flask import render_template, request, jsonify
import math
from .ptt_get import get_content


def search(url, board, query_prms, cookies):
    search_url = f"{url}/{board}/search?q={query_prms}"
    res = requests.get(search_url, cookies=cookies)
    html = bs(res.content, 'lxml')
    data = get_content(html)  # list
    return data


def search_more(page, url, board, query_prms, cookies, data):
    for page in range(2, page + 1):
        back_url = f"{url}/{board}/search?page={page}&q={query_prms}"
        res = requests.get(back_url, cookies=cookies)
        if res.status_code == 404:
            break
        html = bs(res.content, 'lxml')
        temp = get_content(html)
        data.extend(temp)
    return data


def json_append(json, item, url):
    if item[3] == "爆":
        item[3] = "99+"
    json.append({"title": item[0],
                 "url": f"{url}/{item[1]}",
                 "push": item[3],
                 "author": item[4],
                 "date": item[2].strip()})
    return json


@ptt_app.route("/search", methods=["POST"])
def ptt_search():
    board = request.form['board']
    keyword = request.form['keyword']
    author = request.form['author']
    push = request.form['push']
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
    cookies = {'over18': "1"}
    data = search(url, board, query_prms, cookies)
    if len(data) >= count:
        data = data[:count]
    else:  # len(data) < count
        page = math.ceil(count/20)
        data = search_more(page, url, board, query_prms, cookies, data)
    json = []
    for item in data:
        if len(json) >= count:
            break
        if push and int(push) > 0:
            push = int(push)
            if item[3] == "爆" or (item[3].isnumeric() and int(item[3]) >= push):
                json = json_append(json, item, url)
        if not push or int(push) == 0:
            json = json_append(json, item, url)
    json.append(len(json))
    # if len(data) >= count:
    #     data = data[:count]
    # else:  # len(data) < count
    #     page = math.ceil(count/20)
    #     data = search_more(page, url, board, query_prms, cookies, data)

    return jsonify(json)
