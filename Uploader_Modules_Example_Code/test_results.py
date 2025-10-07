from Uploader import Uploader
import json

uploader = Uploader(
    api_key="37b229377b890261f4eca828cb197d3beb295c9e571c3e46ce3b18b9bf8f972d",
    hostname="daisthree.ucd.ie",
)

results = uploader.get_results()


print(json.dumps(results, indent=4))