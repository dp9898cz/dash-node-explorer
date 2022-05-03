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
        print("Fetching new addresses.")
        addresses = mw.sendMessage("getnodeaddresses", {"count": 100})
        if (addresses != None):
            # add every address to db
            for addr in addresses:
                try:
                    not_done_addrs.insert_one(addr)
                except Exception as e:
                    pass
        sleep(30)