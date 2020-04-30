from enum import Enum


class WatchableTypes(Enum):
    TV_SHOW = 'tv series'
    TV_MINI_SERIES = 'tv mini series'
    TV_MINISERIES = 'tv miniseries'
    MOVIE = 'movie'
    TV_MOVIE = 'tv movie'
    SHORT = 'short'
    TV_SHORT = 'tv short'

    @classmethod
    def list(cls):
        return list(e.value for e in cls)

    @classmethod
    def tv_show_types(cls):
        return (
            cls.TV_SHOW.value,
            cls.TV_MINI_SERIES.value,
            cls.TV_MINISERIES.value,
        )

    @classmethod
    def movie_types(cls):
        return (
            cls.MOVIE.value,
            cls.TV_MOVIE.value,
            cls.SHORT.value,
            cls.TV_SHORT.value,
        )
