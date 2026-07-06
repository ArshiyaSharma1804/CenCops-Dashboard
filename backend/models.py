from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

case_categories = db.Table('case_categories',
    db.Column('case_id', db.Integer, db.ForeignKey('cases.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

case_assignees = db.Table('case_assignees',
    db.Column('case_id', db.Integer, db.ForeignKey('cases.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

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
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    categories = db.relationship('Category', secondary=case_categories, lazy='subquery', backref=db.backref('cases', lazy=True))
    assignees = db.relationship('User', secondary=case_assignees, lazy='subquery', backref=db.backref('assigned_cases', lazy=True))

class CaseUpdate(db.Model):
    __tablename__ = 'case_updates'
    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    case = db.relationship('Case', backref='updates')
    user = db.relationship('User')

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
