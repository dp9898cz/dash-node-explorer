from app.mongo import initialize_mongo
from app.message import MessageWrapper

from pymongo import ASCENDING
from time import sleep


def connector():
    db = initialize_mongo()
    addresses = db["not_done_addrs"]
    done_addresses = db["done_addrs"]
    
    mw = MessageWrapper()
    
    while True:
        if (mw.check_node_running()):
            addr = addresses.find_one_and_delete({})
            if (addr != None):
                # check if ipv6
                if (":" in addr["address"]):
                    addr["address"] = "[" + str(addr["address"]) + "]"
                print("Connecting to " + str(addr["address"]) + ":" + str(addr["port"]))
                resp = mw.sendMessage("addnode", {"node": str(addr["address"]) + ":" + str(addr["port"]), "command": "onetry"})
                while (resp == False):
                    # node starting
                    sleep(10)
                    resp = mw.sendMessage("addnode", {"node": str(addr["address"]) + ":" + str(addr["port"]), "command": "onetry"})
                # add this address to done list
                done_addresses.insert_one(addr)
        else:
            # waiting for node to start
            sleep(10)