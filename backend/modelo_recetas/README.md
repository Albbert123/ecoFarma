---
tags:
- sentence-transformers
- sentence-similarity
- feature-extraction
- generated_from_trainer
- dataset_size:100
- loss:CosineSimilarityLoss
base_model: sentence-transformers/all-MiniLM-L6-v2
widget:
- source_sentence: "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAlbert Comas\
    \ Pacheco\nJOPM0010503005\n\nInformació per a la farmàcia\n\nTractaments de curta\
    \ durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\t\
    Vigència\tComentaris\nOmeprazol 20 mg\t1 càpsula cada matí\t14 dies\tV.MORILLAS\t\
    07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu\
    \ d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient\
    \ dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\n\
    Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al\
    \ bé de tothom, fem un ús responsable de la medicació.\n"
  sentences:
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 2219445304\n\
    Paciente: Albert Comas Pacheco  \nEdad: 28 años  \nID.Acc: COPA0030201003\nPrescripciones\
    \  \nID.Rep: 6f44ec603a194791b9c805cf\tLEXCEMA 0,1% 800 CREMA\t1\t1 aplicació\
    \ cada 24 hores\t05-03-2024\t10-03-2024  \nID.Rec: 5427598035100  \nNº Colegiado:\
    \ 282947918"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 3225115650\n\
    Paciente: Anna Sánchez Ruiz  \nEdad: 45 años  \nID.Acc: COPA0030201003\nPrescripciones\
    \  \nID.Rep: 11ae6c82c898401ebd9da4dd\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t\
    05-03-2024\t10-03-2024  \nID.Rec: 1240435431842  \nNº Colegiado: 284309541"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 1270987898\n\
    Paciente: Joan Pérez Martínez  \nEdad: 67 años  \nID.Acc: JOPM0010503005\nPrescripciones\
    \  \nID.Rep: 29673af9a16e4b5bbb1815f0\tOmeprazol 20 mg\t1\t1 cada cada matí\t\
    05-03-2024\t10-03-2024  \nID.Rec: 2518074451926  \nNº Colegiado: 283019822"
- source_sentence: "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información:\
    \ 3946064578\nPaciente: Maria García López  \nEdad: 45 años  \nID.Acc: COPA0030201003\n\
    Prescripciones  \nID.Rep: 1f1e56fdd4be48d590481a81\tOmeprazol 20 mg\t1\t1 cada\
    \ cada matí\t05-03-2024\t10-03-2024  \nID.Rec: 3108294552033  \nNº Colegiado:\
    \ 283849102"
  sentences:
  - "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAlbert Comas Pacheco\n\
    MAGL0020302004\n\nInformació per a la farmàcia\n\nTractaments de curta durada\n\
    Medicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\t\
    Comentaris\nOmeprazol 20 mg\t1 càpsula cada matí\t14 dies\tV.MORILLAS\t07/01/2025\
    \ al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests\
    \ tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà,\
    \ en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos\
    \ el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem\
    \ un ús responsable de la medicació.\n"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 2308545551\n\
    Paciente: Maria García López  \nEdad: 67 años  \nID.Acc: JOPM0010503005\nPrescripciones\
    \  \nID.Rep: 51fa26b98a844e1395e1fdeb\tLEXCEMA 0,1% 800 CREMA\t1\t1 aplicació\
    \ cada 24 hores\t05-03-2024\t10-03-2024  \nID.Rec: 2926106477380  \nNº Colegiado:\
    \ 283019822"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 5745703099\n\
    Paciente: Maria García López  \nEdad: 45 años  \nID.Acc: COPA0030201003\nPrescripciones\
    \  \nID.Rep: 0efde6b8dba8462cbec38086\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t\
    05-03-2024\t10-03-2024  \nID.Rec: 3093424165478  \nNº Colegiado: 283019822"
