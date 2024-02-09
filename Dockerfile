FROM python:3.12.1

WORKDIR /

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY portfolio /portfolio/

EXPOSE 8000

CMD ["python", "/portfolio/manage.py", "runserver", "0.0.0.0:8000"]