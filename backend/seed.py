from app import app
from models import db, User, Category

def seed_database():
    with app.app_context():
        # Ensure tables are created
        db.create_all()

        # Check if users already exist
        if User.query.first():
            print("Database already seeded.")
            return

        print("Seeding database...")

        # Create categories
        category_names = ["IPDR / CDR", "OSINT", "Mobile", "Hard Drive", "Media"]
        categories = []
        for name in category_names:
            cat = Category(name=name)
            db.session.add(cat)
            categories.append(cat)
        db.session.commit()

        # Create Admin
        admin = User(
            name="Admin User",
            badge_number="ADM-001",
            email="admin@cencops.in",
            role="admin"
        )
        admin.set_password("admin123")
        
        # Create a Regular Expert
        expert = User(
            name="Ravi Kumar",
            badge_number="EXP-101",
            email="ravi@cencops.in",
            role="user",
            category_id=categories[0].id
        )
        expert.set_password("user123")

        db.session.add_all([admin, expert])
        db.session.commit()
        
        from models import Case
        # Seed some dummy cases
        case1 = Case(
            order_id="ORD-2026-001",
            title="Investigate Network Logs",
            description="Detailed review of network logs for the recent anomaly in subnet 4.",
            due_date="2026-07-15",
            status="PENDING",
            assigned_to_id=expert.id,
            category_id=categories[0].id
        )
        case2 = Case(
            order_id="ORD-2026-002",
            title="Analyze Malicious APK",
            description="Reverse engineer the APK file retrieved from the suspect's mobile device.",
            due_date="2026-07-20",
            status="PENDING",
            assigned_to_id=expert.id,
            category_id=categories[2].id
        )
        db.session.add_all([case1, case2])
        db.session.commit()

        print("Seeding complete! You can log in with:")
        print("Admin: admin@cencops.in / admin123")
        print("User : ravi@cencops.in / user123")

if __name__ == "__main__":
    seed_database()