- source_sentence: "Salut Generalitat de Catalunya\n\nPla de medicació\n\nJoan Pérez\
    \ Martínez\nJOPM0010503005\n\nInformació per a la farmàcia\n\nTractaments de curta\
    \ durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\t\
    Vigència\tComentaris\nIbuprofeno 600 mg\t1 comprimit cada 6 hores\t5 dies\tV.MORILLAS\t\
    07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu\
    \ d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient\
    \ dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\n\
    Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al\
    \ bé de tothom, fem un ús responsable de la medicació.\n"
  sentences:
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 9394821324\n\
    Paciente: Anna Sánchez Ruiz  \nEdad: 28 años  \nID.Acc: MAGL0020302004\nPrescripciones\
    \  \nID.Rep: 10e9c153cfca4376a0a1b362\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t\
    05-03-2024\t10-03-2024  \nID.Rec: 2001352860075  \nNº Colegiado: 284309541"
  - "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAlbert Comas Pacheco\n\
    MAGL0020302004\n\nInformació per a la farmàcia\n\nTractaments de curta durada\n\
    Medicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\t\
    Comentaris\nIbuprofeno 600 mg\t1 comprimit cada 6 hores\t5 dies\tV.MORILLAS\t\
    07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu\
    \ d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient\
    \ dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\n\
    Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al\
    \ bé de tothom, fem un ús responsable de la medicació.\n"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 4517257402\n\
    Paciente: Anna Sánchez Ruiz  \nEdad: 28 años  \nID.Acc: ANSR0040101006\nPrescripciones\
    \  \nID.Rep: 7a790a5bd5cc45af93cb960a\tOmeprazol 20 mg\t1\t1 cada cada matí\t\
    05-03-2024\t10-03-2024  \nID.Rec: 3265794514922  \nNº Colegiado: 282947918"
- source_sentence: "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAnna Sánchez\
    \ Ruiz\nANSR0040101006\n\nInformació per a la farmàcia\n\nTractaments de curta\
    \ durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\t\
    Vigència\tComentaris\nAmoxicilina 500 mg\t1 càpsula cada 8 hores\t7 dies\tV.MORILLAS\t\
    07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu\
    \ d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient\
    \ dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\n\
    Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al\
    \ bé de tothom, fem un ús responsable de la medicació.\n"
  sentences:
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 8522165921\n\
    Paciente: Anna Sánchez Ruiz  \nEdad: 32 años  \nID.Acc: COPA0030201003\nPrescripciones\
    \  \nID.Rep: c24d4607b7f74304b86c6e19\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t\
    05-03-2024\t10-03-2024  \nID.Rec: 2465401901292  \nNº Colegiado: 289301842"
  - "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAnna Sánchez Ruiz\nANSR0040101006\n\
    \nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte\
    \ sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nIbuprofeno\
    \ 600 mg\t1 comprimit cada 6 hores\t5 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\t\
    DERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és\
    \ de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas,\
    \ segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer\
    \ Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable\
    \ de la medicació.\n"
  - "Salut Generalitat de Catalunya\n\nPla de medicació\n\nJoan Pérez Martínez\nCOPA0030201003\n\
    \nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte\
    \ sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nIbuprofeno\
    \ 600 mg\t1 comprimit cada 6 hores\t5 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\t\
    DERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és\
    \ de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas,\
    \ segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer\
    \ Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable\
    \ de la medicació.\n"
