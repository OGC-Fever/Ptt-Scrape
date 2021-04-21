from apps.ptt_get import *
from apps.ptt_post import *

from config import ptt


if __name__ == "__main__":
    ptt.run(host="0.0.0.0", debug=True)
