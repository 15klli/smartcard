#coding: utf-8
import MySQLdb
import time
from bs4 import BeautifulSoup
import re
import requests,json
import smtplib
from email.mime.text import MIMEText
from email.header import Header

user="root"
paw='Lh150351'
dbname='wx_test'
logFileName='log_test'+'.txt'
secret = 'f7609e65b985b6310e5f0c9dd7f289bc'
appid = 'wx78e80bffd8b46982'



def log(str):
	with open(logFileName,'a+') as f:
		f.write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+'\t'+str+'\n')
		f.close()
	return

def getPlaceById(id):
	place=['', u'图书馆前台', u'修远书院前台', u'敬一书院前台', u'明德书院前台', u'研究生宿舍前台',
	u'德馨书院前台', u'至诚书院前台', u'弘毅书院前台', u'知行书院前台', u'思源书院前台'
	];
	return place[int(id)]


#return type : -1 =not Exist 0= failed 1 = success
def delDataFromSqlByCardNum(tableName,cardNum):
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	rs=getDataFromSql(tableName,judgeField='cardNum',judgeValue=cardNum)
	if rs==0:
		return -1  # not Exists
	sql='delete from %s where cardNum=%s'%(tableName,cardNum)
	try:
		cursor.execute(sql)
		db.commit()	
		db.close()
		return 1
	except:
		db.rollback()
		db.close()
		log('Commit sql:%s Failed!'%(sql))
		return 0

def getDataFromSql(tableName,judgeField='',judgeValue='',returnField='*'):
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	if judgeField=='':
		sql='select %s from %s'%(returnField,tableName)
	else:
		sql='select %s from %s where %s="%s"'%(returnField,tableName,judgeField,judgeValue)
	try:
		cursor.execute(sql)
		db.commit()	
	except:
		db.rollback()
		db.close()
		log('Commit sql:%s Failed!'%(sql))
		return -1
	db.close()	
	rs=cursor.fetchall()
	if len(rs)==0:
		return 0
	return rs

def getDataFromSqlByOpenid(tableName,openid,returnField='*'):
	rs=getDataFromSql(tableName=tableName,judgeField='openid',judgeValue=openid,returnField=returnField)
	if (rs!=0) & (rs!=-1):
		return rs[0][0]
	return 0



def isRegisted(openid):
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	sql='select openid from user_data where openid="%s"'%openid
	cursor.execute(sql)
	result=cursor.fetchone()
	db.close()
	if result==None :
		return False
	else: return True
	
def regist(info):
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	#add to table cardInfo
	sql='insert into cardInfo(openid,cardNum) values ("%s","%s")'\
		% (info['openid'],info['cardNum']);
	try:
		cursor.execute(sql)
		db.commit()
		log('Add cardNum:%s in cardInfo successfully'%info['cardNum'])
	except:
		db.rollback()
		db.close()
		log('Add cardNum:%s in cardInfo Failed'%info['cardNum'])

	#then add to table user_Data
	sql='insert into user_data(openid,name,email,cardNum,stuNum) values ("%s","%s","%s","%s","%s")'\
		%(info['openid'],info['name'],info['email'],info['cardNum'],info['stuNum'])
	# print sql
	try:
		cursor.execute(sql)
		db.commit()
		log('Add cardNum:%s in user_data successfully'%info['cardNum'])	
		db.close()	
		return True
	except:
		db.rollback()
		db.close()
		log('Add cardNum:%s in user_data Failed'%info['cardNum'])		
		return False

