import pickle
import numpy as np
from tensorflow.keras.models import load_model

def get_class_label(preprocessed_sequence, model_file, encoder_file):
    # Load the trained model
    model = load_model(model_file)
    
    # Load the label encoder
    with open(encoder_file, 'rb') as handle:
        encoder = pickle.load(handle)
    
    # Convert the sequence to a numpy array
    input_sequence = np.array(preprocessed_sequence)
    
    # Reshape the input to match the model's input shape
    input_sequence = input_sequence.reshape(1, -1)
    
    # Predict the class label
    prediction = model.predict(input_sequence)
    
    return prediction[0][0]