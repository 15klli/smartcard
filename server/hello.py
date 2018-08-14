#encoding:utf8

from flask import Flask,send_file
import requests 
from flask import request
import json
import general
import time
import re

app = Flask(__name__)

openid=''
session_key=''	
baseUrl='http://klli852.top:8080'

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/wx/login')
def getOpenId():
	appid='wx78e80bffd8b46982'
	code=request.args.get('code')
	secret='f7609e65b985b6310e5f0c9dd7f289bc'
	url='https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code' %(appid,secret,code)
	r=requests.get(url)
	data=json.loads(r.content)
	openid=data["openid"]
	session_key=data['session_key']	
	# print openid
	rs=general.isRegisted(openid)
	back={
		'openid':openid,
		'session_key':session_key,
		'isRegisted':rs,
	}
	return json.dumps(back)

@app.route('/wx/regist',methods=['post'])
def regist():
	data=request.get_json()
	rs=general.regist(data)
	back={
		'isSuccess':rs
	}	
	return json.dumps(back)

@app.route('/wx/pickCardLog',methods=['POST'])
def pickCardLog():
	data=request.get_json()	
	rs=general.pickCardLog(data)	
	back={
		'isExist':rs
	}	
	return json.dumps(back)

@app.route('/wx/lostCardLog',methods=['GET'])
def lostCardLog():
	openid=request.args.get('openid')
	formId=request.args.get('formId')	
	rs=general.lostCardLog(openid=openid,formId=formId)
	back={
		'isExist':rs
	}	
	return json.dumps(back)

@app.route('/wx/isLostCardLog')
def isLostCardLog():
	data=request.args.get('openid')
	rs=general.isLostCardLog(data)	
	back={
		'isExist':rs
	}	
	return json.dumps(back)

@app.route('/wx/getBalance')
def getBalance():
	openid=request.args.get('openid')
	balance=general.getBalance(openid)
	back={
		'balance':balance
	}
	return json.dumps(back)
@app.route('/wx/getPic')
def getPic():
	res=requests.get('http://klli852.top:8080/getPic')
	fileName='/root/vcode/vcode'+time.strftime("%H%M%S", time.localtime())+'.png'
	with open(fileName,'w+')as f :
		f.write(res.content)
		f.close()	
	return send_file(fileName)

@app.route('/wx/loginSys',methods=['POST'])
def login():
	data=request.get_json()	
	rs=general.getDataFromSql(tableName='cardInfo',judgeField='openid',judgeValue=str(data['openid']),returnField='cardNum')
	print 'rs'+rs[0][0]
	if (rs!=0) & (rs!=-1):
		data['cardNum']=rs[0][0]
	# data=json.dumps(data)
	sendData={
		'cardNum':data['cardNum'],
		'cardPaw':data['cardPaw'],
		'vcode':data['vcode']
	}
	url='http://klli852.top:8080/login'
	if data['reportLost']=='true':
		url='http://klli852.top:8080/reportLost'
	res=requests.post(url,data=sendData)	
	return res.content
	
@app.route('/wx/hasCardPaw')
def hasCardPaw():
	openid=request.args.get('openid')
	hasCardPaw=general.hasCardPaw(openid)
	flag=False
	if (hasCardPaw!=0) & (hasCardPaw!=-1) :
		flag=True
	back={
		'hasCardPaw':flag
	}
	return json.dumps(back)

@app.route('/wx/getRecord',methods=['POST'])
def getRecord():
	data=request.get_json()	
	url=baseUrl+'/getRecord'
	cardNum=general.getDataFromSql(tableName='user_data',judgeField='openid',judgeValue=data['openid'],returnField='cardNum')	
	if (cardNum!=0) & (cardNum!=-1) :
		cardNum=cardNum[0][0]
	sendData={
		'begin':re.sub(r'-','',str(data['begin'])),
		'end':re.sub(r'-','',str(data['end'])),	
		'cardNum':cardNum
	}
	print sendData
	res=requests.post(url,data=sendData)
	print res.content	
	return res.content

@app.route('/wx/getAccessToken')
def getAccessToken():
	data=general.getAccessToken()
	code='error'
	if data!='':
		code='ok'
	sendData={
		'code':code,
		'data':data
	}
	return json.dumps(sendData)

@app.route('/wx/sendMessage',methods=['POST'])

@app.route('/wx/getExistTemplate')
def getExistTemplate():
	return json.dumps(general.getExistTemplate())

@app.route('/wx/t')
def addTemplate():
	data={
	"id":"AT0007",
	"keyword_id_list":[3,4,5]
	}
	token=general.getAccessToken()
	url='https://api.weixin.qq.com/cgi-bin/wxopen/template/add?access_token='+token
	rs=requests.post(url,json.dumps(data))
	print rs.content
	return json.dumps(rs.content)


	

if __name__ == '__main__':
    app.run('127.0.0.1', debug=True, port=5000)
