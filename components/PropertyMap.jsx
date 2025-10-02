'use client';

import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const addressParts = [
      property?.location?.street,
      property?.location?.city,
      property?.location?.state,
      property?.location?.zipcode
    ].filter(Boolean);

    const address = addressParts.join(', ');
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!address || !mapboxToken) {
      setGeocodeError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setGeocodeError(false);

    const controller = new AbortController();

    const fetchCoords = async () => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?limit=1&access_token=${mapboxToken}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Mapbox geocoding failed with status ${response.status}`);
        }

        const data = await response.json();
        const feature = data?.features?.[0];

        if (!feature?.center || feature.center.length < 2) {
          setGeocodeError(true);
          return;
        }

        const [longitude, latitude] = feature.center;
        setLat(latitude);
        setLng(longitude);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to geocode address', error);
          setGeocodeError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();

    return () => controller.abort();
  }, [property]);

  if (loading) return <Spinner />;

  if (geocodeError || lat === null || lng === null) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle={
        process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ||
        'mapbox://styles/mapbox/streets-v12'
      }
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image src={pin} alt="location" width={40} height={40} />
      </Marker>
    </Map>
  );
};

export default PropertyMap;
