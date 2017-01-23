#!/usr/bin/python

import json
import operator 
import unirest 
from settings import MASHAPE_KEY

class NLPtext: 
	def __init__(self,raw,stopwords): 
		self.raw = raw 
		self.stop = stopwords
		self.clean = self.strip() # raw string without punctuation and lower-cased
		self.util = self.drop() # clean string without stop words 
		self.parsed = "" # raw string with parts of speech annotations 
		self.grams = {} # ngram counts 
		self.sent = {} # sentiment analysis results 
		self.tag = {} # parts of speech (tags) analysis results 

	def strip(self,symbols=None):
		if(symbols==None or len(symbols)==0):
			symbols = ['.',',',':',';','--','','`',"'",'"']

		result = self.raw
		for i in range(len(symbols)):
			result = result.replace(symbols[i], "")

		return result.lower() 

	def drop(self): 
		result = self.clean
		for i in range(len(self.stop)):
			result = result.replace(" "+self.stop[i]+" ", " ") 
		return result 

	def ngram(self,n):
		if n in self.grams:
			return self.grams[n]

		string = self.util.split(" ") if n<=2 else self.clean.split(" ")
		grams = {} 

		for i in range(len(string)): 
			word = string[i] 
			if i+n-1>=len(string):
				continue 

			gram = ""
			for j in range(n):
				gram += string[i+j]+" "
			gram = gram[:-1] 

			if not gram in grams: 
				grams[gram] = 0
			grams[gram] += 1

		self.grams[n] = sorted(grams.items(), key=operator.itemgetter(1))[::-1]
		return self.grams[n] 

	def sentiment(self):
		if(len(self.sent.keys())>0):
			return self.sent

		response = unirest.post("https://japerk-text-processing.p.mashape.com/sentiment/",
		  headers={
		    "X-Mashape-Key": MASHAPE_KEY,
		    "Content-Type": "application/x-www-form-urlencoded",
		    "Accept": "application/json"
		  },
		  params={
		    "language": "english",
		    "text": self.raw
		  }
		)

		self.sent = response.body["probability"]
		return self.sent 

	def parts_of_speech(self): 
		return self.tags

class Speech: 
	def __init__(self): 
		self.author = {} 
		self.speech = {} 

	def add_author(self,first_name,last_name):
		self.author["first"] = first_name 
		self.author["last"] = last_name 

	def add_meta(self,title,datetime):
		self.speech["title"] = title
		self.speech["datetime"] = datetime

	def add_text(self,text_type,text_objects): 
		self.speech[text_type] = text_objects

	def JSON(self): 
		obj = {
			"author": self.author, 
			"speech": self.speech
		}
		return json.dumps(obj) 

	@staticmethod
	def objectify(text,stopwords): 
		text = NLPtext(text,stopwords) 
		obj = {} 
		obj["text"] = text.raw
		obj["ngrams"] = {} 
		obj["ngrams"][1] = text.ngram(1) 
		obj["ngrams"][2] = text.ngram(2) 
		obj["ngrams"][3] = text.ngram(3) 
		obj["sentiment"] = text.sentiment() 
		return obj 

def load(fname):
	result = None
	with open(fname) as json_data:
		result = json.load(json_data)
	return result

def process_speech(author_first,author_last,title,datetime,filename,stopwords):
	text = load(filename) 
	speech = Speech() 
	speech.add_author(author_first,author_last)
	speech.add_meta(title,datetime)

	types = ["transcript","paragraphs","sentences"]
	for t in types:
		arr = []
		for i in text[t]:
			arr.append(Speech.objectify(i,stopwords))
		speech.add_text(t,arr)

	return speech
	# arr = [] 
	
	# speech.add_text("transcript",arr)

	# arr = []
	# for paragraph in text["paragraphs"]

def main():

	obj = {
		"data": []
	}


	stopwords = load("english.stop.json")["stopwords"]

	# trump 
	# https://www.nytimes.com/interactive/2017/01/20/us/politics/donald-trump-inauguration-speech-transcript.html
	speech = process_speech("Donald","Trump","Inauguration Speech",1484910000,"text/trump.speech.json",stopwords)
	obj["data"].append(speech.JSON())  

	# obama 
	# https://obamawhitehouse.archives.gov/blog/2009/01/21/president-barack-obamas-inaugural-address
	speech = process_speech("Barack","Obama","Inauguration Speech",1232535600,"text/obama.speech.json",stopwords)
	obj["data"].append(speech.JSON()) 

	print obj 

main() 
