from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader
import json

# Cargar datos desde el .jsonl
train_examples = []
with open("dataset_siamese3.jsonl", "r") as f:
    for line in f:
        data = json.loads(line)
        example = InputExample(
            texts=[data["text1"], data["text2"]],
            label=float(data["label"])
        )
        train_examples.append(example)

# Dataset y dataloader
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=4)

# Cargar un modelo base
model = SentenceTransformer("all-MiniLM-L6-v2")

# Pérdida de contraste
train_loss = losses.CosineSimilarityLoss(model=model)

# Entrenamiento
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=5,
    warmup_steps=10,
    show_progress_bar=True
)

# Guardar el modelo fine-tuned
model.save("modelo_recetas3")
