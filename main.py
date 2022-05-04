from app.message import MessageWrapper
from app.mongo import initialize_mongo, stats
from app.address_getter import new_addresses_getter
from app.peer_getter import peer_getter
from app.connector import connector
from app.api import app

from time import sleep
import threading

START_NODE_SERVICES = True
CLEAR_DB = True

if __name__ == "__main__":
    print("Starting at: " + str(stats.start))
    db = initialize_mongo()

    if (CLEAR_DB):    
        db.drop_collection("not_done_addrs")
        db.drop_collection("done_addrs")
        db.drop_collection("peers")

    address_getter = threading.Thread(target=new_addresses_getter)
    address_getter.daemon = True
    
    peer_getter_p = threading.Thread(target=peer_getter)
    peer_getter_p.daemon = True
    
    address_connector = threading.Thread(target=connector)
    address_connector.daemon = True

    if (START_NODE_SERVICES):
        address_getter.start()
        peer_getter_p.start()
        address_connector.start()
    
    #start api server
    app.run()
