from flask.app import Flask


ptt = Flask(__name__)
ptt.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
ptt.config['JSON_AS_ASCII'] = False
