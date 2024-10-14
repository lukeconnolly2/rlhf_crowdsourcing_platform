import os
from hitl import Uploader

uploader = Uploader(
    api_key="3b729c34e729af5dd6b809bc561a942d84e58180b01999a615ea3534923e5a3e",
    hostname="interactiverl.lukeconnolly.dev",
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
                ],
        )
    else:
        continue
