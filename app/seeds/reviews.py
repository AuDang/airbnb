from app.models import db, Review

def seed_reviews():
   review1 = Review(
      user_id=2,
      spot_id=1,
      review='This place just can\'t get any better and the view is amazing',
      rating=100
   )
   review2 = Review(
      user_id=1,
      spot_id=3,
      review='This place is DOPE !',
      rating=100
   )
   review3 = Review(
      user_id=1,
      spot_id=3,
      review='What a lovely little place in near the heart of San Francisco and the Host was amazing with communication.',
      rating=100
   )

   review4 = Review(
      user_id=2,
      spot_id=3,
      review='Other than the price, this place is great.',
      rating=80
   )
   review5 = Review(
      user_id=1,
      spot_id=5,
      review='This place is amazing!',
      rating=100
   )
        

   db.session.add(review1)
   db.session.add_all([review2, review3, review4])
   db.session.add(review5)
   db.session.commit()

def undo_reviews():
   db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
   db.session.commit()

