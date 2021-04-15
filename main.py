from flask import Flask
from werkzeug.middleware.dispatcher import DispatcherMiddleware

from config import msg, ptt, about, xyz

from apps.msg.image_route import *
from apps.msg.info import *
from apps.msg.msg_db import msg_db
from apps.msg.msg import *

from apps.ptt.ptt_get import *
from apps.ptt.ptt_post import *

msg_db.init_app(msg)
msg_db.create_all()

app = Flask(__name__)


@about.route("/", methods=["GET", "POST"])
def home():
    return render_template("about/about.html")


@xyz.route("/", methods=["GET", "POST"])
def todo():
    return render_template("xyz/xyz.html")


app.wsgi_app = DispatcherMiddleware(about, {
    "/msg": msg,
    '/ptt': ptt,
    '/xyz': xyz,
})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
