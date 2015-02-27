from flask import Flask

# Flask Instance & Config
app = Flask('application')
import config

# [Flask Extension] Signup with Google
'''
from flask.ext.oauthlib.client import OAuth
oauth = OAuth(app)
google = oauth.remote_app(
    'google',
    consumer_key         = app.config.get('GOOGLE_CLIENT_ID'),
    consumer_secret      = app.config.get('GOOGLE_CLIENT_SECRET'),
    request_token_params = {
        'scope' : 'https://www.googleapis.com/auth/userinfo.email'
    },
    base_url             = 'https://www.googleapis.com/oauth2/v1/',
    request_token_url    =  None,
    access_token_method  = 'POST',
    access_token_url     = 'https://accounts.google.com/o/oauth2/token',
    authorize_url        = 'https://accounts.google.com/o/oauth2/auth',
)
facebook = oauth.remote_app(
    'facebook',
    consumer_key         = app.config.get('FACEBOOK_APP_ID'),
    consumer_secret      = app.config.get('FACEBOOK_APP_SECRET'),
    request_token_params = {
        'scope' : ['email', 'public_profile']
    },
    base_url             = 'https://graph.facebook.com',
    request_token_url    =  None,
    access_token_url     = '/oauth/access_token',
    authorize_url        = 'https://www.facebook.com/dialog/oauth',
)
'''

# Import Every function in 'controllers' directory
# from application.models import schema
import os
for base, dirs, names in os.walk(os.path.join('application', 'controllers')):
    for name in filter(lambda s: s.endswith('.py') and s != '__init__.py', names) :
        exec('from application.controllers.'+name[:-3]+' import *')
