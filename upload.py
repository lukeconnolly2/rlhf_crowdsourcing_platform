import requests

API_KEY = "3b729c34e729af5dd6b809bc561a942d84e58180b01999a615ea3534923e5a3e"

def request_upload_url(hostname, file_name, api_key):
    url = f"http://{hostname}/getUploadURL"
    params = {"filename": file_name}
    headers = {"X-API-Key": api_key}

    response = requests.get(url, params=params, headers=headers)

    if response.status_code == 200:
        return response.json()["url"]
    if response.status_code == 401:
        raise Exception("Invalid API Key")
    else:
        return Exception("Funny Error")

def upload_to_azure(upload_url, file_path):
    with open(file_path, 'rb') as file:
        file_content = file.read()

    # Make the PUT request to upload the file
    response = requests.put(upload_url, data=file_content, headers={'x-ms-blob-type': 'BlockBlob'})

    # Check if the upload was successful
    if response.status_code == 201:
        return upload_url.split('?')[0]
    else:
        raise Exception("Upload failed")

def send_metadata(api_key, hostname, public_url):
    url = f"http://{hostname}/video"
    headers = {"X-API-Key": api_key}
    data = {"public_url": public_url}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        print("Metadata sent successfully")
    else:
        raise Exception("Metadata upload failed")

upload_url = request_upload_url("localhost:8000", "video4.mp4", API_KEY)
if upload_url != -1:
    public_url = upload_to_azure(upload_url, "./frontend/public/Reference_Clips/MuJoCo_Clips/TestPairClip_1.mp4")

if public_url != -1:
    send_metadata(API_KEY, "localhost:8000", public_url)
