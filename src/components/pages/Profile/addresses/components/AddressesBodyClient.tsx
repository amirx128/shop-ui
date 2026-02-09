'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, CircularProgress, Container, Stack, Typography } from '@mui/material';
import Button from '@/components/ui/Button';
import AddAddressModal from './AddAddressModal';
import AddressCart from './AddressCart';
import AddressesHeader from './AddressesHeader';
import type { AddressFormValues, AddressItem, AddressesTexts } from '../types/addresses';
import { addressService, CustomerAddressDto, SaveCustomerAddressRequest } from '@/services/address.service';
import { locationService, LocationOption } from '@/services/location.service';
import { identityService } from '@/services/identity.service';
import { toast } from 'react-toastify';
import { ROUTES } from '@/lib/routes';

const mapToAddressItem = (
  dto: CustomerAddressDto,
  defaultAddressId: string | null,
  provinces: LocationOption[],
  cities: Record<number, LocationOption[]>
): AddressItem => {
  const provinceName =
    provinces.find((province) => province.id === dto.provinceId)?.name ?? '';
  const cityName =
    cities[dto.provinceId]?.find((city) => city.id === dto.cityId)?.name ?? '';

  return {
    id: dto.id,
    title: dto.title,
    street: dto.street,
    address: dto.address,
    provinceId: dto.provinceId,
    cityId: dto.cityId,
    provinceName,
    cityName,
    alley: dto.alley ?? undefined,
    plaque: dto.plaque ?? undefined,
    unit: dto.unit ?? undefined,
    location: dto.location ?? undefined,
    createdAtUtc: dto.createdAtUtc,
    modifiedAtUtc: dto.modifiedAtUtc,
    isDefault: defaultAddressId === dto.id,
  };
};

interface AddressesBodyClientProps {
  texts: AddressesTexts;
  formIdPrefix: string;
}

