from minio import Minio
from minio.error import S3Error

def main():
    # Create a client with the MinIO server playground, its access key
    # and secret key.
    client = Minio(
        "localhost:9000",
        access_key="test",
        secret_key="jysN5K5INRCRWYMgRpjvw9ssWZ5m4Un6EYfYqqgz",
        secure=False,
    )

    # Make 'asiatrip' bucket if not exist.
    found = client.bucket_exists("videos")
    if not found:
        client.make_bucket("videos")
    else:
        print("Bucket 'videos' already exists")

    # Upload '/home/user/Photos/asiaphotos.zip' as object name
    # 'asiaphotos-2015.zip' to bucket 'asiatrip'.
    client.fput_object(
        "videos", "video1.mp4", "/Users/luke/4th_Year/FYP/TestPairClip_1.mp4",
    )
    print(
        "/Users/luke/4th_Year/FYP/TestPairClip_1.mp4 is successfully uploaded as "
        "object 'video1.mp4' to bucket 'videos'."
    )
    
    video = client.fget_object(
        bucket_name="videos", 
        file_path="videos/TestPairClip_1.mp4", 
        object_name="video1.mp4"
    )

    #Save the file
    with open("TestPairClip_1.mp4", "wb") as file_data:
        file_data.write(video)

if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)