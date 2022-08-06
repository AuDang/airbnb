"""empty message

Revision ID: 7fa4fa94717a
Revises: b08b59d27ee5
Create Date: 2022-08-05 18:27:34.393125

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7fa4fa94717a'
down_revision = 'b08b59d27ee5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('spot_id', sa.Integer(), nullable=False),
    sa.Column('check_in', sa.DateTime(), nullable=False),
    sa.Column('check_out', sa.DateTime(), nullable=False),
    sa.Column('guests', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bookings')
    # ### end Alembic commands ###
