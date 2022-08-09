from app.models import db, Booking
import datetime 

def seed_bookings():
   booking1 = Booking(
      user_id=1,
      spot_id= 1,
      check_in= "August 10 2022",
      check_out= "August 20 2022",
      guests= 2,
      nights=10
   )

   db.session.add(booking1)
   db.session.commit()

def undo_bookings():
   db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE')
   db.session.commit()
