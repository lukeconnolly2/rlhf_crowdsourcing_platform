from minio import Minio
from minio.error import S3Error
import requests as r

def main():
    client = Minio(
        "datalake:9000",
        access_key="test1",
        secret_key="MsJWKd0vvzYi3IvNnwoV9T8D4y4W4y091XZb9pXt",
        secure=False,
    )

    found = client.bucket_exists("videos")
    if not found:
        client.make_bucket("videos")
    else:
        print("Bucket 'videos' already exists")

    client.fput_object(
        "videos", "video1.mp4", "Test_Clip_1.mp4",
    )
    print(
        "/Users/luke/4th_Year/FYP/TestPairClip_1.mp4 is successfully uploaded as "
        "object 'video1.mp4' to bucket 'videos'."
    )

    r.post('http://orchastrator:8080/video', json={
        "video1id": "055cf619",
        "video2id": "266aef608",
        "videoName": "video1.mp4"
    })

if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)