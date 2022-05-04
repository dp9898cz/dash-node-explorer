from pymongo import MongoClient

import datetime

def initialize_mongo():
    """Creates new instance of Mongo database and returns it.
    """

    client = MongoClient()
    db = client["dash_node_explorer"]
    return db

class Stats:
    def __init__(self, start):
        self.start = start
        
    def getStart(self):
        return self.start
    

stats = Stats(datetime.datetime.now())
