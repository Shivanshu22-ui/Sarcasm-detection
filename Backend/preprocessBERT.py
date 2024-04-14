import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
import pickle
import numpy as np
import torch
from transformers import BertTokenizer
#from keras.preprocessing.sequence import pad_sequences

nltk.download('punkt')
nltk.download('stopwords')
stop = set(stopwords.words("english"))


#to remove URL from data record
def remove_url(text):
  url = re.compile(r"https?://\S+|www\.\S+")
  return url.sub(r"",text)

#to remove code snippets from data record
def remove_html(text):
  html = re.compile(r"<.*?>")
  return html.sub(r"",text)

#remove punctuation from data record exept hashtags
def remove_punc(text):
  table=str.maketrans("","",string.punctuation.replace("#", ""))
  return text.translate(table)

#remove stopwords from data records
def remove_stopwords(text):
  text = [word.lower() for word in text.split() if word.lower() not in stop]
  return " ".join(text)

#stemming and tokenizing
def stem_sentence(sentence,tokenizer_file):

    with open(tokenizer_file, 'rb') as handle:
        tokenizer = pickle.load(handle)

    text = sentence.lower().strip()
    inputs = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        return_attention_mask=True,
        return_token_type_ids=False,
        max_length=27,
        pad_to_max_length=True,
        truncation=True,
        return_tensors='tf'
    )

    return {
        'input_ids': np.array(inputs['input_ids']),
        'attention_mask': np.array(inputs['attention_mask'])
    }


#preprocess the sentence
def preprocessBERT(sentence):
    preprocessed_Sentence = remove_url(sentence)
    preprocessed_Sentence = remove_html(preprocessed_Sentence)
    preprocessed_Sentence = remove_punc(preprocessed_Sentence)
    preprocessed_Sentence = remove_stopwords(preprocessed_Sentence)
    bert_inputs = stem_sentence(preprocessed_Sentence,'../Tokenizers/tokenizerBERT.pickle')

    return bert_inputs