from bs4 import BeautifulSoup as bs
import requests
from config import ptt_app
from flask import render_template, jsonify


@ptt_app.route("/list", methods=["GET"])
def hot_list():
    url = "https://www.ptt.cc/bbs/index.html"
    res = requests.get(url)
    html = bs(res.content, 'lxml')
    data = get_list(html)[0]
    count = get_list(html)[1]
    json = []
    for item in data:
        json.append({"name": item[0],
                     "title": item[1],
                     "url": f"{url.replace('index.html',item[2])}"})
    json.append(count)
    return jsonify(json)


def get_list(html):
    data = []
    name = html.find_all("div", {"class": "board-name"})
    title = html.find_all("div", {"class": "board-title"})
    url = html.find_all("a", {"class": "board"})
    while len(data) < len(name):
        data.append([name[len(data)].text,
                     title[len(data)].text,
                     url[len(data)].attrs["href"].split("/")[2]])
    return [data, len(data)]


def get_content(html):
    data = []
    for item in html.find_all("div", class_="r-ent"):
        try:
            data.append([item.a.text,
                         item.a["href"].split("/", 2)[-1],
                         item.find("div", {"class": "date"}).text,
                         item.find("div", {"class": "nrec"}).text,  # push
                         item.find("div", {"class": "author"}).text])
        except:
            pass  # ignore nonetype error
    return data


@ptt_app.route("/", methods=["GET"])
def ptt_home():
    return render_template("ptt/ptt.html")
