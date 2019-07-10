from imdb import Movie as ImdbMovie

from subscriptions.models import Watchable, TvShow


def _imdb_movie_to_watchable(imdb_movie: ImdbMovie) -> Watchable:
    watchable = Watchable(imdb_id=imdb_movie['title'])
    watchable.runtime = imdb_movie['runtimes'][0]
    watchable.genres = ', '.join(imdb_movie['genres'])
    watchable.year = str(imdb_movie['year'])
    watchable.imdb_id = int(imdb_movie.movieID)
    watchable.poster_url = imdb_movie['cover url']
    return watchable


def imdb_movie_to_tv_show(imdb_movie: ImdbMovie):
    tv_show = _imdb_movie_to_watchable(imdb_movie)
    tv_show.__class__ = TvShow

    tv_show.seasons = imdb_movie['number of seasons']
    tv_show.years = imdb_movie['series years']
    return tv_show