- source_sentence: "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información:\
    \ 3256912940\nPaciente: Albert Comas Pacheco  \nEdad: 32 años  \nID.Acc: ANSR0040101006\n\
    Prescripciones  \nID.Rep: 320d297fb07d46a1857e3198\tAmoxicilina 500 mg\t1\t1 cada\
    \ cada 8 hores\t05-03-2024\t10-03-2024  \nID.Rec: 1457921885109  \nNº Colegiado:\
    \ 283849102"
  sentences:
  - "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAnna Sánchez Ruiz\nANSR0040101006\n\
    \nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte\
    \ sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nLEXCEMA\
    \ 0,1% 800 CREMA\t1 aplicació cada 24 hores\t180 dies\tV.MORILLAS\t07/01/2025\
    \ al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests\
    \ tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà,\
    \ en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos\
    \ el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem\
    \ un ús responsable de la medicació.\n"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 5863901502\n\
    Paciente: Maria García López  \nEdad: 28 años  \nID.Acc: ANSR0040101006\nPrescripciones\
    \  \nID.Rep: 233e4e0411cd4391bae2dc77\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t\
    05-03-2024\t10-03-2024  \nID.Rec: 9104126083440  \nNº Colegiado: 282947918"
  - "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 9960576708\n\
    Paciente: Albert Comas Pacheco  \nEdad: 32 años  \nID.Acc: ANSR0040101006\nPrescripciones\
    \  \nID.Rep: cffdde0c6457439e88df8384\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t\
    05-03-2024\t10-03-2024  \nID.Rec: 1306019344002  \nNº Colegiado: 289301842"
pipeline_tag: sentence-similarity
library_name: sentence-transformers
---

# SentenceTransformer based on sentence-transformers/all-MiniLM-L6-v2

