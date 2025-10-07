import os
from Uploader import Uploader

uploader = Uploader(
    api_key="37b229377b890261f4eca828cb197d3beb295c9e571c3e46ce3b18b9bf8f972d",
    hostname="daisthree.ucd.ie"
    
)

directory = "./videos"
for filename in os.listdir(directory):
    if filename.endswith(".mp4") or filename.endswith(".mov"):
        uploader.upload(
            file_path=os.path.join(directory, filename),
            title="Flipper AI",
            description="The Goal of this output is to make the stick man do a backflip",
            additional_metadata=[
                "test_additional_metadata",
                ]
        )
    else:
        continue