# log the information of pickCard 
# return type: 1: had existed  0:  add successfully   -1 :add failed
def pickCardLog(info):	
	lostCardInfo= info['lostCardInfo']
	pickerInfo=info['pickerInfo']
	placeChoice=info['placeChoice']
	cardPlace=info['cardPlace'] 
	pickDate=info["pickDate"]
	# rs=getDataFromSqlByOpenid(tableName='lostCardLog',openid=openid)
	# formId=
	way=info['way'] # int
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	sql='select cardNum from pickCardLog where cardNum="%s"'% (lostCardInfo['cardNum'])
	cursor.execute(sql)
	rs=cursor.fetchone()
	if rs!=None:
		db.close()
		return 1
	if way==0: # 0 = place  1 = pickerName,pickerPhone
		sql='insert into pickCardLog(cardNum,place,pickDate) values("%s","%s","%s") '\
			%(lostCardInfo['cardNum'],str(placeChoice),pickDate)
	else:
		sql='insert into pickCardLog(cardNum,pickerPhone,pickerName,pickDate) values("%s","%s","%s","%s") '\
			%(lostCardInfo['cardNum'],pickerInfo['phone'],pickerInfo['name'],pickDate)	
	try:
		cursor.execute(sql)
		db.commit()
		db.close()
		log('Add cardNum:%s in pickCardLog successfully'%lostCardInfo['cardNum'])		
	except:
		db.rollback()
		db.close()
		log('Add cardNum:%s in pickCardLog Failed'%lostCardInfo['cardNum'])		
		return -1
	if way==0:
		sendMessageAfterPickCardLog(cardNum=lostCardInfo['cardNum'],place=getPlaceById(str(placeChoice)))		
	else:
		sendMessageAfterPickCardLog(cardNum=lostCardInfo['cardNum'],pickerName=pickerInfo['name'],pickerPhone=pickerInfo['phone'])		
	return 0
def isLostCardLog(openid):	
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	sql='select openid from lostCardLog where openid="%s"' %(openid)
	cursor.execute(sql)
	rs=cursor.fetchone()
	if rs!=None:
		db.close()		
		return 1
	db.close()
	return 0

# log the information of loser
# return type: 1: had logged  0:  add successfully   -1 :add failed
def lostCardLog(openid,formId):
	now=time.strftime("%Y-%m-%d")
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	sql='select openid from lostCardLog where openid="%s"' %(openid)
	cardNum=getDataFromSqlByOpenid(tableName='cardInfo',openid=openid,returnField='cardNum')
	cursor.execute(sql)
	rs=cursor.fetchone()
	if rs!=None:
		db.close()		
		return 1
	sql='insert into lostCardLog(openid,cardNum,lostDate,formId) values("%s","%s","%s","%s") ' \
		%(openid,cardNum,now,formId)
	print sql
	try:
		cursor.execute(sql)
		db.commit()
		db.close()
		log('Add openid:%s in lostCardLog successfully'% openid)		
	except:
		db.rollback()
		db.close()
		log('Add openid:%s in lostCardLog Failed'% openid)		
		return -1
	sendMessageAfterLostCardLog(openid=openid,cardNum=cardNum,formId=formId)
	return 0
# waiting to debug
def getBalance(openid):
	url='http://wechat.stu.edu.cn/wechat/login/login_verify'
	headers={
	'Host': 'wechat.stu.edu.cn',
	'User-Agent': 'MicroMessenger/6.3.27 Mozilla/5.0 ',
	# 'Referer': 'http://wechat.stu.edu.cn/wechat/login/login?source_type=Smartcard_cardbalance',
	'DNT':'0',
	'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',	
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language':'en-US,en;q=0.5'
	}
	rs=getDataFromSql(tableName='user_data',returnField='email,emailPaw',judgeField='openid',judgeValue=openid)
	if rs==0:
		return 'Error'
	account=rs[0][0]
	paw=rs[0][1]
	data={
	'ldap_account': account,
	'ldap_password': paw ,
	'btn_ok': u'登录',
	'source_type': 'smartcard_trans',
	'openid': ''
	}

	session = requests.Session()
	res = session.post(url,headers=headers,data=data)
	res= session.get('http://wechat.stu.edu.cn/wechat/smartcard/Smartcard_cardbalance',headers=headers)
	with open("balance.html",'w+') as f:
		f.write(res.content)
	soup=BeautifulSoup(res.content,'html.parser')
	t=soup.find(id='page').text
	balance=str(re.sub(r'[^0-9\.]','',t))
	return balance

# return type:  0=Nothing  -1= Error  1= Exist
def hasCardPaw(openid):
	cardNum=getDataFromSql(tableName='user_data',judgeField='openid',judgeValue=openid,returnField='cardNum')
	if (cardNum==0):				
		return 0
	elif(cardNum==-1):
		return -1
	cardNum=cardNum[0]	
	cardPaw=getDataFromSql(tableName='cardInfo',judgeField='cardNum',judgeValue=cardNum,returnField='cardPaw')
	if (cardPaw==0 ):
		return 0  # nothing
	elif(cardPaw==-1):
		return -1 # Error when Commitent
	return cardPaw[0]

