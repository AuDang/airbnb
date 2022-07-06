from app.models.db import db 

class Review(db.Model):
   __tablename__ = 'reviews'

   id = db.Column(db.Integer, primary_key=True)
   spot_id = db.Column(db.Integer, db.ForeignKey('spots.id'), nullable=False)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullale=False)
   rating = db.Column(db.Integer, nullable=False)
   review = db.Column(db.String, nullable=False)
   created_at = db.Column(db.DateTime, nullable=False,server_default=db.func.now())
   updated_at = db.Column(db.DateTime, nullable=False,server_default=db.func.now(), server_onupdate=db.func.now())

   user =db.relationship("User", back_populates='reviews')
   spot = db.relationship("Spot", back_populates='reviews')

   def to_dict(self):
      return {
         "id":self.id,
         'spot_id':self.spot_id,
         'user_id':self.user_id,
         'rating': self.rating,
         'review': self.review,
         'username': self.user.username
      }