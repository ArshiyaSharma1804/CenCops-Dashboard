from app import app
from models import db
from seed import seed_database
import os

with app.app_context():
    db.drop_all()
    # Now seed_database will see empty tables and seed them.
    seed_database()
