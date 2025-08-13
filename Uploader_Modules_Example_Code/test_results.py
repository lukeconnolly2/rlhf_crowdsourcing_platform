from hitl import Uploader
import json

uploader = Uploader(
    api_key="3b729c34e729af5dd6b809bc561a942d84e58180b01999a615ea3534923e5a3e",
    hostname="daisthree.ucd.ie",
)

results = uploader.get_results()


print(json.dumps(results, indent=4))