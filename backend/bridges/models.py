from django.contrib.gis.db import models

class Bridge(models.Model):
    bridge_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=100)
    location = models.PointField()

    class Meta:
        db_table = 'bridges'  # Indique à Django d'utiliser la table `bridges`