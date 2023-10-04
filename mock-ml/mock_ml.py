from minio import Minio
from minio.error import S3Error
import requests as r


def send_video(video_name, filename, video1_id, video2_id, client):
    r.post('http://orchastrator:8080/video', json={
        "video1id": video1_id,
        "video2id": video2_id,
        "videoName": video_name
    })
    client.fput_object(
        "videos", video_name, filename,
    )
    print('Put object {} to bucket {} successfully.'.format(video_name, "videos"))

def main():
    client = Minio(
        "datalake:9000",
        access_key="test1",
        secret_key="MsJWKd0vvzYi3IvNnwoV9T8D4y4W4y091XZb9pXt",
        secure=False,
    )

    # Reset DB for Testing
    r.get('http://orchastrator:8080/')

    found = client.bucket_exists("videos")
    if not found:
        client.make_bucket("videos")
    else:
        print("Bucket 'videos' already exists")

    send_video("video1.mp4", "Test_Clip_1.mp4", "057cf619", "276aef608", client)
    send_video("video2.mp4", "Test_Clip_2.mp4", "055cf619", "266aef608", client)
    send_video("video3.mp4", "Test_Clip_3.mp4", "053cf619", "256aef608", client)
    send_video("video4.mp4", "Test_Clip_4.mp4", "051cf619", "246aef608", client)

if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)