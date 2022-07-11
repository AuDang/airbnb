from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="Lition", username='Demo', email='demo@aa.io', password='password')
    john = User(
        first_name = "John", last_name = "Doe", username = 'johndoe', email = 'johndoe@aa.io', password = 'password')
    austin = User(
        first_name="Austin", last_name="Dang", username='Audang', email='audang@aa.io', password='password')
    
    db.session.add(demo)
    db.session.add(john)
    db.session.add(austin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