def getAccessToken():
	url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret;
	rs=requests.get(url)
	data=json.loads(rs.content)
	if data.has_key('access_token'):		
		return data['access_token']
	return ''

def getExistTemplate():
	token=getAccessToken()
	url='https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token='+token
	data={
	"offset":0,
	"count":1
	}
	rs=requests.post(url,json.dumps(data))
	print rs.content
	return rs.content

def setIsNotice(openid):
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	sql='update lostCardLog set isNotice=1 where openid='+openid
	try:
		cursor.execute(sql)
		db.commit()
		log('Set isNotice:openid=%s successfully!'%(openid))
	except Exception as e:
		raise e
		db.rollback()
		log('Set isNotice:openid=%s Failed!'%(openid))
	db.close()

# return the whole pickCardinfo of Loser
def compareInPickCardLog(cardNum):
	rs=getDataFromSql(tableName='pickCardLog',judgeField='cardNum',judgeValue=cardNum)
	if rs!=0:
		return rs[0]
	return 0

# only return the openid of Loser,  or 0
def compareInLostCardLog(cardNum):
	rs=getDataFromSql(tableName='lostCardLog',judgeField='cardNum',judgeValue=cardNum,returnField='openid ,formId')
	print rs
	if rs!=0:
		return rs[0]
	return 0

def sendMessage(sendData):	
	token=getAccessToken()	
	url= 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+token
	print sendData    
	rs=requests.post(url,json.dumps(sendData) )
	print rs.content
	return json.dumps(rs.content)

def sendMessageAfterLostCardLog(openid,cardNum,formId):
	data=compareInPickCardLog(cardNum)
	if data==0:
		return 
	print data
	loserName=''
	rs=getDataFromSql(tableName='user_data',judgeField='openid',judgeValue=openid,returnField='name')
	if (rs!=0) & (rs!=-1):
		loserName=rs[0][0]
	else:
		return
	pickerName=data[1]
	pickerPhone=data[2]
	place=data[3]
	sendData={}
	addr=getDataFromSqlByOpenid(tableName='user_data',openid=openid,returnField='email')	
	if place==None:
		sendData={
		"touser":openid,            
		"template_id":'CP262cd6x2ssPcFaqdV6U0rS3FsO4EzjAHtktzSM0jk',
		"form_id":formId,
		'page':'foundCard?openid='+openid,
		"data":{
		"keyword1":{"value":loserName},
		"keyword2":{"value":pickerName},
		"keyword3":{"value":pickerPhone},
		"keyword4":{"value":u"请尽快联系！取到卡后请点击本通知进入确认取回"}
		}
		}
		sendEmail(addr=addr,name=loserName,cardNum=cardNum,pickerName=pickerName,pickerPhone=pickerPhone)
	else:
		sendData={
		"touser":openid,            
		"template_id":'',
		"form_id":formId,
		'page':'foundCard?openid='+openid,
		"data":{
		"keyword1":{"value":loserName},
		"keyword2":{"value":cardNum},
		"keyword3":{"value":getPlaceById(place)},
		"keyword4":{"value":u"请尽快去指定位置取卡！取到卡后请点击本通知进入确认取回"}
		}
		}
		sendEmail(addr=addr,name=loserName,cardNum=cardNum,place=getPlaceById(place))
	sendMessage(sendData);

def sendMessageAfterPickCardLog(cardNum,place='',pickerName='',pickerPhone=''):
	data=compareInLostCardLog(cardNum)
	if data==0:
		return	
	openid=data[0]	
	formId=data[1]
	rs=getDataFromSql(tableName='user_data',judgeField='openid',judgeValue=openid,returnField='name')
	if (rs!=0) & (rs!=-1):
		loserName=rs[0][0]
	else:
		return
	rs=getDataFromSqlByOpenid(tableName='lostCardLog',openid=openid,returnField='formId')
	addr=getDataFromSqlByOpenid(tableName='user_data',openid=openid,returnField='email')		
	if place=='':
		sendData={
		"touser":openid,            
		"template_id":'CP262cd6x2ssPcFaqdV6U0rS3FsO4EzjAHtktzSM0jk',
		"form_id":formId,
		'page':'foundCard?openid='+openid,
		"data":{
		"keyword1":{"value":loserName},
		"keyword2":{"value":pickerName},
		"keyword3":{"value":pickerPhone},
		"keyword4":{"value":u"请尽快联系！取到卡后请点击本通知进入确认取回"}		
		}
		}
		sendEmail(addr=addr,name=loserName,cardNum=cardNum,pickerName=pickerName,pickerPhone=pickerPhone)		
	else:
		sendData={
		"touser":openid,            
		"template_id":'',
		"form_id":formId,
		'page':'foundCard?openid='+openid,
		"data":{
		"keyword1":{"value":loserName},
		"keyword2":{"value":cardNum},
		"keyword3":{"value":getPlaceById(place)},
		"keyword4":{"value":u"请尽快去指定位置取卡！取到卡后请点击本通知进入确认取回"}		
		}
		}
		sendEmail(addr=addr,name=loserName,cardNum=cardNum,place=getPlaceById(place))		
	sendMessage(sendData)

