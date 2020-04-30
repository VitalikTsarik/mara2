from rest_framework.response import Response
from rest_framework.views import APIView

from imdb_utils.db_fetch import ImdbConnection
from subscriptions.models import Movie, Watchable
from subscriptions.serializers import TitleSearchSerializer

CHUNK_SIZE = 5


class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        title = request.GET.get('q', '')
        chunk = int(request.GET.get('chunk', 1))

        result = self.search(title, chunk)
        titles = []
        for item in result:
            try:
                watchable = Movie.titles.get(imdb_id=item.imdb_id)
            except Watchable.DoesNotExist:
                item.save()
                watchable = Movie.titles.get(imdb_id=item.imdb_id)
            titles.append(watchable)

        serializer = TitleSearchSerializer(titles, many=True)
        return Response(serializer.data)

    @staticmethod
    def search(title, chunks):
        connection = ImdbConnection()
        connection.connect()

        results = CHUNK_SIZE * chunks
        last_results = 0
        while True:
            result = connection.search_by_title(title, results)
            results += CHUNK_SIZE

            if len(result) > CHUNK_SIZE * chunks:
                diff = len(result) - CHUNK_SIZE * chunks
                chunk = result[-(CHUNK_SIZE + diff):-diff]
                break
            elif len(result) == CHUNK_SIZE * chunks:
                chunk = result[-CHUNK_SIZE:]
                break

            if len(result) == last_results:
                chunk = []
                break
            last_results = len(result)

        return chunk
