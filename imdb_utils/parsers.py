from subscriptions.models import TvShow, Watchable
from datetime import timedelta


def set_watchable_props(watchable, imdb_movie):
    watchable.title = imdb_movie.get('title')
    runtime = imdb_movie.get('runtimes')[0]
    watchable.runtime = timedelta(minutes=int(runtime))
    watchable.genres = ', '.join(imdb_movie.get('genres'))
    watchable.year = str(imdb_movie.get('year'))
    watchable.imdb_id = int(imdb_movie.movieID)
    watchable.poster_url = imdb_movie.get('cover url')


def imdb_movie_to_tv_show(imdb_movie):
    tv_show = TvShow()
    set_watchable_props(tv_show, imdb_movie)
    tv_show.seasons = imdb_movie.get('number of seasons')
    tv_show.years = imdb_movie.get('series years')
    return tv_show


def search_result(result):
    movies = []
    for imdb_movie in result:
        watchable = Watchable()
        watchable.year = str(imdb_movie.get('year'))
        watchable.poster_url = imdb_movie.get('cover url')
        movies.append(watchable)
    return movies
