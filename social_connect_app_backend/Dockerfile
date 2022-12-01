# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./social_connect_app_backend/requirements.txt /code/
RUN pip install -r ./requirements.txt
COPY ./social_connect_app_backend /code/
CMD ["python","manage.py" , "runserver","0.0.0.0:8000"]

