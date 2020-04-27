from imdb import IMDb

from imdb_utils.parsers import search_result, imdb_movie_to_tv_show

TV_SHOW = 'tv series'


class ImdbConnection:
    def __init__(self):
        self.__connection = None

    def connect(self):
        self.__connection = IMDb()

    def fetch_tv_show_by_id(self, imdb_id):
        imdb_movie = self.__connection.get_movie(imdb_id)
        if imdb_movie.get('kind') == TV_SHOW:
            return imdb_movie_to_tv_show(imdb_movie)
        return None

    def search_by_title(self, title, results=20):
        return search_result(self.__connection.search_movie(title, results=results))
