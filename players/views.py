from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Player
from .serializers.common import PlayerSerializer
from .serializers.populated import PopulatedPlayerSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.

class PlayerListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request):
    players = Player.objects.all()
    print("players ->", players)
    serialized_players = PopulatedPlayerSerializer(players, many=True)
    print(serialized_players)

    return Response(serialized_players.data, status=status.HTTP_200_OK)

  def post(self, request):
    print('request data ->', request.data)
    player_to_add = PlayerSerializer(data=request.data)
    try:
      player_to_add.is_valid(True)
      print(player_to_add.validated_data)
      player_to_add.save()
      return Response(player_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('ERROR')
      return Response({"detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class PlayerDetailView(APIView):

  def get_player(self, pk):
    try:
      return Player.objects.get(pk=pk)
    except Player.DoesNotExist:
      raise NotFound(detail="Player not found!")

  def get(self, _request, pk):
    player =self.get_player(pk=pk)
    serialized_player = PopulatedPlayerSerializer(player)
    return Response(serialized_player.data)

  def delete(self, _request, pk):
    player_to_delete = self.get_player(pk=pk)
    player_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    player_to_update = self.get_player(pk=pk)
    updated_player = PlayerSerializer(player_to_update, data=request.data)
    try:
      updated_player.is_valid(True)
      updated_player.save()
      return Response(updated_player.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print('error ->', e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
