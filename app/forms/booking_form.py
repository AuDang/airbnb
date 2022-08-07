from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError



class BookingForm(FlaskForm):
   user_id = IntegerField("user_id", validators=[DataRequired()])
   spot_id = IntegerField("spot_id", validators=[DataRequired()])
   check_in = DateField("check_in", validators=[DataRequired('Please enter a start date...')])
   check_out = DateField("check_out", validators=[DataRequired('please enter an end date...')])
   guests = IntegerField("guests", validators=[DataRequired('guest cant be empty')])