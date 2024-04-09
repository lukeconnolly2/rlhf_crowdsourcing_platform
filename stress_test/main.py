import threading
import time
from hitl import Uploader


def worker(results, times):
    try:
        uploader = Uploader(
            "3b729c34e729af5dd6b809bc561a942d84e58180b01999a615ea3534923e5a3e",
            "interactiverl.lukeconnolly.dev",
        )
        start_time = time.time()
        uploader.upload(
            "./videos/Test_Clip_8.mp4",
            "Stress Test",
            "Stress Test",
            ["Stress Test"],
        )
        end_time = time.time()
        results.append(True)
        times.append(end_time - start_time)
    except:
        results.append(False)
        pass

results = []
times = []
threads = []
for i in range(500):
    thread = threading.Thread(target=worker, args=(results, times))
    thread.start()
    threads.append(thread)

for thread in threads:
    thread.join()

print("\n\n\n--------Results---------\n")
print("Number of Successful Uploads: ", (results.count(True) / len(results)) * 100 , "%")
print("Average Time Taken per upload: ", sum(times) / len(times))   