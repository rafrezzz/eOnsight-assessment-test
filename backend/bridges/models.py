from django.contrib.gis.db import models

class Bridge(models.Model):
    bridge_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=100)
    location = models.PointField()  # PostGIS PointField

    def __str__(self):
        return self.name