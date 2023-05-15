from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
    
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from textblob import TextBlob


def MainView(request, movie):
    movies = pd.read_csv('ml-latest-small/movies.csv')
    ratings = pd.read_csv('ml-latest-small/ratings.csv')
    data = pd.merge(ratings, movies, on='movieId')
    pivot_table = data.pivot_table(index='movieId', columns='userId', values='rating').fillna(0)
    sparse_matrix = csr_matrix(pivot_table.values)
    model = NearestNeighbors(metric='cosine', algorithm='brute')
    model.fit(sparse_matrix)
    toy_story_id = movies[movies['title'] == movie]['movieId'].iloc[0]
    toy_story_index = pivot_table.index.get_loc(toy_story_id)
    distances, indices = model.kneighbors(pivot_table.iloc[toy_story_index, :].values.reshape(1, -1), n_neighbors=11)
    similar_movies = []
    for index in indices.flatten()[1:]:
        movie_title = movies[movies['movieId'] == pivot_table.iloc[index].name]['title'].iloc[0]
        similar_movies.append(movie_title)

    response_data = {'movies': similar_movies}
    return JsonResponse(response_data)

def CommentAnalyzer(request, my_comment):
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()

    def preprocess_comment(comment):
        words = word_tokenize(comment.lower())
        words = [word for word in words if word not in stop_words]
        words = [lemmatizer.lemmatize(word) for word in words]
        comment = ' '.join(words)
        return comment
    
    def sentiment_to_rating(sentiment):
        if sentiment > 0:
            return 5
        elif sentiment == 0:
            return 3.5
        else:
            return 1

    comments = [my_comment]
    preprocessed_comments = [preprocess_comment(comment) for comment in comments]
    sentiments = [TextBlob(comment).sentiment.polarity for comment in preprocessed_comments]
    ratings_predicted = [sentiment_to_rating(sentiment) for sentiment in sentiments]
    response_data = {"ratings": ratings_predicted}
    return JsonResponse(response_data, safe=False)
