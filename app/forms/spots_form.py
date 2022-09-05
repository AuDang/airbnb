from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length


class SpotForm(FlaskForm):
   name = StringField('Name', validators=[DataRequired("Please provide a name for this spot"), Length(
       min=5, max=100, message='Name must be between 5 and 100 characters')])
   address = StringField('Address', validators=[
                         DataRequired("Please enter an address")])
   city = StringField('City', validators=[DataRequired("Please enter a city"), Length(
       min=1, max=40, message='City must be between 5 and 40 characters')])
   state = StringField('State', validators=[
                       DataRequired("Please select a state")])
   country = StringField('country', validators=[DataRequired("Please select a country")])
   price = IntegerField('Price', validators=[DataRequired("Please enter a price"), NumberRange(
       min=500, max=1000000, message='Price can\'t be lower than $500')])
   guest = IntegerField('Guests', validators=[DataRequired("Please enter the amount of total guests"), NumberRange(
       min=1, max=100, message='Guest must be between 1 and 100')])
   bedroom = IntegerField('Bedrooms', validators=[DataRequired("Please enter the amount of total bedrooms"), NumberRange(
       min=1, max=100, message=' Bedroom must be between 1 and 100')])
   bathroom = IntegerField('Bathrooms', validators=[DataRequired("Please enter the amount of bathrooms"), NumberRange(
       min=1, max=50, message='Bathroom must be between 1 and 50')])
   description = StringField('Description', validators=[DataRequired("Please provide a description"), Length(
       min=25, max=1000000, message='Description must between 25 characters and 10,000 characters')])
