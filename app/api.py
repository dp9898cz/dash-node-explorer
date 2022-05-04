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

@app.route("/getAddresses")
def addrs():
    db = initialize_mongo()
    addr_col = db["not_done_addrs"]
    all_addr = list(addr_col.find())
    return json_util.dumps({"addrs": all_addr, "count": len(all_addr)})

@app.route("/getDone")
def done():
    db = initialize_mongo()
    addr_col = db["done_addrs"]
    all_addr = list(addr_col.find())
    return json_util.dumps({"addrs": all_addr, "count": len(all_addr)})