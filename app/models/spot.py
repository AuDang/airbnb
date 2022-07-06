from app.models.db import db 

class Spot(db.Mdodel):
   __tablename__ = 'spots'

   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
   address = db.Column(db.String, nullable=False)
   city = db.Column(db.String, nullable=False)
   state = db.Column(db.String, nullable=False)
   country = db.Column(db.String, nullable=False)
   name = db.Column(db.String, nullable=False)
   price = db.Column(db.BitInteger, nullable=False)
   imageUrl1 = db.Column(db.String, nullable=True)
   imageUrl2 = db.Column(db.String, nullable=True)
   imageUrl3 = db.Column(db.String, nullable=True)
   imageUrl4 = db.Column(db.String, nullable=True)
   description = db.Column(db.String, nullable=False)
   guest = db.Column(db.BigInteger, nullable=False)
   bathroom = db.Column(db.BigInteger, nullable=False)
   bedroom = db.Column(db.BigInteger, nullable=False)
   created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
   updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

   def to_dict(self):
      return {
         'id': self.id,
         'user_id': self.host.user.id,
         'address': self.address,
         'city': self.city,
         'state': self.state,
         'country': self.country,
         'name': self.name,
         'price': self.price,
         'description': self.description,
         'guest': self.guest,
         'bathroom': self.bathroom,
         'bedroom': self.bedroom,
         'reviews': [{'id': review.id, 'rating': review.rating} for review in self.reviews],
      }