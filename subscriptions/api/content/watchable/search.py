from rest_framework.response import Response
from rest_framework.views import APIView

from imdb_utils.db_fetch import ImdbConnection
from subscriptions.models import Movie, Watchable
from subscriptions.serializers import WatchableSearchSerializer

SEARCH_RESULTS = 5


class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        title = request.GET.get('q', '')
        chunk = int(request.GET.get('chunk', 1))

        result = self.search(title, chunk)
        watchables = []
        for item in result:
            try:
                watchable = Movie.manager.get(imdb_id=item.imdb_id)
            except Watchable.DoesNotExist:
                item.save()
                watchable = Movie.manager.get(imdb_id=item.imdb_id)
            watchables.append(watchable)

        serializer = WatchableSearchSerializer(watchables, many=True)
        return Response(serializer.data)

    @staticmethod
    def search(title, chunk):
        connection = ImdbConnection()
        connection.connect()

        results = SEARCH_RESULTS * chunk
        last_results = 0
        while True:
            result = connection.search_by_title(title, results)
            results += SEARCH_RESULTS
            if len(result) >= SEARCH_RESULTS * chunk or len(result) == last_results:
                break
            last_results = len(result)

        last_chunk = result[-SEARCH_RESULTS:]
        return last_chunk
