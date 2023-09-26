from minio import Minio
from minio.error import S3Error
import requests as r

def main():
    client = Minio(
        "data_lake:9000",
        access_key="test",
        secret_key="jysN5K5INRCRWYMgRpjvw9ssWZ5m4Un6EYfYqqgz",
        secure=False,
    )

    found = client.bucket_exists("videos")
    if not found:
        client.make_bucket("videos")
    else:
        print("Bucket 'videos' already exists")

    client.fput_object(
        "videos", "video1.mp4", "TestPairClip_1.mp4",
    )
    print(
        "/Users/luke/4th_Year/FYP/TestPairClip_1.mp4 is successfully uploaded as "
        "object 'video1.mp4' to bucket 'videos'."
    )

    r.post('http://orchastrator:8080/video')

if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)