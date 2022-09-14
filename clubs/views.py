from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.populated import PopulatedClubSerializer
from .models import Club

# Create your views here.

class ClubListView(APIView):

  def get(self, _request):
    clubs = Club.objects.all()
    serialized_clubs = PopulatedClubSerializer(clubs, many=True)
    return Response(serialized_clubs.data)

class ClubDetailView(APIView):
  def get_club(self, pk):
    try:
      return Club.objects.get(pk=pk)
    except Club.DoesNotExist:
      raise NotFound(detail="Club not found!")

  def get(self, _request, pk):
    player =self.get_club(pk=pk)
    serialized_club = PopulatedClubSerializer(player)
    return Response(serialized_club.data)