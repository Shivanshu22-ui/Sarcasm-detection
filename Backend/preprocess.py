import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
import pickle
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

    stemmer = PorterStemmer()
    sentence = [stemmer.stem(word) for word in sentence.split()]
    #sentence = " ".join(sentence)

    with open(tokenizer_file, 'rb') as handle:
        tokenizer = pickle.load(handle)
    tokens = tokenizer.texts_to_sequences([sentence])

    return tokens[0]

#pad sequence
def pad_sequences(tokens):
    padded_tokens = tokens + [0]*(25-len(tokens))
    return padded_tokens

#preprocess the sentence
def preprocess(sentence):
    preprocessed_Sentence = remove_url(sentence)
    #print(preprocessed_Sentence)
    preprocessed_Sentence = remove_html(preprocessed_Sentence)
    #print(preprocessed_Sentence)
    preprocessed_Sentence = remove_punc(preprocessed_Sentence)
    #print(preprocessed_Sentence)
    preprocessed_Sentence = remove_stopwords(preprocessed_Sentence)
    #print(preprocessed_Sentence)
    preprocessed_Sentence = stem_sentence(preprocessed_Sentence,'../Tokenizers/tokenizer.pickle')
    #print(preprocessed_Sentence)
    preprocessed_Sentence = pad_sequences(preprocessed_Sentence)
    #print(len(preprocessed_Sentence))
    return preprocessed_Sentence
