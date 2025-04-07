import random
from app.config.database import db

products_collection = db["Producto"]


def assign_price_and_stock():
    productos = list(products_collection.find({
        "$or": [{"price": None}, {"stock": None}]
    }))

    print(f"🎯 Productos a actualizar: {len(productos)}")

    for producto in productos:
        precio = round(random.uniform(3.5, 42.0), 2)  # Precio entre 3.5 y 22 €
        stock = random.randint(0, 50)  # Stock entre 0 y 50 unidades

        update = {}
        if producto.get("price") is None:
            update["price"] = precio
        if producto.get("stock") is None:
            update["stock"] = stock

        products_collection.update_one(
            {"_id": producto["_id"]},
            {"$set": update}
        )

        print(
            f"💰 {producto['name']}: precio {update.get('price')} €, "
            f"stock {update.get('stock')} uds"
        )

    print("✅ Precios y stock asignados correctamente.")


if __name__ == "__main__":
    assign_price_and_stock()
