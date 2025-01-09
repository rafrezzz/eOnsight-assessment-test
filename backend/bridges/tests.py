from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Bridge
from django.contrib.gis.geos import Point

class BridgeAPITest(TestCase):

    # Set up the test data
    def setUp(self):
        self.client = APIClient()
        self.valid_data = {
            "bridge_id": "B001",
            "name": "Test Bridge",
            "location": "POINT(7.245491412856165 43.69397731106014)"
        }
        self.invalid_data = {
            "bridge_id": "",
            "name": "",
            "location": ""
        }

    # Test the API to create a bridge
    def test_create_bridge_valid(self):
        response = self.client.post('/api/bridges/', self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['bridge_id'], self.valid_data['bridge_id'])

    # Test the API to get an error while trying to create a bridge
    def test_create_bridge_invalid(self):
        response = self.client.post('/api/bridges/', self.invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Test the API to get all bridges
    def test_get_all_bridges(self):
        Bridge.objects.create(
            bridge_id="B001",
            name="Test Bridge",
            location=Point(7.245491412856165, 43.69397731106014)
        )
        response = self.client.get('/api/bridges/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    # Test the API to get a single bridge
    def test_get_single_bridge(self):
        bridge = Bridge.objects.create(
            bridge_id="B002",
            name="Single Bridge",
            location=Point(7.260759051182584, 43.728620313264756)
        )
        response = self.client.get(f'/api/bridges/{bridge.bridge_id}/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], bridge.name)

    # Test the API to update all the data of a bridge
    def test_update_bridge(self):
        bridge = Bridge.objects.create(
            bridge_id="B003",
            name="Old Bridge Name",
            location=Point(7.245491412856165, 43.69397731106014)
        )
        updated_data = {
            "bridge_id": "B003",
            "name": "Updated Bridge Name",
            "location": "POINT(7.245491412856165 43.69397731106014)"
        }
        response = self.client.put(f'/api/bridges/{bridge.bridge_id}/', updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Updated Bridge Name")

    # Test the API to update a part of the data of a bridge
    def test_partial_update_bridge(self):
        bridge = Bridge.objects.create(
            bridge_id="B004",
            name="Partial Update Bridge",
            location=Point(7.260759051182584, 43.728620313264756)
        )
        partial_data = {
            "name": "Partially Updated Name"
        }
        response = self.client.patch(f'/api/bridges/{bridge.bridge_id}/', partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Partially Updated Name")

    # Test the API to delete a bridge
    def test_delete_bridge(self):
        bridge = Bridge.objects.create(
            bridge_id="B005",
            name="Bridge to Delete",
            location=Point(7.284203828396641, 43.719232866166436)
        )
        response = self.client.delete(f'/api/bridges/{bridge.bridge_id}/', format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Bridge.objects.filter(bridge_id="B005").exists())