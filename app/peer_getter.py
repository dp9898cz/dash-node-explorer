from app.mongo import initialize_mongo
from app.message import MessageWrapper

from pymongo import ASCENDING
from time import sleep


def peer_getter():
    db = initialize_mongo()
    peers_db = db["peers"]
    db["peers"].create_index([("addr", ASCENDING)], unique=True)
    
    mw = MessageWrapper()
    
    while True:
        print("Getting peers")
        peers = mw.sendMessage("getpeerinfo", {})
        # import each peer to db
        for peer in peers:
            try:
                peers_db.insert_one(peer)
            except Exception as e:
                pass
        sleep(10)