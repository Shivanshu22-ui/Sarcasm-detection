from flask import Flask, jsonify, request
import numpy as np
import pickle
import tensorflow as tf
from transformers import AutoTokenizer, TFAutoModel
from keras.models import load_model
from keras.utils import custom_object_scope

custom_objects = {'TFBertModel': TFAutoModel.from_pretrained('bert-base-uncased').__class__}

with custom_object_scope(custom_objects):
    model = load_model("../Models/bert_model.h5")

def get_class_label_bert(preprocessed_sequence):
    prediction = model.predict(preprocessed_sequence)[0][0]
    result = {'prediction': float(prediction)}
    # print("#####",prediction,"##########")
    return prediction

