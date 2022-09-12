from .common import ClubSerializer
from players.serializers.common import PlayerSerializer

class PopulatedClubSerializer(ClubSerializer):
  players = PlayerSerializer(many=True)