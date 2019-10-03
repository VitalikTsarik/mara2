from imdb import IMDb
from .parsers import imdb_movie_to_tv_show


# todo: implement factory ImdbFactory (?)
def get_tv_show_by_imdb_id(imdb_id):
    return imdb_movie_to_tv_show(IMDb().get_movie(imdb_id))


def get_tv_show_by_title(title):
    pass
