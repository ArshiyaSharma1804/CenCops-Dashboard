from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    badge_number = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user') # 'admin' or 'user'
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    
    # Extended Profile Information
    rank = db.Column(db.String(50), nullable=True)
    dob = db.Column(db.String(20), nullable=True)
    district = db.Column(db.String(50), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    
    category = db.relationship('Category', backref='experts')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

class Case(db.Model):
    __tablename__ = 'cases'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.String(50), nullable=True)
    status = db.Column(db.String(50), nullable=False, default='PENDING') # PENDING, IN PROGRESS, DONE
    assigned_to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    assigned_expert = db.relationship('User', backref='cases')
    category = db.relationship('Category', backref='cases')

class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id'), nullable=False)
    uploaded_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    upload_timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    case = db.relationship('Case', backref='reports')
    uploaded_by = db.relationship('User')

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id'), nullable=False)
    uploaded_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    upload_timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    case = db.relationship('Case', backref='orders')
    uploaded_by = db.relationship('User')
