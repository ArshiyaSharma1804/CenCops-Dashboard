from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required, get_jwt_identity, get_jwt
from models import db, User
from functools import wraps

auth_bp = Blueprint('auth', __name__)

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get('role') != 'admin':
                return jsonify({"msg": "Admins only!"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Bad email or password"}), 401

    # Create token and include the user's role in the claims
    additional_claims = {"role": user.role}
    access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)
    
    response = jsonify({
        "msg": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    })
    
    # Set the JWT token in an HttpOnly cookie
    set_access_cookies(response, access_token)
    return response

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response

@auth_bp.route('/me', methods=['GET', 'PUT'])
@jwt_required()
def me():
    # Return or update the currently logged in user based on the secure cookie
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
        
    if request.method == 'PUT':
        data = request.get_json()
        if 'name' in data: user.name = data['name']
        if 'email' in data: user.email = data['email']
        if 'rank' in data: user.rank = data['rank']
        if 'badge_number' in data: user.badge_number = data['badge_number']
        db.session.commit()
        
    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "badge_number": user.badge_number,
            "category_id": user.category_id,
            "rank": user.rank,
            "dob": user.dob,
            "district": user.district,
            "state": user.state,
            "age": user.age
        }
    })
