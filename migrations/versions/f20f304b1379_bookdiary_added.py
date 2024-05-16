# pylint: disable=no-member, invalid-name
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'f20f304b1379'
down_revision: Union[str, None] = '5bb007a171ff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_likes',
                    sa.Column('user_id', sa.BigInteger(), nullable=False),
                    sa.Column('article_id', sa.UUID(), nullable=False),
                    sa.PrimaryKeyConstraint('user_id', 'article_id')
                    )
    op.create_table('user_publics',
                    sa.Column('id', sa.UUID(), server_default=sa.text('uuid_generate_v4()'), nullable=False),
                    sa.Column('user_id', sa.BigInteger(), nullable=False),
                    sa.Column('user_name', sa.String(), nullable=False),
                    sa.Column('book_id', sa.String(), nullable=False),
                    sa.Column('book_name', sa.String(), nullable=False),
                    sa.Column('book_authors', sa.JSON(), nullable=False),
                    sa.Column('publication_date', sa.DateTime(), nullable=False),
                    sa.Column('article_name', sa.String(length=50), nullable=False),
                    sa.Column('book_genre', sa.String(), nullable=False),
                    sa.Column('text', sa.Text(), nullable=False),
                    sa.Column('likes', sa.Integer(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('user_subs',
                    sa.Column('user_id', sa.BigInteger(), nullable=False),
                    sa.Column('sub_id', sa.BigInteger(), nullable=False),
                    sa.Column('sub_name', sa.String(), nullable=False),
                    sa.PrimaryKeyConstraint('user_id', 'sub_id')
                    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_subs')
    op.drop_table('user_publics')
    op.drop_table('user_likes')
    # ### end Alembic commands ###
