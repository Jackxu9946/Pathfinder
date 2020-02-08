from flask import Flask,request,render_template,Response,jsonify
import pyodbc

app = Flask(__name__)

cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=yourServer;DATABASE=yourDatabase;UID=;PWD=')


@app.route('/')
def default():
    if request.method == "GET":
        #return defaultHtml
@app.route('/generateShoppingList')
def default():
    if request.method == "POST":
        
        #generate a value from URL
