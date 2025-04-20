from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader
import pandas as pd

# 1. Cargar datos
df = pd.read_csv("query_product_triplets.csv")

# 2. Convertir a InputExample con tres textos (anchor, positive, negative)
train_examples = [
    InputExample(texts=[row["query"], row["positive"], row["negative"]])
    for _, row in df.iterrows()
]

# 3. Modelo base
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# 4. Preparar dataloader y función de pérdida
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.TripletLoss(model=model)

# 5. Entrenar
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=5,
    warmup_steps=10,
    show_progress_bar=True
)

# 6. Guardar modelo
model.save("modelo_productos_triplet_finetuned")
print("✅ Modelo entrenado con tripletas guardado en 'modelo_productos_triplet_finetuned'")
