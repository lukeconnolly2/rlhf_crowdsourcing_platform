FROM python:3.11.0-alpine3.17

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo pkgconfig
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip3 install --no-cache-dir --upgrade -r /code/requirements.txt

COPY main.py /code/main.py 
COPY models.py /code/models.py
COPY constants.py /code/constants.py

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]