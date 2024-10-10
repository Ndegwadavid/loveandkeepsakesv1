from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')

        if not all([email, password, password2]):
            return render(request, 'accounts/register.html', {'error': 'All fields are required.'})
        
        if password != password2:
            return render(request, 'accounts/register.html', {'error': 'Passwords do not match.'})

        try:
            validate_password(password)
        except ValidationError as e:
            return render(request, 'accounts/register.html', {'error': ' '.join(e.messages)})

        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            login(request, user)
            return redirect('login')  # Redirect to home page after successful registration
        except Exception as e:
            return render(request, 'accounts/register.html', {'error': str(e)})

    return render(request, 'accounts/register.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('landk')  # Redirect to home page after successful login
        else:
            return render(request, 'accounts/login.html', {'error': 'Invalid email or password.'})
    return render(request, 'accounts/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')  # Redirect to home page after logout