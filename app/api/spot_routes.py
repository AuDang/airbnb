from flask import Blueprint,jsonify,request
from app.models import db, Spot, Image
from flask_login import login_required
from app.forms import SpotForm 
from app.s3 import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_image_from_s3)

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


@spot_routes.route('/<int:id>')
def get_spot(id):
    spot = Spot.query.get(id)
    return spot.to_dict()


@spot_routes.route("/images", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "Image required"}, 400

    image = request.files["image"]
    spot_id = request.form["spot_id"]

    if not allowed_file(image.filename):
        return {"errors": "File type not supported"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(spot_id=spot_id, image=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}


@spot_routes.route('/images/<int:id>', methods=["DELETE"])
@login_required
def delete_images(id):
    image = Image.query.get(id)
    name = request.form['image'].split('/')[-1]

    if 'amazonaws' in request.form['image']:
        delete_image_from_s3(name)

    db.session.delete(image)
    db.session.commit()
    return {'url': 'success'}

@spot_routes.route('/', methods=['POST'])
@login_required
def add_spot():
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(request.get_json())

    if form.validate_on_submit():
        newSpot = Spot(
            user_id=request.get_json()['user_id'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description'],
            guest=form.data['guest'],
            bedroom=form.data['bedroom'],
            bathroom=form.data['bathroom'],
        )

        db.session.add(newSpot)
        db.session.commit()
        return newSpot.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@spot_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        spot = Spot.query.get(id)
        form.populate_obj(spot)
        db.session.commit()
        return spot.to_dict()

@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
    delete_spot = Spot.query.get(id)

    db.session.delete(delete_spot)
    db.session.commit()
    return delete_spot.to_dict()


