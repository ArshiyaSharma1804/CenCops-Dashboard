from flask import Blueprint, request, jsonify, current_app, send_file
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from models import db, User, Category, Case, Report, Order
from auth import admin_required
import os
from datetime import datetime
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'pdf', 'docx', 'jpg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_file_extension(filename):
    return filename.rsplit('.', 1)[1].lower() if '.' in filename else ''

api_bp = Blueprint('api', __name__)

# --- CATEGORIES ---
@api_bp.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories])

@api_bp.route('/categories', methods=['POST'])
@admin_required()
def add_category():
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify({'msg': 'Name is required'}), 400
    cat = Category(name=data['name'])
    db.session.add(cat)
    db.session.commit()
    return jsonify({'id': cat.id, 'name': cat.name}), 201

@api_bp.route('/categories/<int:cat_id>', methods=['PUT'])
@admin_required()
def update_category(cat_id):
    cat = Category.query.get_or_404(cat_id)
    data = request.get_json()
    if data and data.get('name'):
        cat.name = data['name']
        db.session.commit()
    return jsonify({'id': cat.id, 'name': cat.name})

@api_bp.route('/categories/<int:cat_id>', methods=['DELETE'])
@admin_required()
def delete_category(cat_id):
    cat = Category.query.get_or_404(cat_id)
    db.session.delete(cat)
    db.session.commit()
    return jsonify({'msg': 'Category deleted'})


# --- EXPERTS (Users) ---
@api_bp.route('/experts', methods=['GET'])
@jwt_required()
def get_experts():
    experts = User.query.filter_by(role='user').all()
    result = []
    for e in experts:
        cat_name = e.category.name if e.category else "Unassigned"
        result.append({
            'id': e.id,
            'name': e.name,
            'email': e.email,
            'badge_number': e.badge_number,
            'rank': e.rank,
            'dob': e.dob,
            'district': e.district,
            'state': e.state,
            'age': e.age,
            'category_id': e.category_id,
            'category': cat_name
        })
    return jsonify(result)

@api_bp.route('/experts', methods=['POST'])
@admin_required()
def add_expert():
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'msg': 'Email already exists'}), 400
    if User.query.filter_by(badge_number=data.get('badge_number')).first():
        return jsonify({'msg': 'Badge Number already exists'}), 400
        
    expert = User(
        name=data.get('name'),
        email=data.get('email'),
        badge_number=data.get('badge_number'),
        rank=data.get('rank'),
        dob=data.get('dob'),
        district=data.get('district'),
        state=data.get('state'),
        age=data.get('age'),
        category_id=data.get('category_id'),
        role='user'
    )
    # Default password is the badge number for new users, or whatever is passed
    password = data.get('password') or data.get('badge_number')
    expert.set_password(password)
    db.session.add(expert)
    db.session.commit()
    return jsonify({'msg': 'Expert created successfully', 'id': expert.id}), 201

@api_bp.route('/experts/<int:exp_id>', methods=['PUT'])
@admin_required()
def update_expert(exp_id):
    expert = User.query.get_or_404(exp_id)
    data = request.get_json()
    
    # Update fields if provided
    fields = ['name', 'email', 'badge_number', 'rank', 'dob', 'district', 'state', 'age', 'category_id']
    for field in fields:
        if field in data:
            setattr(expert, field, data[field])
            
    if 'password' in data and data['password']:
        expert.set_password(data['password'])
        
    db.session.commit()
    return jsonify({'msg': 'Expert updated'})

@api_bp.route('/experts/<int:exp_id>', methods=['DELETE'])
@admin_required()
def delete_expert(exp_id):
    expert = User.query.get_or_404(exp_id)
    db.session.delete(expert)
    db.session.commit()
    return jsonify({'msg': 'Expert deleted'})


# --- CASES ---
@api_bp.route('/cases', methods=['GET'])
@jwt_required()
def get_cases():
    cases = Case.query.all()
    result = []
    for c in cases:
        assigned_name = c.assigned_expert.name if c.assigned_expert else "Unassigned"
        cat_name = c.category.name if c.category else "Unassigned"
        result.append({
            'id': c.id,
            'order_id': c.order_id,
            'title': c.title,
            'description': c.description,
            'due_date': c.due_date,
            'status': c.status,
            'start_date': c.start_date.strftime('%d %b %Y') if c.start_date else '',
            'assigned_to_id': c.assigned_to_id,
            'assigned_to': assigned_name,
            'category_id': c.category_id,
            'category': cat_name
        })
    return jsonify(result)

