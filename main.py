from app.message import MessageWrapper
from app.json_export import JSONWrapper
from app.mongo import initialize_mongo
from app.address_getter import new_addresses_getter
from app.peer_getter import peer_getter
from app.connector import connector

from time import sleep
import threading


if __name__ == "__main__":
    db = initialize_mongo()
    #db.drop_collection("not_done_addrs")
    #db.drop_collection("peers")

    address_getter = threading.Thread(target=new_addresses_getter)
    address_getter.daemon = True
    
    peer_getter_p = threading.Thread(target=peer_getter)
    peer_getter_p.daemon = True
    
    address_connector = threading.Thread(target=connector)
    address_connector.daemon = True

    address_getter.start()
    peer_getter_p.start()
    address_connector.start()

    # do not exit main process
    while True:
        sleep(100)
