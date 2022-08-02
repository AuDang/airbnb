from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Booking
from app.forms import BookingForm

booking_routes = Blueprint("bookings", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# @booking_routes.route("/users/")