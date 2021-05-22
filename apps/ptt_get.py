from bs4 import BeautifulSoup as bs
import requests
from config import ptt
from flask import render_template, jsonify
import re
import paramiko
import time


def users():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect("ptt.cc", username="bbsu", password="")
    shell = ssh.invoke_shell()
    time.sleep(0.5)
    if shell.recv_ready():
        msg = shell.recv(9999)
        msg = msg.decode("utf8", "ignore")
        pattern = r"[0-9]{5,6}"
        data = re.search(pattern, msg)[0]
        print(data)
        return data


@ptt.route("/list", methods=["GET"])
def hot_list():
    url = "https://www.ptt.cc/bbs/index.html"
    res = requests.get(url)
    html = bs(res.content, 'lxml')
    data = get_list(html)[0]
    count = get_list(html)[1]
    json = {"data": []}
    for item in data:
        json["data"].append({"name": item[0],
                             "title": item[1],
                             "url": f"{url.replace('index.html', item[2])}",
                             "users": item[3]})
    json["count"] = count
    json["users"] = users()
    return jsonify(json)


def get_list(html):
    data = []
    name = html.find_all("div", {"class": "board-name"})
    title = html.find_all("div", {"class": "board-title"})
    url = html.find_all("a", {"class": "board"})
    users = html.find_all("div", {"class": "board-nuser"})
    while len(data) < len(name):
        data.append([name[len(data)].text,
                     title[len(data)].text,
                     url[len(data)].attrs["href"].split("/")[2],
                     users[len(data)].text])
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


@ptt.route("/", methods=["GET"])
def ptt_home():
    return render_template("ptt.html")
