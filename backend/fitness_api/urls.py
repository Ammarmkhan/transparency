from django.urls import path, include
from rest_framework import routers
from .views import WorkOutViewSet, UserViewSet, extract_from_gmail_view, analyze_paragraph, followup_question

router = routers.DefaultRouter()
router.register('workouts', WorkOutViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('extract-from-gmail/', extract_from_gmail_view, name='extract_from_gmail'),
    path('analyze-paragraph/', analyze_paragraph, name='analyze_paragraph'),
    path('followup-question/', followup_question, name="followup_question")
]