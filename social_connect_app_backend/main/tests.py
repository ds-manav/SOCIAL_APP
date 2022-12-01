from rest_framework.test import APITestCase,APIClient
from main.views import UserViewSet,PostViewSet,CommentViewSet
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from django.urls import reverse


class UserLoginTestCases(APITestCase):
    id=18
    def setUp(self):
        self.client = APIClient()
        engine =  create_engine("postgresql+psycopg2://postgres:postgre@db:5432/test")
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()
        print("connected")

    def test_test_create_user(self):
        data = {"id":19,"username":"manav","email":"manavabgfgfc@gmail.com","password":"manav"}
        url = "http://127.0.0.1:8000/api/users/"
        self.client = APIClient()
        self.user = UserViewSet()
        response = self.client.post(url,data)
        self.assertEqual(response.status_code,201);

    def test_get_user_by_id(self):
        url = "http://127.0.0.1:8000/api/users/18"
        self.client = APIClient()
        self.user = UserViewSet()
        response = self.client.get(url)
        print(response.status_code)
        self.assertEqual(response.status_code,200);
    
    def test_login(self):
        data = {"username":"manav","email":"manavabc@gmail.com","password":"manav"}
        url = "http://127.0.0.1:8000/api/login/"
        self.client = APIClient()
        self.user = UserViewSet()
        response = self.client.post(url,data)
        print(response.status_code)
        self.assertEqual(response.status_code,202);

class PostsTestCases(APITestCase):
    def setUp(self):
        self.client = APIClient()
        engine =  create_engine("postgresql+psycopg2://postgres:postgre@db:5432/test")
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()
        print("connected")

    def test_create_posts(self):
        data = {"id":18,"username":"manav","userid":18,"feed":"manavfeed"}
        url = "http://127.0.0.1:8000/api/posts/"
        self.client = APIClient()
        self.user = PostViewSet()
        response = self.client.post(url,data)
        self.assertEqual(response.status_code,201);

    def test_get_post_by_id(self):
        url = "http://127.0.0.1:8000/api/posts/18"
        self.client = APIClient()
        self.user = PostViewSet()
        response = self.client.get(url)
        print(response.status_code)
        self.assertEqual(response.status_code,200);
    
class CommentsTestCases(APITestCase):
    id = 15
    def setUp(self):
        self.client = APIClient()
        engine =  create_engine("postgresql+psycopg2://postgres:postgre@db:5432/test")
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()
        print("connected")

    def test_create_comments(self):
        data = {"id":16,"username":"manav","postid":17,"comment":"manavfeed"}
        url = "http://127.0.0.1:8000/api/comments/"
        self.client = APIClient()
        self.user = CommentViewSet()
        response = self.client.post(url,data)
        self.assertEqual(response.status_code,201);

    def test_get_comment_by_id(self):
        url = "http://127.0.0.1:8000/api/comments/16"
        self.client = APIClient()
        self.comment = CommentViewSet()
        response = self.client.get(url)
        print(response.status_code)
        self.assertEqual(response.status_code,200);
    

        





