'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface ContactusLeafletMapClientProps {
  popupLabel: string;
}

const TEHRAN_COORDINATES: [number, number] = [35.6892, 51.389];

export default function ContactusLeafletMapClient({
  popupLabel,
}: ContactusLeafletMapClientProps) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: 182,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <MapContainer
        center={TEHRAN_COORDINATES}
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={TEHRAN_COORDINATES}>
          <Popup>{popupLabel}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
