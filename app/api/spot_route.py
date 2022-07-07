from flask import Blueprint,jsonify,request
from flask_login import login_required
from app.models import db, Spot
from app.forms import SpotForm 

spot_routes = Blueprint('spots', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@spot_routes.route('/')
def get_spots():
   spots = Spot.query.all()
   return jsonify([spot.to_dict() for spot in spots])

@spot_routes.route('/')
def getr_spots():
   spot = Spot.query.get(id)
   return spot.to_dict()

@spot_routes.route('/<int:id>')
def get_spot(id):
   spot = Spot.query.get(id)
   return spot.to_dict()

@spot_routes.route('/', methods=['POST'])
@login_required
def post_spot():
   form = SpotForm()
   form =['csrf_token'].data = request.cookies['csrf.token']

   if form.validate_on_submit():
      spot = Spot()
      form.populate_obj(spot)
      db.session.add(spot)
      db.session.commit()
      return spot.to_dict()

@spot_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_spot(id):
   form = SpotForm()
   form['csrf_token'].data = request.cookies['csrf.token']
   if form.validate_on_submit():
      spot = Spot.query.get(id)
      form.populate_obj(spot)
      db.session.commit()
      return spot.to_dict()
@spot_routes.route('</int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
   delete_spot = Spot.query.get(id)

   db.session.delete(delete_spot)
   db.session.commit()
   return delete_spot.to_dict()


