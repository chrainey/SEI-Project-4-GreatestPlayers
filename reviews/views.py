from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .serializers.common import ReviewSerializer
from .models import Review

# Create your views here.

class ReviewListView(APIView):
  
  def post(self, request):
    review_to_create = ReviewSerializer(data=request.data)
    
    try:
      review_to_create.is_valid(True)
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e, review_to_create.e, 'errors') 
      return Response("FAILED", review_to_create.e, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, request):
    reviews = Review.objects.all()
    print("reviews ->", reviews)
    serialized_reviews = ReviewSerializer(reviews, many=True)
    print(serialized_reviews)

    return Response(serialized_reviews.data, status=status.HTTP_200_OK)

class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_review(self, pk):
    try:
      return Review.objects.get(pk=pk)
    except Review.DoesNotExist:
      raise NotFound("Review not found!")

  def delete(self, request, pk):
    review_to_delete = self.get_review(pk)
    print("REVIEW OWNER ID ->", review_to_delete.owner)
    print("REQUEST.USER ->", request.user)
    if review_to_delete.owner != request.user or request.user.is_superuser:
      raise PermissionDenied("Unauthorised")
    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    review_to_update = self.get_review(pk=pk)
    updated_review = ReviewSerializer(review_to_update, data=request.data)
    try:
      updated_review.is_valid(True)
      updated_review.save()
      return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print("error ->", e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
