from flask import Flask
from app.mongo import stats, initialize_mongo
from json import dumps
from bson import json_util

app = Flask("dash_node_explorer_api")

@app.route("/")
def index():
    return {"message": "hello world.", "start": stats.start.isoformat()}

@app.route("/getPeers")
def peers():
    db = initialize_mongo()
    peers_col = db["peers"]
    all_peers = list(peers_col.find())
    return json_util.dumps({"peers": all_peers, "count": len(all_peers)})

@app.route("/getDoneAddresses")
def addresses():
    return {}

@app.route("/getUndoneAddresses")
def undone_addresses():
    return {}