export default function AddressesBodyClient({
  texts,
  formIdPrefix,
}: AddressesBodyClientProps) {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [citiesMap, setCitiesMap] = useState<Record<number, LocationOption[]>>({});
  const [modalCities, setModalCities] = useState<LocationOption[]>([]);
  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    editingId: string | null;
  }>({
    open: false,
    mode: 'create',
    editingId: null,
  });
  const [isModalCitiesLoading, setIsModalCitiesLoading] = useState(false);

  const formId = modalState.mode === 'edit' && modalState.editingId
    ? `${formIdPrefix}-edit-${modalState.editingId}`
    : `${formIdPrefix}-create`;

  const handleLoadData = useCallback(async () => {
    setLoading(true);
    try {
      const profile = await identityService.getProfile();
      const provincesData = await locationService.getProvinces();

      const addressesData = await addressService.getAddresses();
      const uniqueProvinceIds = Array.from(
        new Set(addressesData.map((address) => address.provinceId))
      );

      const citiesAccumulator: Record<number, LocationOption[]> = {};
      await Promise.all(
        uniqueProvinceIds.map(async (provinceId) => {
          const cities = await locationService.getCities(provinceId);
          citiesAccumulator[provinceId] = cities;
        })
      );

      setProvinces(provincesData);
      setCitiesMap(citiesAccumulator);
      setDefaultAddressId(profile.defaultAddressId ?? null);
      setAddresses(
        addressesData.map((address) =>
          mapToAddressItem(address, profile.defaultAddressId ?? null, provincesData, citiesAccumulator)
        )
      );
    } catch (error) {
      console.error(error);
      toast.error('Unable to load addresses.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const loadModalCities = useCallback(
    async (provinceId: number) => {
      if (!provinceId) {
        setModalCities([]);
        return [];
      }

      if (citiesMap[provinceId]) {
        setModalCities(citiesMap[provinceId]);
        return citiesMap[provinceId];
      }

      setIsModalCitiesLoading(true);
      try {
        const cities = await locationService.getCities(provinceId);
        setCitiesMap((prev) => ({
          ...prev,
          [provinceId]: cities,
        }));
        setModalCities(cities);
        return cities;
      } catch (error) {
        console.error(error);
        toast.error('Unable to load cities.');
        setModalCities([]);
        return [];
      } finally {
        setIsModalCitiesLoading(false);
      }
    },
    [citiesMap]
  );

  const handleOpenCreateModal = async () => {
    const defaultProvinceId = provinces[0]?.id ?? 0;
    await loadModalCities(defaultProvinceId);
    setModalState({
      open: true,
      mode: 'create',
      editingId: null,
    });
  };

  const handleOpenEditModal = async (addressId: string) => {
    const address = addresses.find((item) => item.id === addressId);
    if (address) {
      await loadModalCities(address.provinceId);
    }
    setModalState({
      open: true,
      mode: 'edit',
      editingId: addressId,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
      editingId: null,
    }));
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    if (defaultAddressId === addressId) {
      return;
    }

    try {
      await addressService.setDefaultAddress(addressId);
      setDefaultAddressId(addressId);
      setAddresses((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: item.id === addressId,
        }))
      );
    } catch (error) {
      console.error(error);
      toast.error('Unable to set default address.');
    }
  };

  const mapPayload = (values: AddressFormValues): SaveCustomerAddressRequest => ({
    title: values.title.trim(),
    provinceId: values.provinceId,
    cityId: values.cityId,
    street: values.street.trim(),
    address: values.address.trim(),
    alley: values.alley.trim() || undefined,
    plaque: values.plaque.trim() || undefined,
    unit: values.unit.trim() || undefined,
    location: values.location.trim() || undefined,
  });

  const handleSubmitAddress = async (data: AddressFormValues) => {
    setSaving(true);
    const payload = mapPayload(data);
    try {
      if (modalState.mode === 'edit' && modalState.editingId) {
        const updated = await addressService.updateAddress(modalState.editingId, payload);
        setAddresses((prev) =>
          prev.map((item) =>
            item.id === updated.id
              ? mapToAddressItem(
                  updated,
                  defaultAddressId,
                  provinces,
                  citiesMap
                )
              : item
          )
        );
        toast.success('Address updated.');
        return;
      }

      const created = await addressService.createAddress(payload);
      setDefaultAddressId(created.id);
      const updatedCities = {
        ...citiesMap,
        [created.provinceId]:
          modalCities.length > 0 ? modalCities : citiesMap[created.provinceId] ?? [],
      };
      setCitiesMap(updatedCities);
      setAddresses((prev) => [
        mapToAddressItem(created, created.id, provinces, updatedCities),
        ...prev.map((item) => ({ ...item, isDefault: false })),
      ]);
      toast.success('Address added.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to save address.');
    } finally {
      setSaving(false);
      handleCloseModal();
    }
  };

  const activeAddress = modalState.editingId
    ? addresses.find((item) => item.id === modalState.editingId)
    : undefined;

  const createInitialValues: AddressFormValues = useMemo(() => {
    const defaultProvinceId = provinces[0]?.id ?? 0;
    const defaultCityId =
      citiesMap[defaultProvinceId]?.[0]?.id ?? 0;

    return {
      title: '',
      provinceId: defaultProvinceId,
      cityId: defaultCityId,
      street: '',
      address: '',
      alley: '',
      plaque: '',
      unit: '',
      location: '',
    };
  }, [provinces, citiesMap]);

  const modalInitialValues: AddressFormValues = activeAddress
    ? {
        title: activeAddress.title,
        provinceId: activeAddress.provinceId,
        cityId: activeAddress.cityId,
        street: activeAddress.street,
        address: activeAddress.address,
        alley: activeAddress.alley ?? '',
        plaque: activeAddress.plaque ?? '',
        unit: activeAddress.unit ?? '',
        location: activeAddress.location ?? '',
      }
    : createInitialValues;

  const defaultAddress = addresses.find((item) => item.isDefault);
  const defaultAddressDisplay = defaultAddress
    ? defaultAddress.title || `${defaultAddress.provinceName} · ${defaultAddress.cityName}`
    : '-';

  return (
    <>
      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <Container sx={{ py: 2, height: '100%' }}>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.75,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <AddressesHeader title={texts.title} backHref={ROUTES.profile.BASE} />
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="baseline"
                justifyContent="flex-end"
                sx={{ flexWrap: 'wrap' }}
              >
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {texts.defaultAddressLabel}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>
                  {defaultAddressDisplay}
                </Typography>
              </Stack>
            </Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {texts.selectionHint}
            </Typography>
          </Box>
          {loading ? (
            <Box
              sx={{
                minHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : addresses.length === 0 ? (
            <Box
              sx={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 2 }}>
                {texts.emptyState.description}
              </Typography>
              <Button
                variant="bordered"
                radius="md"
                startIcon={<AddOutlinedIcon sx={{ fontSize: 18 }} />}
                onClick={handleOpenCreateModal}
                disabled={loading || provinces.length === 0}
                sx={{ width: 'min(280px, 100%)' }}
              >
                {texts.actions.add}
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {addresses.map((address) => (
                <AddressCart
                  key={address.id}
                  address={address}
                  selectedAddressLabel={texts.labels.selectedAddress}
                  editAddressLabel={texts.actions.editAddress}
                  onEdit={() => handleOpenEditModal(address.id)}
                  onSelect={() => handleSetDefaultAddress(address.id)}
                />
              ))}
            </Stack>
          )}
        </Container>
      </Box>

      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 2,
          backgroundColor: 'background.default',
          flexShrink: 0,
        }}
      >
        <Container>
          <Button
            variant="bordered"
            radius="md"
            fullWidth
            startIcon={<AddOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenCreateModal}
            disabled={loading || provinces.length === 0}
          >
            {texts.actions.add}
          </Button>
        </Container>
      </Box>

      <AddAddressModal
        open={modalState.open}
        mode={modalState.mode}
        initialValues={modalInitialValues}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAddress}
        formId={formId}
        texts={texts}
        provinces={provinces}
        cities={modalCities}
        isCityLoading={isModalCitiesLoading}
        onProvinceChange={(provinceId) => loadModalCities(provinceId)}
        isSubmitting={saving}
      />
    </>
  );
}
