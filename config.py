from flask.app import Flask

about = Flask(__name__)
about.config['JSON_AS_ASCII'] = False

msg = Flask(__name__)
msg.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/message.db'
msg.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
msg.config['JSON_AS_ASCII'] = False


ptt = Flask(__name__)
ptt.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
ptt.config['JSON_AS_ASCII'] = False

xyz = Flask(__name__)
xyz.config['JSON_AS_ASCII'] = False
