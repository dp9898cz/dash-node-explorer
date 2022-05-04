from pymongo import ASCENDING
from time import sleep

from app.mongo import initialize_mongo
from app.message import MessageWrapper


def new_addresses_getter():
    db = initialize_mongo()
    not_done_addrs = db["not_done_addrs"]
    db["not_done_addrs"].create_index([("address", ASCENDING), ("port", ASCENDING)], unique=True)
    
    mw = MessageWrapper()
    while True:
        if (mw.check_node_running()):
            print("Fetching new addresses.")
            addresses = mw.sendMessage("getnodeaddresses", {"count": 100})
            if (addresses == False):
                # node is starting
                sleep(20)
                continue
            if (addresses != None and addresses != False):
                # add every address to db
                for addr in addresses:
                    try:
                        not_done_addrs.insert_one(addr)
                    except Exception as e:
                        pass
            sleep(30)
        else:
            # waiting for node to start
            sleep(30)