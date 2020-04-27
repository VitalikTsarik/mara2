from subscriptions.models import TvShow, Movie
from datetime import timedelta

mapKindToType = {
    'tv series': TvShow,
    'tv mini series': TvShow,
    'movie': Movie,
    'tv movie': Movie,
    'short': Movie,
}
# ‘movie’, ‘tv series’, ‘tv mini series’, ‘video game’, ‘video movie’, ‘tv movie’, ‘episode’


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
    tv_show.years = imdb_movie.get('series years')
    return tv_show


def search_result(result):
    movies = []
    for imdb_movie in result:
        kind = imdb_movie.get('kind')
        watchable_type = mapKindToType.get(kind)
        if watchable_type:
            watchable = watchable_type()
            _set_watchable_props(watchable, imdb_movie)
            movies.append(watchable)
    return movies
