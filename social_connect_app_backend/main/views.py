from django.shortcuts import render
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from main.models import Users,Posts,Comments
from rest_framework import viewsets,status
from sqlalchemy.orm import sessionmaker,Query
from sqlalchemy import create_engine,MetaData
import sqlalchemy as db 
from rest_framework.parsers import JSONParser
from main.models import engine
import json
Session = sessionmaker()
Session.configure(bind=engine)
session = Session()
connection = engine.connect()

metadata = db.MetaData()
users = db.Table('users', metadata, autoload=True, autoload_with=engine)
posts =  db.Table('posts', metadata, autoload=True, autoload_with=engine)
comments =  db.Table('comments', metadata, autoload=True, autoload_with=engine)
class UserViewSet(viewsets.ViewSet):
    # GET LIST OF ALL USER
    def list(self,request):
        query = db.select([users])
        ResultProxy = connection.execute(query)
        ResultSet = ResultProxy.fetchall()
        return Response(ResultSet,status=status.HTTP_200_OK);
     
     
    # CREATE USER
    def create(self,request):
        session = Session()
        if(request.data.get("username")):
            data = request.data
            user = session.query(Users).filter(Users.email==data.get('email')).scalar();
            if(user):
                return Response("User ALready Existed",status=status.HTTP_205_RESET_CONTENT)
            else:
                query = db.insert(users).values(id=data['id'], username=data['username'], email=data['email'], password=data['password'])
                try:
                    connection.execute(query);
                    session.commit();
                    return Response(data,status=status.HTTP_201_CREATED)
                except:
                    return Response("Something went wrong,Please try again",status=status.HTTP_406_NOT_ACCEPTABLE);
                return Response("Something went wrong,Please try again",status=status.HTTP_406_NOT_ACCEPTABLE);
     
    # GET USER BY ID
    def retrieve(self,request,pk=None):
        user = session.query(Users).filter(Users.id==pk).one()
        data ={"id":user.id,"username":user.username,"email":user.email}
        return Response(data,status=status.HTTP_200_OK);
    
    
    # UPDATE USER BY ID 
    def update(self,request,pk=None):
        if(pk):
            user_to_update = session.query(Users).get(pk)
            data = request.data
            
            if(user_to_update.id == data["id"]):
                user_to_update.username = data['username']
                user_to_update.email = data['email']
                user_to_update.password = data['password']
                session.commit()
                destructuring_data = {"id":user_to_update.id,"username":user_to_update.username,"email":user_to_update.email}
                return Response(destructuring_data,status=status.HTTP_201_CREATED);
            else:
                return Response("Incorrect Information",status=status.HTTP_206_PARTIAL_CONTENT);
        else:
            return Response(status=status.HTTP_404_NOT_FOUND);
    
    # DELETE USER BY ID
    def destroy(self,request,pk=None):
        if(pk):
            user = session.query(Users).get(pk)
            session.delete(user)
            session.commit();
            return Response(status=status.HTTP_204_NO_CONTENT);
        
        else:
            return Response(status=status.HTTP_404_NOT_FOUND);
    
    
        
    #  AUTHENTICATE USER
    def login_user(self,request):
        if(request.data.get('email')):
            user = session.query(Users).filter(Users.email==request.data.get('email')).one_or_none()
            print(user.username);
            if(user):
                if(user.password == request.data.get('password')):
                    resdata = {"id":user.id,"email":user.email,"username":user.username}
                    return Response(resdata,status=status.HTTP_202_ACCEPTED);
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED);
        else:
            return Response(status=status.HTTP_204_NO_CONTENT);


    #--------------------------------------------------------------------------------#
    #--------------------------------------------------------------------------------#

