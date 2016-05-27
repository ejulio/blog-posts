import numpy as np
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.multiclass import OneVsOneClassifier
from sklearn.svm import SVC
from sklearn import cross_validation
from sklearn.metrics import confusion_matrix
import argparse

# data
categories = ['alt.atheism', 'soc.religion.christian', 
	'comp.graphics', 'sci.med']
dataset = fetch_20newsgroups(subset = 'train', categories = categories,
	shuffle = True, random_state = 42)

# classifier: one vs one SVM
classifier = OneVsOneClassifier(SVC(kernel = 'rbf', random_state = 84))

# features: tokenizer & tf-idf
count_vector = CountVectorizer()
tfidf = TfidfTransformer()

def fit_classifier(train_data, train_labels):
	# count_vector = CountVectorizer(stop_words = 'english', ngram_range = (1, 1))
	train_counts = count_vector.fit_transform(train_data)
	train_tfidf = tfidf.fit_transform(train_counts)
	classifier.fit(train_tfidf, train_labels)

def predict(test_data):
	test_counts = count_vector.transform(test_data)
	test_tfidf = tfidf.transform(test_counts)
	return classifier.predict(test_tfidf)

def run_confusion_matrix():
	print("confusion matrix")

	# split the data into train and test
	train_data, test_data, train_labels, test_labels = cross_validation.train_test_split(
		dataset.data, dataset.target, test_size = 0.1, random_state = 10)

	fit_classifier(train_data, train_labels)
	predicted = predict(test_data)
	# 0 = alt.atheism, 1 = comp.graphics, 2 = sci.med, 3 = soc.religion.christian
	print(confusion_matrix(test_labels, predicted, labels = [0, 1, 2, 3]))


def run_cross_validation():
	print("cross validation")

	test_counts = count_vector.fit_transform(dataset.data)
	test_tfidf = tfidf.fit_transform(test_counts)
	
	scores = cross_validation.cross_val_score(classifier, test_tfidf, 
		dataset.target, cv = 5)
	print(scores)
	print("Accuracy: {} +/- {}".format(scores.mean(), scores.std() * 2))

def run_example(text):
	print("Classifying {}".format(text))

	fit_classifier(dataset.data, dataset.target)
	category = predict([text])
	print("Classified as {}".format(dataset.target_names[category]))

ap = argparse.ArgumentParser()
ap.add_argument("-cm", "--confusion-matrix", type = bool,
	help = "Show confusion matrix example")
ap.add_argument("-cv", "--cross-validation", type = bool,
	help = "Run k-fold cross validation")
ap.add_argument("-e", "--example",
	help = "Classify the given text")
args = vars(ap.parse_args())

if args.get("confusion_matrix"):
	run_confusion_matrix()
elif args.get("cross_validation"):
	run_cross_validation()
elif args.get("example") != None:
	run_example(args["example"])
else:
	print("I don't know what to do!")