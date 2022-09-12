from .common import PlayerSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from clubs.serializers.common import ClubSerializer

class PopulatedPlayerSerializer(PlayerSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  clubs = ClubSerializer(many=True)
