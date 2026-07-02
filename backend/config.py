import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-cencops-key'
    
    # SQLite Database configuration
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'cencops.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Storage mapping
    STORAGE_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..', 'server-storage'))
    
    # JWT Configuration
    JWT_SECRET_KEY = 'jwt-super-secret-key-cencops'
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = False  # Set to True if using HTTPS
    JWT_COOKIE_CSRF_PROTECT = False  # Set to True for production
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
