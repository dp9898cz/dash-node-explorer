import requests
import json


class MessageWrapper:
    def __init__(self):
        self.address = "http://localhost:9998/"

    def sendMessage(self, method, params):
        json_data = {
            "method": method,
            "params": params,
        }
        try:
            resp = requests.post(
                self.address,
                data=json.dumps(json_data),
                auth=("dowl", "dowl"),
            )
            result = resp.json()
            if (result is not None):
                if (result["error"]):
                    print(result["error"])
                return result["result"]
            else:
                return []

        except Exception as e:
            print(e)
            return []
