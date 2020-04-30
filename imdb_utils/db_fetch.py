from imdb import IMDb

from imdb_utils.constants import WatchableTypes
from imdb_utils.parsers import imdb_movie_to_title


class ImdbConnection:
    def __init__(self):
        self.__connection = None

    def connect(self):
        self.__connection = IMDb()

    def fetch_title_by_id(self, imdb_id):
        imdb_movie = self.__connection.get_movie(imdb_id)
        return imdb_movie_to_title(imdb_movie)

    def search_by_title(self, title, results=20):
        result = self.__connection.search_movie(title, results=results)
        available_types = WatchableTypes.list()
        movies = []
        for imdb_movie in result:
            if imdb_movie.get('kind') not in available_types:
                continue
            if imdb_movie.current_info != 'main':
                self.__connection.update(imdb_movie, 'main')
            movie = imdb_movie_to_title(imdb_movie)
            if movie:
                movies.append(movie)
        return movies
