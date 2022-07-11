from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
   """
   Simple function that turns the WTForms validation errors into a simple list
   """
   errorMessages = []
   for field in validation_errors:
      for error in validation_errors[field]:
         errorMessages.append(f'{error}')
   return errorMessages


@review_routes.route('/')
def get_reviews():
   reviews = Review.query.all()


@review_routes.route('/spots/<int:id>', methods=["POST"])
@login_required
def post_review(id):
   form = ReviewForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      new_review = Review(

         review = form.data['review'],
         rating = form.data['rating']
      )

      db.session.add(new_review)
      db.session.commit()

      return new_review.to_dict()
   else:
      return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
   form = ReviewForm()
   review = Review.query.get(id)
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      review.rating = form.data['rating']
      review.review = form.data['review']
      db.session.commit()

      return review.to_dict()
   else:
      return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
   delete_review = Review.query.get(id)
   db.session.delete(delete_review)
   db.session.commit()
   return delete_review.to_dict()