@api_bp.route('/cases', methods=['POST'])
@admin_required()
def add_case():
    if request.content_type and request.content_type.startswith('multipart/form-data'):
        data = request.form
        file = request.files.get('document')
    else:
        data = request.get_json()
        file = None

    new_case = Case(
        order_id=data.get('order_id'),
        title=data.get('title'),
        description=data.get('description'),
        due_date=data.get('due_date'),
        status=data.get('status', 'PENDING'),
        assigned_to_id=data.get('assigned_to_id'),
        category_id=data.get('category_id')
    )
    db.session.add(new_case)
    db.session.commit()

    if file and file.filename and allowed_file(file.filename):
        ext = get_file_extension(file.filename)
        date_str = datetime.today().strftime('%Y%m%d')
        filename = f"{date_str}-{new_case.order_id}-{new_case.id}.{ext}"
        
        orders_dir = os.path.join(current_app.config['STORAGE_ROOT'], 'orders')
        os.makedirs(orders_dir, exist_ok=True)
        
        file_path = os.path.join(orders_dir, filename)
        file.save(file_path)
        
        claims = get_jwt()
        user_id = int(get_jwt_identity())
        
        order = Order(
            case_id=new_case.id,
            uploaded_by_id=user_id,
            file_path=file_path
        )
        db.session.add(order)
        db.session.commit()

    return jsonify({'msg': 'Case created successfully', 'id': new_case.id}), 201

@api_bp.route('/cases/<int:case_id>', methods=['PUT'])
@jwt_required()
def update_case(case_id):
    claims = get_jwt()
    user_role = claims.get('role')
    user_id = int(get_jwt_identity())
    
    c = Case.query.get_or_404(case_id)
    data = request.get_json()
    
    if user_role == 'admin':
        fields = ['title', 'description', 'due_date', 'status', 'assigned_to_id', 'category_id']
        for field in fields:
            if field in data:
                setattr(c, field, data[field])
    else:
        # Regular user can only update status of their assigned case
        if c.assigned_to_id != user_id:
            return jsonify({'msg': 'Unauthorized'}), 403
        
        if 'status' in data:
            c.status = data['status']
            
    db.session.commit()
    return jsonify({'msg': 'Case updated'})

@api_bp.route('/cases/<int:case_id>', methods=['DELETE'])
@admin_required()
def delete_case(case_id):
    c = Case.query.get_or_404(case_id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({'msg': 'Case deleted'})

@api_bp.route('/cases/<int:case_id>/report', methods=['POST'])
@jwt_required()
def add_report(case_id):
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    
    c = Case.query.get_or_404(case_id)
    if c.assigned_to_id != user_id and claims.get('role') != 'admin':
        return jsonify({'msg': 'Unauthorized'}), 403
        
    if 'document' not in request.files:
        return jsonify({'msg': 'No document provided'}), 400
        
    file = request.files['document']
    if not file or not file.filename or not allowed_file(file.filename):
        return jsonify({'msg': 'Invalid file type'}), 400
        
    ext = get_file_extension(file.filename)
    date_str = datetime.today().strftime('%Y%m%d')
    filename = f"{date_str}-{c.order_id}-{c.id}.{ext}"
    
    reports_dir = os.path.join(current_app.config['STORAGE_ROOT'], 'reports')
    os.makedirs(reports_dir, exist_ok=True)
    
    file_path = os.path.join(reports_dir, filename)
    file.save(file_path)
    
    report = Report(
        case_id=c.id,
        uploaded_by_id=user_id,
        file_path=file_path
    )
    db.session.add(report)
    
    c.status = 'DONE'
    db.session.commit()
    
    return jsonify({'msg': 'Report uploaded successfully'})

@api_bp.route('/files/<type>/<int:id>', methods=['GET'])
@jwt_required()
def get_file(type, id):
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    role = claims.get('role')
    
    if type == 'order':
        record = Order.query.filter_by(case_id=id).order_by(Order.id.desc()).first_or_404()
    elif type == 'report':
        record = Report.query.filter_by(case_id=id).order_by(Report.id.desc()).first_or_404()
    else:
        return jsonify({'msg': 'Invalid file type'}), 400
        
    c = record.case
    if role != 'admin' and c.assigned_to_id != user_id:
        return jsonify({'msg': 'Unauthorized'}), 403
        
    if not os.path.exists(record.file_path):
        return jsonify({'msg': 'File not found on server'}), 404
        
    return send_file(record.file_path)
