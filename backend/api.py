from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from models import db, User, Category, Case, Report, Order
from auth import admin_required

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
    data = request.get_json()
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
