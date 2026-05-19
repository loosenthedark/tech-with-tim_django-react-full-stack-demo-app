from django.urls import include, path
from . import views

urlpatterns = [
    path("notes/", views.ListCreateNoteView.as_view(), name="list_notes"),
    path(
        "note/delete/<int:pk>/",
        views.DeleteNoteView.as_view(),
        name="delete_note",
    ),
]
