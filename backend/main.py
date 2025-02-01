from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# فعال‌سازی CORS برای فرانت‌اند
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# مدل محصول (هماهنگ با فرانت‌اند)
class Product(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: str | None = None  # تصویر اختیاری

# لیست اولیه محصولات
products = [
    {"id": 1, "name": "پسته اکبری خام", "price": 511830, "category": "پسته", "image": "/image/pistachio.jpg"},
    {"id": 2, "name": "پسته اکبری شور", "price": 215000, "category": "پسته", "image": "/image/salty_pistachio.jpg"},
    {"id": 3, "name": "انجیر خشک", "price": 96000, "category": "خشکبار", "image": "/image/fig.jpg"},
    {"id": 4, "name": "تخم شربتی", "price": 170000, "category": "خشکبار", "image": "/image/basil_seed.jpg"},
    {"id": 5, "name": "مغز تخمه کدو گوشتی", "price": 415000, "category": "خشکبار", "image": "/image/pumpkin_seed.jpg"},
]

@app.get("/api/products", response_model=List[Product])
def get_products():
    return products

@app.post("/api/products", response_model=Product)
def add_product(product: Product):
    products.append(product.dict())
    return product

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    products.remove(product)
    return {"message": "Product deleted successfully"}
