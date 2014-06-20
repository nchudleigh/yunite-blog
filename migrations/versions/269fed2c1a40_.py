"""empty message

Revision ID: 269fed2c1a40
Revises: 5086e1dd760b
Create Date: 2014-06-20 00:03:29.061667

"""

# revision identifiers, used by Alembic.
revision = '269fed2c1a40'
down_revision = '5086e1dd760b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('created_at', sa.BigInteger(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'created_at')
    ### end Alembic commands ###
