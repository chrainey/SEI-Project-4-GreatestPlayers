from django.urls import path
from .views import PlayerDetailView, PlayerListView

urlpatterns = [
    path('', PlayerListView.as_view()),
    path('<int:pk>/', PlayerDetailView.as_view())
]