# -*- coding: utf-8 -*-
from pymongo import MongoClient
from bson import ObjectId
import random
# create a mongo client connect to default host and port
host = "localhost"
port = 27017
client = MongoClient(host,port)

# Authentication
# account = 'admin'
# password = 'tp61i6c04'
# client.admin.authenticate(account, password, mechanism='SCRAM-SHA-1')
# uri = "mongodb://"+account+":"+password+"@"+host+"/admin?authMechanism=SCRAM-SHA-1"
# client = MongoClient(uri)

# get the database
db = client.test_database

# get collections (i.e. tables) in the database
table = db.question_db

# create a post in json format
post = {"question":"這其實只是一個測試，假設有一個非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常長的題目，那你猜猜看這樣在畫面上會顯示成什麼樣子？",
 		"optionA":"很正常顯示",
 		"optionB":"可能會凸出格子",
 		"optionC":"題目的文字自我相似，形成碎型",
 		"optionD":"形成3D立體結構，文字凸出螢幕之外往z方向長出來",
 		"answer":"A"
 		}
#dpost = {"_id":ObjectId("56fe1fb00e6dcf096d700c04")}
#result = table.delete_one(dpost)
#result = table.find().limit(-1).skip(2).next()
#c = table.count()
#setp = random.sample(xrange(0,c), 10)
#del result["answer"]


for c in['A','B','C','D']:
	print c

