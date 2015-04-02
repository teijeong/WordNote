#-*-coding: utf-8-*-
import flask
import datetime
import json
import re

from flask import Flask, Response
from flask import request
from flask.ext import restful
from flask.ext.restful import Resource, reqparse, fields, marshal_with
from flask.ext.cors import CORS
from pymongo import MongoClient
from bson import json_util
from bs4 import BeautifulSoup

from urllib.request import urlopen

mongoURI = ('mongodb://heroku_app32258670:'
    '5hcl5oso685va7pcpo8e9ku1f5@ds061360'
    '.mongolab.com:61360/heroku_app32258670')
db = MongoClient(mongoURI).heroku_app32258670
app = Flask(__name__)
api = restful.Api(app)
CORS(app, allow_headers='Content-Type',
    methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])

class Sound(Resource):
    def get(self, word):
        if not word.isalpha():
            return {'sound':''}
        cur = db.words.find({'word': word})
        if cur.count() == 0:
            url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/%s?key=09fb7395-bea4-4768-a901-e463ef5d7df7' % word
            response = urlopen(url)
            xml = response.read()
            print(xml)
            soup = BeautifulSoup(xml, 'xml')
            if len(soup.find_all('entry')) == 0:
                return {'sound': ''}
            sound = soup.sound.wav.get_text()
            if sound[0:3] == 'bix':
                sound = 'bix/' + sound
            elif sound[0:2] == 'gg':
                sound = 'gg/' + sound
            elif sound[0].isdigit():
                sound = 'number/' + sound
            else:
                sound = sound[0] + '/' + sound
            wordData = {'word': word, 'xml': str(xml), 'sound': sound}
            db.words.insert(wordData)
            return {'sound': sound}
        return {'sound': cur[0]['sound']}

            


api.add_resource(Sound, '/sound/<string:word>')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)



