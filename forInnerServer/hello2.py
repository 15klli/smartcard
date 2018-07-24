#encoding:utf-8
from flask import Flask,send_file,make_response,send_from_directory
import requests 
from flask import request
import json
import time
import random
import re
import os
# import sysOperation
from bs4 import BeautifulSoup

# account=''
# paw=''
session = requests.Session()
headers = {
        'User-Agent' : 'Mozilla/5.0  Firefox/50.0',
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept-Language':'en-US,en;q=0.5'
    }

UPLOAD_FOLDER = 'd:\\vcode\\'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
fileName=''
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def splitDateTime(s):
    # global count
    # print  count
    # count+=1
    # print s
    s=str(s)
    date=s.split(' ')[0]
    t=s.split(' ')[1]
    n=t.find(':',t.find(':')+1)
    time=t[:n]
    return [date,time]

def getToday(account):
    global session
    data={'account':account[1:] ,
    'inputObject': 'all',
    'Submit': u' 确 定 '}                
    today_url = 'http://smartcard.stu.edu.cn/accounttodayTrjn.action'
    session.get(today_url)
    today_url='http://smartcard.stu.edu.cn/accounttodatTrjnObject.action'
    res = session.post(today_url,headers=headers,data=data, stream=True)
    # with open("D:\\vcode\\today.html",'w+')as f:
    #     f.write(res.content)
    #     f.close() 
    return anaysis(res,isToday=True)
    # return res
def getHistory(account,begin=time.strftime("%Y%m%d", time.localtime()),end=time.strftime("%Y%m%d", time.localtime())):    
    print 'in'
    result={'date':[],'records':[]}    
    today=  time.strftime("%Y%m%d", time.localtime())
    # begin= today
    # end=today
    if end==today: 
        result=getToday(account)
    if begin==today:
        return result
    base='http://smartcard.stu.edu.cn'
    res=session.get('http://smartcard.stu.edu.cn/accounthisTrjn.action')
    soup=BeautifulSoup(res.content,'html.parser')
    s=str(soup.form.attrs['action'])
    print account[1:]
    data={'account':account[1:],
    'inputObject': 'all',
    'Submit': u' 确 定 '}
    res=session.post(base+s,data=data)
    soup=BeautifulSoup(res.content,'html.parser')
    s=str(soup.form.attrs['action'])
    data={'inputStartDate': begin,'inputEndDate': end}  
    res=session.post(base+s,data=data) # return 操作进行时
    soup=BeautifulSoup(res.content,'html.parser')
    s=str(soup.form.attrs['action'])
    url=base+'/accounthisTrjn.action'+s
    res=session.post(url)
    soup=BeautifulSoup(res.content,'html.parser')
    s=soup.find_all('div',align='center')[0].text
    index=s.index(u'共',s.index(u'共')+1)+1
    pages=int(str(s[index]));  
    turnPageUrl='http://smartcard.stu.edu.cn/accountconsubBrows.action'
    for x in xrange(1,pages+1):
        data['pageNum']=str(x)
        res=session.post(turnPageUrl,data=data)
        # result=dict(result.items()+anaysis(res).items())
        temp=anaysis(res)
        result['date']+=temp['date']
        result['records']+=temp['records']
    #     # with open("D:\\vcode\\records%s.html"%(str(x)),'w+')as f:
    #     #     f.write(res.content)
    #     #     f.close()
    # return res
    return result
def anaysis(res,isToday=False):
    soup=BeautifulSoup(res.content,'html.parser')
    date=soup.find_all('td',align='center')
    place=soup.find_all('td',align='center')    
    trans=soup.find_all('td',align='right')
    result={'date':[],'records':[]}
    j=12  #for date increment
    step=9
    if isToday==True:
        j=13  # for anysis today's trans_detail
        step=10
    tempDate=''
    foreDate='' # used to compare with tempDate
    for i in range(0,len(trans),2):        
        temp=splitDateTime(date[j].text)
        tempDate=temp[0]
        time=temp[1]
        place=date[j+4].text.rstrip()
        if(foreDate!=tempDate):
            foreDate=tempDate
            result['date'].append(foreDate)
            result['records'].append([])
            # count=0
        result['records'][len(result['records'])-1].append({'time':time,'place':place,'money':str(trans[i].text)})        
        j+=step
    return result


def allowed_file(filename):
    return '.' in filename and  filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/getPic')
def getPic():
    global session
    global fileName
    home_url = 'http://smartcard.stu.edu.cn/homeLogin.action'    
    res = session.get(home_url,headers=headers)
    random_num = random.random() * 10000
    captcha_url ='http://smartcard.stu.edu.cn/getCheckpic.action?rand='+str(random_num)
    get_captcha = session.get(captcha_url).content
    picName='captcha'+time.strftime("%H%M%S", time.localtime())+'.png'
    fileName=app.config['UPLOAD_FOLDER']+picName
    with open(fileName, 'wb') as f:
        f.write(get_captcha)
        f.close()        
    return send_from_directory(app.config['UPLOAD_FOLDER'],picName)

@app.route('/login',methods=['POST'])
def login():
    # global account
    # global paw
    global session
    global fileName	
    os.remove(fileName)
    data=request.values
    account=str(data['cardNum'])
    paw=str(data['cardPaw'])
    vcode=str(data['vcode'])
    payload = {
    'imageField.x':30,
    'imageField.y':15,
    'loginType':1,
    'name':account,
    'passwd':paw,
    'rand':vcode,
    'userType':1
    }
    login_url = 'http://smartcard.stu.edu.cn/loginstudent.action'
    res = session.post(login_url,headers=headers,data=payload, stream=True)
    isSuccess=False
    if(res.headers['Content-Length']=='667'):
        isSuccess=True	#login successfully
    return json.dumps({'isSuccess':isSuccess})

@app.route('/getRecord',methods=['POST'])
def getRecord():
    # data=request.get_json()
    global session
    data=request.values
    # print data
    result=getHistory(account=data['cardNum'],begin=data['begin'],end=data['end'])
    # print result
    return json.dumps(result)


# @app.route('/reportLost',methods=['POST'])

if __name__ == '__main__':
    # app.run('192.168.43.29', debug=True, port=80)
    app.run('10.21.141.2', debug=True, port=80)

