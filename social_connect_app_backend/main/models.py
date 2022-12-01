from django.db import models
# from django.db import models
from sqlalchemy import create_engine,Sequence,inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime,MetaData,Table,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker
from django.contrib.auth import get_user_model

engine =  create_engine("postgresql+psycopg2://postgres:postgre@db:5432/postgres")

Base = declarative_base()
class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    username = Column(String(50))
    email = Column(String(100))
    password = Column(String(150))
    posts = relationship("Posts",backref="users")

class Posts(Base):
   __tablename__ = "posts"
   id = Column(Integer,primary_key=True)
   userid = Column(Integer,ForeignKey('users.id'))
   username = Column(String(50))
   feed = Column(String(255))
   comments = relationship("Comments",backref="posts")


class Comments(Base):
   __tablename__ = "comments"
   id = Column(Integer,primary_key=True)
   username = Column(String(50))
   comment = Column(String(150))
   postid = Column(Integer,ForeignKey('posts.id'))



Base.metadata.create_all(engine)
