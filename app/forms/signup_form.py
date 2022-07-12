from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired("First Name: Please enter your first name"), Length(min=1, max=20, message="First name must be between 1 and 20 characters")])
    last_name = StringField("Last Name", validators=[DataRequired("Last Name: Please enter your last name"), Length(min=1, max=20, message="Last name be between 1 and 20 characters")])
    username = StringField('Username', validators=[DataRequired("Username: Please enter a username"), Length(min=5, max=40, message="Username must be between 5 and 40 characters long"), username_exists])
    email = StringField('Email', validators=[DataRequired("Email: Please enter a email"), user_exists, Email(message='Please provide a valid e-mail')])
    password = StringField('Password', validators=[DataRequired("Password: Please enter a password"),  Length(min=6, max=20, message='Password must be between 6 and 20 characters')])
