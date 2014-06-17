"""empty message

Revision ID: 34e7cc4bea
Revises: 493ea8558565
Create Date: 2014-06-17 18:36:05.003029

"""

# revision identifiers, used by Alembic.
revision = '34e7cc4bea'
down_revision = '493ea8558565'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('img', sa.String(length=255), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'img')
    ### end Alembic commands ###