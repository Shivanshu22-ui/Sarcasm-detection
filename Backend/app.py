import json
from flask import Flask, request, jsonify
# from preprocess import preprocess
# from model_lstm import get_class_label
# from preprocessBERT import preprocessBERT
# # from model_bert import get_class_label_bert
# from model_cnn import get_class_label_cnn
from flask_cors import CORS
import pickle
import pandas as pd
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re
from tensorflow.keras.utils import pad_sequences


app = Flask(__name__)
CORS(app)


labels = []
sentences = []


#get classification from the model
def getClassification(sentence):
    return "sarcasm"


def clean_text(text):
    text = text.lower()
    
    pattern = re.compile('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    text = pattern.sub('', text)
    text = " ".join(filter(lambda x:x[0]!='@', text.split()))
    emoji = re.compile("["
                           u"\U0001F600-\U0001FFFF"  # emoticons
                           u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                           u"\U0001F680-\U0001F6FF"  # transport & map symbols
                           u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           u"\U00002702-\U000027B0"
                           u"\U000024C2-\U0001F251"
                           "]+", flags=re.UNICODE)
    
    text = emoji.sub(r'', text)
    text = text.lower()
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"that's", "that is", text)        
    text = re.sub(r"what's", "what is", text)
    text = re.sub(r"where's", "where is", text) 
    text = re.sub(r"\'ll", " will", text)  
    text = re.sub(r"\'ve", " have", text)  
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"\'d", " would", text)
    text = re.sub(r"\'ve", " have", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"don't", "do not", text)
    text = re.sub(r"did't", "did not", text)
    text = re.sub(r"can't", "can not", text)
    text = re.sub(r"it's", "it is", text)
    text = re.sub(r"couldn't", "could not", text)
    text = re.sub(r"have't", "have not", text)
    text = re.sub(r"[,.\"\'!@#$%^&*(){}?/;`~:<>+=-]", "", text)
    return text

def CleanTokenize(df):
    head_lines = list()
    lines = df["headline"].values.tolist()

    for line in lines:
        line = clean_text(line)
        # tokenize the text
        tokens = word_tokenize(line)
        # remove puntuations
        table = str.maketrans('', '', string.punctuation)
        stripped = [w.translate(table) for w in tokens]
        # remove non alphabetic characters
        words = [word for word in stripped if word.isalpha()]
        stop_words = set(stopwords.words("english"))
        # remove stop words
        words = [w for w in words if not w in stop_words]
        head_lines.append(words)
    return head_lines


@app.route("/getClass", methods=['POST'])
def home():
    payload = request.get_json()
    sentences = payload['sentences']
    
    tokenizer_file = 'F:\BE_Project\project\Frontend\Backend\Tokenizer.pickle'
    model_file = 'F:\BE_Project\project\Frontend\Backend\model.pickle'
    # F:\BE_Project\project\Frontend\Backend\sarcasm.pickle
# C:\\Users\\Admin\\Downloads\\FYP_IIT-master\\FYP_IIT-master\\Backend\\sarcasm.pickle
    
    print(sentences,"sentences")
    
    with open(model_file, 'rb') as handle:
        print("file loaded", handle)
        model = pickle.load(handle)
        print(model)
        print("----------------------------------------------------------")

    with open(tokenizer_file, 'rb') as handle:
        print("file loaded", handle)
        tokenizer_obj = pickle.load(handle)
        
    response_data = []
    print(sentences)
    for sentence in sentences:
        print("----------------------------------------------------------")

        x_final = pd.DataFrame({"headline":[sentence]})
        test_lines = CleanTokenize(x_final)
        test_sequences = tokenizer_obj.texts_to_sequences(test_lines)
        test_review_pad = pad_sequences(test_sequences, maxlen=25, padding='post')
        pred = model.predict(test_review_pad)
        pred*=100
        if pred[0][0]>=50:
            result = "It's a sarcasm!" 
        else:
            result = "It's not a sarcasm."

        print("----------------------------------------------------------")
        data = {
            "sentence": sentence,
            "result": result
        }
        
        response_data.append(data)
        
    print(response_data,"response data")
    return response_data, 200

# @app.route("/getClass", methods=['POST'])
# def home():
#     payload = request.get_json()
#     sentence = payload['sentences']
    
#     print(sentence)
#     print(type(sentence))

#     # sentence = json.loads(sentence)
#     # print(sentence[0])
#     labels = []
#     for line in sentence:
#         print(line)
    

#     # sentence = request.get_json()['sentence']
#     # sentence = ""

#     #preprocess sentence for both models
#         preprocess_sentence_lstm = preprocess(line)
#         print("output for model")
#         preprocess_sentence_cnn = preprocess(line)
#         preprocess_inputs_bert = preprocessBERT(line)
    
#     #get the output for both models
#         sarcasm_percentage_lstm = get_class_label(preprocess_sentence_lstm,"../Models/LSTMOptimized(1).h5","../Encoder/encoder_lstm.pickle")
#         sarcasm_percentage_cnn = get_class_label_cnn(preprocess_sentence_cnn,"../Models/CNNOptimized.h5","../Encoder/encoder_lstm.pickle")


#     # print('.')
#     # print('.')
#     # print('.')
#     # print('.')
#         print("LSTM:-",sarcasm_percentage_lstm)
#     # print('.')
#     # print('.')
#     # print('.')
#     # print('.')
#         print("CNN:-",sarcasm_percentage_cnn)

#         label = ''

#         lstm_weight = 0.5
#         cnn_weight = 0.5

#         weighted_avg = sarcasm_percentage_lstm*lstm_weight+sarcasm_percentage_cnn*cnn_weight
#         if(weighted_avg>=0.5):
#             label = 'Sarcasm'
#         else:
#             label = 'Regular'


#         labels.append({"sentence":line,"class":label})

#     # return {'labels':label, 'weight_avg':weighted_avg }, 200
#     return {'labels':labels,  }, 200


    


if __name__ == '__main__':
    app.run(debug=True)
