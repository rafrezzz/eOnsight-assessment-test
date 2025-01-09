# Bridge API Backend

## Description
This is a Django backend for my assessment test for eOnsight, a simple API that allows users to create, read, update and delete bridges. 

## Prerequisites
- Python 3.10+
- PostgreSQL with PostGIS

## Setup

#### Install dependencies:

```bash
pip install -r requirements.txt
```

#### Apply migrations:

```bash 
python manage.py migrate
```

#### Run the server:

```bash
python manage.py runserver
```