from pymongo import MongoClient


def initialize_mongo():
    """Creates new instance of Mongo database and returns it.
    """

    client = MongoClient()
    db = client["dash_node_explorer"]
    return db