class PostViewSet(viewsets.ViewSet):
    # GET LIST OF ALL USER
    def list(self,request):
       
        
        query = db.select([posts])
        ResultProxy = connection.execute(query)
        ResultSet = ResultProxy.fetchall()
        
        return Response(ResultSet,status=status.HTTP_200_OK);
       
    # CREATE POSTS
    def create(self,request):
        data = request.data
        query = db.insert(posts).values(id=data['id'], userid=data['userid'], username=data['username'], feed=data['feed']);
        try:
            connection.execute(query);
            session.commit();
            return Response(data,status=status.HTTP_201_CREATED);
        except:
            return Response("Something went wrong",status=status.HTTP_406_NOT_ACCEPTABLE);
        return Response(None,status=status.HTTP_208_ALREADY_REPORTED)
        
    # GET POSTS BY ID
    def retrieve(self,request,pk=None):
        post = session.query(Posts).get(pk);
        print(post.feed)
        data ={"id":post.id,"username":post.username,"postid":post.userid,"feed":post.feed}
        return Response(data,status=status.HTTP_200_OK);


    # UPDATE Post BY ID 
    def update(self,request,pk=None):
        if(pk):
            post_to_update = session.query(Posts).get(pk)
            data = request.data
            
            if(post_to_update.id == data["id"]):
                post_to_update.feed = data['feed']
                session.commit()
                destructuring_data = {"id":post_to_update.id,"username":post_to_update.username,"feed":post_to_update.feed,"userid":post_to_update.userid},
                return Response(destructuring_data,status=status.HTTP_201_CREATED);
            else:
                return Response("Partial Information",status=status.HTTP_206_PARTIAL_CONTENT);
        else:
            return Response(status=status.HTTP_404_NOT_FOUND);

    # DELETE POST BY ID
    def destroy(self,request,pk=None):
        if(pk):
            post = session.query(Posts).get(pk)
            session.delete(post)
            session.commit();
            return Response(status=status.HTTP_204_NO_CONTENT);
        
        else:
            return Response(status=status.HTTP_404_NOT_FOUND);
    #---------------------------------------------------------------------------------------------------#
    #---------------------------------------------------------------------------------------------------#

class CommentViewSet(viewsets.ViewSet):
    # GET LIST OF ALL USER
    def list(self,request):
        
        query = db.select([comments])
        ResultProxy = connection.execute(query)
        ResultSet = ResultProxy.fetchall()
        return Response(ResultSet,status=status.HTTP_200_OK);
    # CREATE Comment
    def create(self,request):
        data = request.data;
        print(data);

        query = db.insert(comments).values(id=data['id'], username=data['username'], comment=data['comment'], postid=data.get('postid'))
        try:
            connection.execute(query);
            session.commit();
            return Response(None,status=status.HTTP_201_CREATED);
        except:
            return Response("Something went wrong",status=status.HTTP_406_NOT_ACCEPTABLE);
        return Response(None,status=status.HTTP_208_ALREADY_REPORTED)
        
    # GET COMMENT BY ID
    def retrieve(self,request,pk=None):
        comment = session.query(Comments).get(pk)
        data ={"id":comment.id,"username":comment.username,"comment":comment.comment,"postid":comment.postid}
        return Response(data,status=status.HTTP_200_OK);

    # GET COMMENT BY ID
    def commentByForeignKey(self,request,pk=None):
        s = db.select([Comments]).where(Comments.postid==pk)
        resultProxy = connection.execute(s)
        result = resultProxy.fetchall()
        # print(result);
        return Response(result,status=status.HTTP_200_OK);

    # UPDATE Comments BY ID 
    def update(self,request,pk=None):
        if(pk):
            comment_to_update = session.query(Comments).get(pk)
            data = request.data
            
            if(comment_to_update.id == data["id"]):
                comment_to_update.comment = data['comment']
                session.commit()
                destructuring_data = {"id":comment_to_update.id,"username":comment_to_update.username,"comment":comment_to_update.comment,"postid":comment_to_update.postid},
                return Response(destructuring_data,status=status.HTTP_201_CREATED);
            else:
                return Response("Partial Information",status=status.HTTP_206_PARTIAL_CONTENT);
        else:
            return Response(status=status.HTTP_404_NOT_FOUND);

    # DELETE COMMENT BY ID
    def destroy(self,request,pk=None):
        if(pk):
            comment = session.query(Comments).get(pk)
            session.delete(comment)
            session.commit();
            return Response(status=status.HTTP_204_NO_CONTENT);
        
        else:
            return Response(status=status.HTTP_404_NOT_FOUND);

            




