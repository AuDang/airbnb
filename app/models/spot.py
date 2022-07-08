from app.models.db import db 
import datetime

class Spot(db.Model):
   __tablename__ = 'spots'

   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
   address = db.Column(db.String, nullable=False)
   city = db.Column(db.String, nullable=False)
   state = db.Column(db.String, nullable=False)
   country = db.Column(db.String, nullable=False)
   name = db.Column(db.String, nullable=False)
   price = db.Column(db.Integer, nullable=False)
   description = db.Column(db.String, nullable=False)
   guest = db.Column(db.Integer, nullable=False)
   bathroom = db.Column(db.Integer, nullable=False)
   bedroom = db.Column(db.Integer, nullable=False)
   created_at = db.Column(db.DateTime, default=datetime.datetime.now())
   updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

   user = db.relationship("User", back_populates='spot')
   reviews = db.relationship("Review", back_populates='spot')
   images = db.relationship("Image", back_populates='spot')

   def to_dict(self):
      return {
         'id': self.id,
         'user_id': self.user_id,
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
         'images': [{'id': image.id, 'image':image.image} for image in self.images]
      }