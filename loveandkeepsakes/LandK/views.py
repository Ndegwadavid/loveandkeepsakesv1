from django.shortcuts import render
from .models import Category, Product

def landk(request):
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    
    category_slug = request.GET.get('category')
    if category_slug:
        products = products.filter(category__slug=category_slug)
    
    search_query = request.GET.get('search')
    if search_query:
        products = products.filter(name__icontains=search_query)
    
    return render(request, 'landk/landk.html', {
        'categories': categories,
        'products': products,
    })

def product_list(request):
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    # ... other view logic ...
    return render(request, 'your_template.html', {
        'categories': categories,
        'products': products,
        # ... other context variables ...
    })