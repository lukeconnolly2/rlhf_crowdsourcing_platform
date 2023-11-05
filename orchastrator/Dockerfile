FROM python:3.10.0-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN apt update
RUN apt install -y gcc
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY main.py /code/main.py 
COPY models.py /code/models.py

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]