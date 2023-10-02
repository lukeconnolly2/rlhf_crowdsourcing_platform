FROM python:3.11.0-alpine

WORKDIR /code

COPY ./Test_Clip_1.mp4 /code/Test_Clip_1.mp4
COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./mock_ml.py /code/mock_ml.py

CMD [ "python3", "/code/mock_ml.py" ]