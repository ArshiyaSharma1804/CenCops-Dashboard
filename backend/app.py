from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
import os

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for the React frontend, allowing credentials (cookies)
CORS(app, supports_credentials=True)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)

# Ensure storage directories exist
os.makedirs(os.path.join(app.config['STORAGE_ROOT'], 'Orders'), exist_ok=True)
os.makedirs(os.path.join(app.config['STORAGE_ROOT'], 'Reports'), exist_ok=True)

# Register Blueprints
from auth import auth_bp
from api import api_bp
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/api/health', methods=['GET'])
def health_check():
    return {'status': 'ok', 'message': 'CenCops Backend is running.'}

if __name__ == '__main__':
    with app.app_context():
        # Create all database tables
        db.create_all()
    app.run(debug=True, port=5000)
