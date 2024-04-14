import requests
from uuid import uuid4


class Uploader:
    def __init__(self, api_key, hostname):
        self._api_key = api_key
        self._hostname = hostname

    def _request_upload_url(self):
        url = f"https://{self._hostname}/getUploadURL"
        params = {"filename": str(uuid4())}
        headers = {"X-API-Key": self._api_key}

        response = requests.get(url, params=params, headers=headers)

        match response.status_code:
            case 200:
                return response.json()["url"]
            case 401:
                raise Exception("Invalid API Key")
            case _:
                raise Exception(
                    f"Hostname {self._hostname} returned status code {response.status_code}"
                )

    def _upload_to_azure(self, upload_url, file_path):
        with open(file_path, "rb") as file:
            file_content = file.read()

        response = requests.put(
            upload_url, data=file_content, headers={"x-ms-blob-type": "BlockBlob"}
        )

        # Check if the upload was successful
        if response.status_code == 201:
            return upload_url.split("?")[0]
        else:
            raise Exception("Upload failed")

    def _send_metadata(self, public_url, title, description, additional_metadata):
        url = f"http://{self._hostname}/video"
        headers = {"X-API-Key": self._api_key}
        data = {
            "public_url": public_url,
            "title": title,
            "description": description,
            "additional_data": additional_metadata,
        }

        response = requests.post(url, headers=headers, json=data)
        print(response.text)
        if response.status_code == 200:
            print("Metadata sent successfully")
        else:
            raise Exception("Metadata upload failed")

    def upload(self, file_path, title, description, additional_metadata):
        print(additional_metadata)
        upload_url = self._request_upload_url()
        public_url = self._upload_to_azure(upload_url, file_path)
        self._send_metadata(public_url, title, description, additional_metadata)

    def get_results(self) -> dict:
        url = f"http://{self._hostname}/results"
        headers = {"X-API-Key": self._api_key}
        response = requests.get(url, headers=headers)
        return response.json()
