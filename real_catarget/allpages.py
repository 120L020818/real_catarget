from django.shortcuts import render

def login_page(request):
    if request.method=='POST':
        print(request.POST['username'])
        print(request.POST['password'])
        print(request.POST['captcha'])
    return render(request,'login.html')

def register_page(request):
    return render(request,'register.html')

def agreement_page(request):
    return render(request,'agreement.html')
def test_page(request):
    if request.method=='GET':
        print('这是一个get方法')
    elif request.method=='POST':
        print('这是一个post方法')

    return render(request,'test.html')