This is a [sentence-transformers](https://www.SBERT.net) model finetuned from [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2). It maps sentences & paragraphs to a 384-dimensional dense vector space and can be used for semantic textual similarity, semantic search, paraphrase mining, text classification, clustering, and more.

## Model Details

### Model Description
- **Model Type:** Sentence Transformer
- **Base model:** [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) <!-- at revision c9745ed1d9f207416be6d2e6f8de32d1f16199bf -->
- **Maximum Sequence Length:** 256 tokens
- **Output Dimensionality:** 384 dimensions
- **Similarity Function:** Cosine Similarity
<!-- - **Training Dataset:** Unknown -->
<!-- - **Language:** Unknown -->
<!-- - **License:** Unknown -->

### Model Sources

- **Documentation:** [Sentence Transformers Documentation](https://sbert.net)
- **Repository:** [Sentence Transformers on GitHub](https://github.com/UKPLab/sentence-transformers)
- **Hugging Face:** [Sentence Transformers on Hugging Face](https://huggingface.co/models?library=sentence-transformers)

### Full Model Architecture

```
SentenceTransformer(
  (0): Transformer({'max_seq_length': 256, 'do_lower_case': False}) with Transformer model: BertModel 
  (1): Pooling({'word_embedding_dimension': 384, 'pooling_mode_cls_token': False, 'pooling_mode_mean_tokens': True, 'pooling_mode_max_tokens': False, 'pooling_mode_mean_sqrt_len_tokens': False, 'pooling_mode_weightedmean_tokens': False, 'pooling_mode_lasttoken': False, 'include_prompt': True})
  (2): Normalize()
)
```

## Usage

### Direct Usage (Sentence Transformers)

First install the Sentence Transformers library:

```bash
pip install -U sentence-transformers
```

Then you can load this model and run inference.
```python
from sentence_transformers import SentenceTransformer

# Download from the 🤗 Hub
model = SentenceTransformer("sentence_transformers_model_id")
# Run inference
sentences = [
    'HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 3256912940\nPaciente: Albert Comas Pacheco  \nEdad: 32 años  \nID.Acc: ANSR0040101006\nPrescripciones  \nID.Rep: 320d297fb07d46a1857e3198\tAmoxicilina 500 mg\t1\t1 cada cada 8 hores\t05-03-2024\t10-03-2024  \nID.Rec: 1457921885109  \nNº Colegiado: 283849102',
    'HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 9960576708\nPaciente: Albert Comas Pacheco  \nEdad: 32 años  \nID.Acc: ANSR0040101006\nPrescripciones  \nID.Rep: cffdde0c6457439e88df8384\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t05-03-2024\t10-03-2024  \nID.Rec: 1306019344002  \nNº Colegiado: 289301842',
    'HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 5863901502\nPaciente: Maria García López  \nEdad: 28 años  \nID.Acc: ANSR0040101006\nPrescripciones  \nID.Rep: 233e4e0411cd4391bae2dc77\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t05-03-2024\t10-03-2024  \nID.Rec: 9104126083440  \nNº Colegiado: 282947918',
]
embeddings = model.encode(sentences)
print(embeddings.shape)
# [3, 384]

# Get the similarity scores for the embeddings
similarities = model.similarity(embeddings, embeddings)
print(similarities.shape)
# [3, 3]
```

<!--
### Direct Usage (Transformers)

<details><summary>Click to see the direct usage in Transformers</summary>

</details>
-->

<!--
### Downstream Usage (Sentence Transformers)

You can finetune this model on your own dataset.

<details><summary>Click to expand</summary>

</details>
-->

<!--
### Out-of-Scope Use

*List how the model may foreseeably be misused and address what users ought not to do with the model.*
-->

<!--
## Bias, Risks and Limitations

*What are the known or foreseeable issues stemming from this model? You could also flag here known failure cases or weaknesses of the model.*
-->

<!--
### Recommendations

*What are recommendations with respect to the foreseeable issues? For example, filtering explicit content.*
-->

## Training Details

### Training Dataset

#### Unnamed Dataset

* Size: 100 training samples
* Columns: <code>sentence_0</code>, <code>sentence_1</code>, and <code>label</code>
* Approximate statistics based on the first 100 samples:
  |         | sentence_0                                                                            | sentence_1                                                                            | label                                                         |
  |:--------|:--------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------|:--------------------------------------------------------------|
  | type    | string                                                                                | string                                                                                | float                                                         |
  | details | <ul><li>min: 120 tokens</li><li>mean: 177.48 tokens</li><li>max: 229 tokens</li></ul> | <ul><li>min: 121 tokens</li><li>mean: 159.34 tokens</li><li>max: 229 tokens</li></ul> | <ul><li>min: 0.0</li><li>mean: 0.5</li><li>max: 1.0</li></ul> |
* Samples:
  | sentence_0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | sentence_1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | label            |
  |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|
  | <code>HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE<br>ID Hoja Información: 7257763992<br>Paciente: Albert Comas Pacheco  <br>Edad: 67 años  <br>ID.Acc: COPA0030201003<br>Prescripciones  <br>ID.Rep: 06e43ddb1e004196ac6afc89	Amoxicilina 500 mg	1	1 cada cada 8 hores	05-03-2024	10-03-2024  <br>ID.Rec: 3993078378325  <br>Nº Colegiado: 284309541</code>                                                                                                                                                                                                                                                                                                                                                                      | <code>HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE<br>ID Hoja Información: 1405921208<br>Paciente: Anna Sánchez Ruiz  <br>Edad: 28 años  <br>ID.Acc: ANSR0040101006<br>Prescripciones  <br>ID.Rep: 1d4b4782402448e3aad347c3	LEXCEMA 0,1% 800 CREMA	1	1 aplicació cada 24 hores	05-03-2024	10-03-2024  <br>ID.Rec: 3329171135521  <br>Nº Colegiado: 284309541</code>                                                                                                                                                                                                                                                                                                                                                              | <code>0.0</code> |
  | <code>Salut Generalitat de Catalunya<br><br>Pla de medicació<br><br>Joan Pérez Martínez<br>COPA0030201003<br><br>Informació per a la farmàcia<br><br>Tractaments de curta durada<br>Medicament o producte sanitari	Dosi, freqüència	Durada	Prescripció	Vigència	Comentaris<br>Ibuprofeno 600 mg	1 comprimit cada 6 hores	5 dies	V.MORILLAS	07/01/2025 al 08/07/2025	DERMATOLOGIA Hospital de Mataró<br><br>El cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.<br>Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut<br>Per al bé de tothom, fem un ús responsable de la medicació.<br></code> | <code>Salut Generalitat de Catalunya<br><br>Pla de medicació<br><br>Joan Pérez Martínez<br>COPA0030201003<br><br>Informació per a la farmàcia<br><br>Tractaments de curta durada<br>Medicament o producte sanitari	Dosi, freqüència	Durada	Prescripció	Vigència	Comentaris<br>Amoxicilina 500 mg	1 càpsula cada 8 hores	7 dies	V.MORILLAS	07/01/2025 al 08/07/2025	DERMATOLOGIA Hospital de Mataró<br><br>El cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.<br>Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut<br>Per al bé de tothom, fem un ús responsable de la medicació.<br></code> | <code>1.0</code> |
  | <code>HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE<br>ID Hoja Información: 2215709536<br>Paciente: Joan Pérez Martínez  <br>Edad: 28 años  <br>ID.Acc: MAGL0020302004<br>Prescripciones  <br>ID.Rep: f0b58124455b42219cac01dc	LEXCEMA 0,1% 800 CREMA	1	1 aplicació cada 24 hores	05-03-2024	10-03-2024  <br>ID.Rec: 2452544151846  <br>Nº Colegiado: 283849102</code>                                                                                                                                                                                                                                                                                                                                                             | <code>HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE<br>ID Hoja Información: 2924045009<br>Paciente: Joan Pérez Martínez  <br>Edad: 28 años  <br>ID.Acc: MAGL0020302004<br>Prescripciones  <br>ID.Rep: 17bdf1b197aa4928a5db4739	Ibuprofeno 600 mg	1	1 cada cada 6 hores	05-03-2024	10-03-2024  <br>ID.Rec: 2956989117347  <br>Nº Colegiado: 283019822</code>                                                                                                                                                                                                                                                                                                                                                                       | <code>1.0</code> |
* Loss: [<code>CosineSimilarityLoss</code>](https://sbert.net/docs/package_reference/sentence_transformer/losses.html#cosinesimilarityloss) with these parameters:
  ```json
  {
      "loss_fct": "torch.nn.modules.loss.MSELoss"
  }
  ```

### Training Hyperparameters
#### Non-Default Hyperparameters

- `per_device_train_batch_size`: 4
- `per_device_eval_batch_size`: 4
- `num_train_epochs`: 4
- `multi_dataset_batch_sampler`: round_robin

#### All Hyperparameters
<details><summary>Click to expand</summary>

- `overwrite_output_dir`: False
- `do_predict`: False
- `eval_strategy`: no
- `prediction_loss_only`: True
- `per_device_train_batch_size`: 4
- `per_device_eval_batch_size`: 4
- `per_gpu_train_batch_size`: None
- `per_gpu_eval_batch_size`: None
- `gradient_accumulation_steps`: 1
- `eval_accumulation_steps`: None
- `torch_empty_cache_steps`: None
- `learning_rate`: 5e-05
- `weight_decay`: 0.0
- `adam_beta1`: 0.9
- `adam_beta2`: 0.999
- `adam_epsilon`: 1e-08
- `max_grad_norm`: 1
- `num_train_epochs`: 4
- `max_steps`: -1
- `lr_scheduler_type`: linear
- `lr_scheduler_kwargs`: {}
- `warmup_ratio`: 0.0
- `warmup_steps`: 0
- `log_level`: passive
- `log_level_replica`: warning
- `log_on_each_node`: True
- `logging_nan_inf_filter`: True
- `save_safetensors`: True
- `save_on_each_node`: False
- `save_only_model`: False
- `restore_callback_states_from_checkpoint`: False
- `no_cuda`: False
- `use_cpu`: False
- `use_mps_device`: False
- `seed`: 42
- `data_seed`: None
- `jit_mode_eval`: False
- `use_ipex`: False
- `bf16`: False
- `fp16`: False
- `fp16_opt_level`: O1
- `half_precision_backend`: auto
- `bf16_full_eval`: False
- `fp16_full_eval`: False
- `tf32`: None
- `local_rank`: 0
- `ddp_backend`: None
- `tpu_num_cores`: None
- `tpu_metrics_debug`: False
- `debug`: []
- `dataloader_drop_last`: False
- `dataloader_num_workers`: 0
- `dataloader_prefetch_factor`: None
- `past_index`: -1
- `disable_tqdm`: False
- `remove_unused_columns`: True
- `label_names`: None
- `load_best_model_at_end`: False
- `ignore_data_skip`: False
- `fsdp`: []
- `fsdp_min_num_params`: 0
- `fsdp_config`: {'min_num_params': 0, 'xla': False, 'xla_fsdp_v2': False, 'xla_fsdp_grad_ckpt': False}
- `tp_size`: 0
- `fsdp_transformer_layer_cls_to_wrap`: None
- `accelerator_config`: {'split_batches': False, 'dispatch_batches': None, 'even_batches': True, 'use_seedable_sampler': True, 'non_blocking': False, 'gradient_accumulation_kwargs': None}
- `deepspeed`: None
- `label_smoothing_factor`: 0.0
- `optim`: adamw_torch
- `optim_args`: None
- `adafactor`: False
- `group_by_length`: False
- `length_column_name`: length
- `ddp_find_unused_parameters`: None
- `ddp_bucket_cap_mb`: None
- `ddp_broadcast_buffers`: False
- `dataloader_pin_memory`: True
- `dataloader_persistent_workers`: False
- `skip_memory_metrics`: True
- `use_legacy_prediction_loop`: False
- `push_to_hub`: False
- `resume_from_checkpoint`: None
- `hub_model_id`: None
- `hub_strategy`: every_save
- `hub_private_repo`: None
- `hub_always_push`: False
- `gradient_checkpointing`: False
- `gradient_checkpointing_kwargs`: None
- `include_inputs_for_metrics`: False
- `include_for_metrics`: []
- `eval_do_concat_batches`: True
- `fp16_backend`: auto
- `push_to_hub_model_id`: None
- `push_to_hub_organization`: None
- `mp_parameters`: 
- `auto_find_batch_size`: False
- `full_determinism`: False
- `torchdynamo`: None
- `ray_scope`: last
- `ddp_timeout`: 1800
- `torch_compile`: False
- `torch_compile_backend`: None
- `torch_compile_mode`: None
- `include_tokens_per_second`: False
- `include_num_input_tokens_seen`: False
- `neftune_noise_alpha`: None
- `optim_target_modules`: None
- `batch_eval_metrics`: False
- `eval_on_start`: False
- `use_liger_kernel`: False
- `eval_use_gather_object`: False
- `average_tokens_across_devices`: False
- `prompts`: None
- `batch_sampler`: batch_sampler
- `multi_dataset_batch_sampler`: round_robin

</details>

### Framework Versions
- Python: 3.13.1
- Sentence Transformers: 4.1.0
- Transformers: 4.51.3
- PyTorch: 2.6.0
- Accelerate: 1.6.0
- Datasets: 3.5.0
- Tokenizers: 0.21.1

## Citation

### BibTeX

#### Sentence Transformers
```bibtex
@inproceedings{reimers-2019-sentence-bert,
    title = "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    author = "Reimers, Nils and Gurevych, Iryna",
    booktitle = "Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing",
    month = "11",
    year = "2019",
    publisher = "Association for Computational Linguistics",
    url = "https://arxiv.org/abs/1908.10084",
}
```

<!--
## Glossary

*Clearly define terms in order to be accessible across audiences.*
-->

<!--
## Model Card Authors

*Lists the people who create the model card, providing recognition and accountability for the detailed work that goes into its construction.*
-->

<!--
## Model Card Contact

*Provides a way for people who have updates to the Model Card, suggestions, or questions, to contact the Model Card authors.*
-->