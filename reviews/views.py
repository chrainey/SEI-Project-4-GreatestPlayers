from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer
from .models import Review

# Create your views here.

class ReviewListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  
  def post(self, request):
    request.data['owner'] = request.user.id
    review_to_create = ReviewSerializer(data=request.data)
    
    try:
      review_to_create.is_valid(True)
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e, 'errors') 
      return Response("FAILED", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, request):
    reviews = Review.objects.all()
    print("reviews ->", reviews)
    serialized_reviews = ReviewSerializer(reviews, many=True)
    # print(serialized_reviews)

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
    if review_to_delete.owner != request.user:
      raise PermissionDenied("Unauthorised")
    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk ):
        edit_review = self.get_review(pk)
        request.data['owner'] = request.user.id
        edit_serializer = ReviewSerializer(edit_review, data=request.data)
        if edit_serializer.is_valid():
            edit_serializer.save()
            return Response(edit_serializer.data)
        print('errors -----> ', edit_serializer.errors)
        return Response(edit_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # def put(self, request, pk):
    # review_to_update = self.get_review(pk=pk)
    # request.data["owner"] = request.user.id
    # updated_review = ReviewSerializer(review_to_update, data=request.data)
    # try:
    #   updated_review.is_valid(True)
    #   updated_review.save()
    #   return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
    # except Exception as e:
    #   print("error ->", updated_review.e)
    #   return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
