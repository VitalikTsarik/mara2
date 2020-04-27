from .watchable import Watchable


class Movie(Watchable):
    def __str__(self):
        return f'Movie {super().__str__()}'
