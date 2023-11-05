FROM python:3.11.0

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY main.py /code/main.py 
COPY models.py /code/models.py

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]