def sendEmail(addr,name,cardNum,place='',pickerName='',pickerPhone=''):
	pwd='ifdxyieptubmbehb'
	myEmail='852778163@qq.com'
	receivers=[email+'@stu.edu.cn']	
	if place=='':		
		mail_msg = u"""
		<div>
		<h3 style="text-align: center;">校园一卡通助手</h3>	
		</div>
		<div>
		 <p>您的卡已找回，请确认信息并按照以下信息尽快取回</p>
		</div>
		<div>
			<table border="1px">
			<tr>
				<td>一卡通姓名</td>
				<td>%s</td>
			</tr>
			<tr>
				<td>一卡通号</td>
				<td>%s</td>
			</tr>
			<tr>
				<td>拾卡者</td>
				<td>%s</td>		
			</tr>
			<tr>
				<td>拾卡者联系方式</td>
				<td>%s</td>
			</tr>	
		</table>
		</div>
		<div><img width="100px" src="https://mp.weixin.qq.com/wxopen/basicprofile?action=get_qrcode&type=1&openid=oWMv_0AvXUPzPwwCmISdlyi6zxYo&token=2049510290&lang=zh_CN">
		</div>
		<footer>From <b>校园一卡通助手<b> 小程序</footer>
		"""%(name,cardNum,pickerName,pickerPhone)
	else:
		mail_msg=u"""
		<h3 style="text-align: center;">校园一卡通助手<h1>
		<div>
		 <h4>您的卡已找回，请确认信息并按照以下信息尽快取回</h4>	
		</div>
		<div>
			<table border="1px">
			<tr>
				<td>一卡通姓名</td>
				<td>%s</td>
			</tr>
			<tr>
				<td>一卡通号</td>
				<td>%s</td>
			</tr>	
			<tr>
				<td>取卡地点</td>
				<td>%s</td>
			</tr>
		</table>
		</div>
		<div><img width="100px" src="https://mp.weixin.qq.com/wxopen/basicprofile?action=get_qrcode&type=1&openid=oWMv_0AvXUPzPwwCmISdlyi6zxYo&token=2049510290&lang=zh_CN">
		</div>
		<footer>From <b>校园一卡通助手<b> 小程序</footer>

		"""%(name,cardNum,place)

	message = MIMEText(mail_msg, 'html', 'utf-8')
	message['From'] = Header(u"校园一卡通助手", 'utf-8')
	message['To'] =  Header(name, 'utf-8')
	subject = u'一卡通寻回通知'
	message['Subject'] = Header(subject, 'utf-8')
	try:
		server=smtplib.SMTP_SSL("smtp.qq.com", 465)
		server.login(myEmail,paw)
		server.sendmail(myEmail,receivers,message.as_string())
		server.quit()
		log('Mail to %s@stu.edu.cn(cardNum:%s) successfully!')%(email,cardNum)
	except smtplib.SMTPException:
		log('Mail to %s@stu.edu.cn(cardNum:%s) Failed!')%(email,cardNum)
	    
	



def moveToFitLog(sendData):
	data=sendData['data']
	cardNum=sendData['data']['keyword2']['value']
	openid=sendData['touser']
	loserName=data['keyword1']['value']
	place=data['keyword3']['value']
	delDataFromSqlByCardNum(tableName='pickCardLog',cardNum=cardNum)
	delDataFromSqlByCardNum(tableName='lostCardLog',cardNum=cardNum)
	db = MySQLdb.connect("localhost", user, paw, dbname, charset='utf8')
	cursor=db.cursor()
	sql=''