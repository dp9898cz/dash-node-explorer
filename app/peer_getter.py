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
        if (mw.check_node_running()):
            print("Getting peers")
            peers = mw.sendMessage("getpeerinfo", {})
            if (peers == False):
                # node is starting
                sleep(20)
                continue
            # import each peer to db
            if (peers is not None and peers != False):
                for peer in peers:
                    try:
                        peers_db.insert_one(peer)
                    except Exception as e:
                        pass
            sleep(10)
        else:
            # waiting for node to start
            sleep(20)