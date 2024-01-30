import os
from hitl_uploader.Uploader import Uploader

uploader = Uploader(
    "3b729c34e729af5dd6b809bc561a942d84e58180b01999a615ea3534923e5a3e", "localhost:8000"
)

directory = "./videos"
for filename in os.listdir(directory):
    if filename.endswith(".mp4") or filename.endswith(".mov"):
        print(os.path.join(directory, filename))
        uploader.upload(os.path.join(directory, filename))
    else:
        continue
