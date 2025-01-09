from django.contrib.gis.db import models

class Bridge(models.Model):
    """
    A model class to represent a bridge.
    """
    bridge_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=100)
    location = models.PointField()

    class Meta:
        db_table = 'bridges'  # Set the reference name of the table in the database