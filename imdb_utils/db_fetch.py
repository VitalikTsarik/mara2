from imdb import IMDb

from imdb_utils.parsers import search_result, imdb_movie_to_tv_show


class ImdbConnection:
    def __init__(self):
        self.__connection = None

    def connect(self):
        self.__connection = IMDb()

    def fetch_tv_show_by_id(self, imdb_id):
        return imdb_movie_to_tv_show(self.__connection.get_movie(imdb_id))

    def search_by_title(self, title):
        return search_result(self.__connection.search_movie(title))