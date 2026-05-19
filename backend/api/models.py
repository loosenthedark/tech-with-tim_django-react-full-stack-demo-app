from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    # Ensures this field gets automatically populated, i.e. we don't want to be passing a value for it
    created_at = models.DateTimeField(auto_now_add=True)
    # Establishes a one-to-many r'ship between a user and his/her note(s)
    # NB: Based on val passed to on_delete arg below, whenever a user is removed from DB all notes associated with that user will also be deleted
    # NB: We can now access a user's notes via the notes field on the user object
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notes"
    )

    def __str__(self):
        return self.title
