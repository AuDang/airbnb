from fask_wtf import FlaskForm 
from wtforms import StringField, IntegerField, SelectField 
from wtforms.validators import DataRequired, NumberRange, Length

class SpotForm(FlaskForm):
   name = StringField('Name', validators=[DataRequired("Name: Please provide a name for this spot"), Length(min=5, max=100, message='Name must be at least 5 characters and no more than 100 characters')])
   address = StringField('Address', validators=[DataRequired("Address: Please enter an address")])
   city = StringField('City', validators=[DataRequired("City: Please enter a city")])
   state = StringField('State', validators=[DataRequired("City:Please enter a state")])
   description = StringField('Description', validators=[DataRequired("Description: Please provide a description"), Length(
       min=25, max=1000, message='Description name must be at least than 25 characters and no more than 1000 characters')])
   price = IntegerField('Price', validators=[DataRequired("Price: Please enter a price per night"), NumberRange(
       min=1, max=1000000, message='Price must be between $1 and $1,000,000')])
   guest = IntegerField('Guests', validators=[DataRequired("Guest: Please enter the amount of total guests"), NumberRange(
       min=1, max=100, message='Guest must be between 1 and 100')])
   bedroom = IntegerField('Bedrooms', validators=[DataRequired("Bedroom: Please enter the amount of total bedrooms"), NumberRange(
           min=1, max=50, message=' Bedroom be between 1 and 50')])
   bathroom = IntegerField('Bathrooms', validators=[DataRequired("Bathroom: Please enter the total amoutn of bathrooms"), NumberRange(
       min=1, max=20, message='Bathroom must be between 1 and 20')])

