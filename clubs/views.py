from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedClubSerializer
from .models import Club

# Create your views here.

class ClubListView(APIView):

  def get(self, _request):
    clubs = Club.objects.all()
    serialized_clubs = PopulatedClubSerializer(clubs, many=True)
    return Response(serialized_clubs.data)