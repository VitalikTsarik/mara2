from datetime import timedelta

from imdb_utils.constants import WatchableTypes
from subscriptions.models import TvShow, Movie


def _set_watchable_props(watchable, imdb_movie):
    watchable.title = imdb_movie.get('title')
    runtimes = imdb_movie.get('runtimes')
    if runtimes:
        runtime = runtimes[0]
        watchable.runtime = timedelta(minutes=int(runtime))
    genres = imdb_movie.get('genres')
    if genres:
        watchable.genres = ', '.join(genres)
    watchable.year = str(imdb_movie.get('year'))
    watchable.imdb_id = int(imdb_movie.movieID)
    watchable.preview_poster_url = imdb_movie.get('cover url')
    watchable.poster_url = imdb_movie.get('full-size cover url')


def imdb_movie_to_tv_show(imdb_movie):
    tv_show = TvShow()
    _set_watchable_props(tv_show, imdb_movie)
    tv_show.seasons = imdb_movie.get('number of seasons')
    tv_show.years = imdb_movie.get('series years', '')
    return tv_show


def imdb_movie_to_movie(imdb_movie):
    movie = Movie()
    _set_watchable_props(movie, imdb_movie)
    return movie


def imdb_movie_to_title(imdb_movie):
    kind = imdb_movie.get('kind')
    if kind in WatchableTypes.tv_show_types():
        return imdb_movie_to_tv_show(imdb_movie)
    elif kind in WatchableTypes.movie_types():
        return imdb_movie_to_movie(imdb_movie)
    else:
        return None
