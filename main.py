from apps.ptt_get import *
from apps.ptt_post import *


@ptt.route("/", methods=["GET", "POST"])
def home():
    return render_template("ptt.html")


if __name__ == "__main__":
    ptt.run(host="0.0.0.0", debug=True)
