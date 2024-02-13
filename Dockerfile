FROM python:3.12.1

WORKDIR /

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY portfolio /portfolio/

ENV PORTWEB 8000
ENV PORTSMTP 465

EXPOSE $PORTWEB
EXPOSE $PORTSMTP

CMD ["python", "/portfolio/manage.py", "runserver", "0.0.0.0:8000"]