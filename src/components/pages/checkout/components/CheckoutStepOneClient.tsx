'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AdressCart from './AdressCart';
import CheckoutFooter from './CheckoutFooter';
import AddressFormModal from './AddressFormModal';
import useAddressSelection from '../hooks/useAddressSelection';
import {
  AddressFormValues,
  CheckoutAddress,
  SummaryRow,
} from '../types/checkout';
import { addressService, CustomerAddressDto, SaveCustomerAddressRequest } from '@/services/address.service';
import { identityService, IdentityProfileResponse } from '@/services/identity.service';
import { locationService, LocationOption } from '@/services/location.service';
import Button from '@/components/ui/Button';

const defaultFormValues: AddressFormValues = {
  receiverName: '',
  phone: '',
  email: '',
  provinceId: 0,
  cityId: 0,
  street: '',
  addressLine: '',
};

interface CheckoutStepOneClientProps {
  summaryRows: SummaryRow[];
  totalLabel: string;
  totalValue: string;
  actionLabel: string;
  nextStepHref: string;
  translations: {
    emptyAddressMessage: string;
    emptyAddressAction: string;
    emptyAddressAlt: string;
    selectedAddress: string;
    editAddress: string;
    receiverLabel: string;
    addAddressTitle: string;
    editAddressTitle: string;
    submitAdd: string;
    submitEdit: string;
    cancel: string;
    receiverName: string;
    phone: string;
    email: string;
    province: string;
    city: string;
    street: string;
    addressLine: string;
    required: string;
    selectAddressWarning: string;
  };
}

export default function CheckoutStepOneClient({
  summaryRows,
  totalLabel,
  totalValue,
  actionLabel,
  nextStepHref,
  translations,
}: CheckoutStepOneClientProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<CustomerAddressDto[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [provinceOptions, setProvinceOptions] = useState<LocationOption[]>([]);
  const [cityMap, setCityMap] = useState<Record<number, LocationOption[]>>({});
  const cityCacheRef = useRef<Record<number, LocationOption[]>>({});
  const [modalCities, setModalCities] = useState<LocationOption[]>([]);
  const [isModalCitiesLoading, setIsModalCitiesLoading] = useState(false);
  const [profile, setProfile] = useState<IdentityProfileResponse | null>(null);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const { selectedId, setSelectedId, hasSelection } = useAddressSelection();
  const [modalState, setModalState] = useState({
    open: false,
    mode: 'create' as 'create' | 'edit',
    editingId: null as string | null,
  });
  const [formInitialValues, setFormInitialValues] =
    useState<AddressFormValues>(defaultFormValues);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

  const loadProvinces = useCallback(async () => {
    try {
      const list = await locationService.getProvinces();
      setProvinceOptions(list);
    } catch {
      toast.error('Unable to load provinces.');
    }
  }, []);

  const loadCities = useCallback(async (provinceId: number) => {
    if (provinceId <= 0) {
      return [];
    }

    if (cityCacheRef.current[provinceId]) {
      return cityCacheRef.current[provinceId];
    }

    try {
      const cities = await locationService.getCities(provinceId);
      const next = { ...cityCacheRef.current, [provinceId]: cities };
      cityCacheRef.current = next;
      setCityMap(next);
      return cities;
    } catch {
      toast.error('Unable to load cities.');
      return [];
    }
  }, []);

  const loadModalCities = useCallback(
    async (provinceId: number) => {
      if (!provinceId) {
        setModalCities([]);
        return [];
      }
      setIsModalCitiesLoading(true);
      try {
        const cities = await loadCities(provinceId);
        setModalCities(cities);
        return cities;
      } finally {
        setIsModalCitiesLoading(false);
      }
    },
    [loadCities],
  );

  const loadAddresses = useCallback(async () => {
    setIsLoadingAddresses(true);
    try {
      const list = await addressService.getAddresses();
      setAddresses(list);
      const provinceIds = Array.from(
        new Set(list.map((address) => address.provinceId)),
      );
      await Promise.all(provinceIds.map((id) => loadCities(id)));
    } catch {
      toast.error('Unable to load addresses.');
    } finally {
      setIsLoadingAddresses(false);
    }
  }, [loadCities]);

  const loadProfile = useCallback(async () => {
    try {
      const identity = await identityService.getProfile();
      setProfile(identity);
      setDefaultAddressId(identity.defaultAddressId ?? null);
    } catch {
      toast.error('Unable to load profile.');
    }
  }, []);

  useEffect(() => {
    void loadProfile();
    void loadProvinces();
    void loadAddresses();
  }, [loadProfile, loadProvinces, loadAddresses]);

  useEffect(() => {
    if (defaultAddressId) {
      setSelectedId(defaultAddressId);
    }
  }, [defaultAddressId, setSelectedId]);

  const formattedAddresses = useMemo(() => {
    const resolveProvince = (provinceId: number) =>
      provinceOptions.find((province) => province.id === provinceId)?.name ?? '';
    const resolveCity = (provinceId: number, cityId: number) =>
      cityMap[provinceId]?.find((city) => city.id === cityId)?.name ?? '';

    const formatAddressLine = (address: CustomerAddressDto) => {
      const parts = [address.street?.trim(), address.address?.trim()].filter(
        Boolean,
      );
      return parts.join(', ') || address.address || '';
    };

    return addresses.map((address) => ({
      id: address.id,
      receiverName: address.title,
      phone: profile?.phoneNumber ?? '',
      email: profile?.email ?? undefined,
      province: resolveProvince(address.provinceId),
      city: resolveCity(address.provinceId, address.cityId),
      postalCode: '',
      addressLine: formatAddressLine(address),
    }));
  }, [addresses, cityMap, provinceOptions, profile]);

  const handleOpenCreate = useCallback(async () => {
    const baseValues: AddressFormValues = {
      ...defaultFormValues,
      receiverName:
        profile?.firstName && profile?.lastName
          ? `${profile.firstName} ${profile.lastName}`
          : profile?.displayName ?? '',
      phone: profile?.phoneNumber ?? '',
      email: profile?.email ?? '',
      provinceId: provinceOptions[0]?.id ?? 0,
    };

    setFormInitialValues(baseValues);
    setModalState({ open: true, mode: 'create', editingId: null });

    if (baseValues.provinceId) {
      const cities = await loadModalCities(baseValues.provinceId);
      if (cities.length) {
        setFormInitialValues((prev) => ({
          ...prev,
          provinceId: baseValues.provinceId,
          cityId: cities[0].id,
        }));
      }
    } else {
      setModalCities([]);
    }
  }, [loadModalCities, profile, provinceOptions]);

  const handleOpenEdit = useCallback(
    async (addressId: string) => {
      const target = addresses.find((address) => address.id === addressId);
      if (!target) {
        return;
      }

      setModalState({ open: true, mode: 'edit', editingId: addressId });
      setFormInitialValues({
        receiverName: target.title,
        phone: profile?.phoneNumber ?? '',
        email: profile?.email ?? '',
        provinceId: target.provinceId,
        cityId: target.cityId,
        street: target.street,
        addressLine: target.address,
      });

      await loadModalCities(target.provinceId);
    },
    [addresses, loadModalCities, profile],
  );

  const handleSubmitAddress = useCallback(
    async (data: AddressFormValues) => {
      if (!data.provinceId || !data.cityId) {
        toast.error('Please select province and city.');
        return;
      }

      if (!data.receiverName.trim() || !data.street.trim()) {
        toast.error('Please fill in the required fields.');
        return;
      }

      const payload: SaveCustomerAddressRequest = {
        provinceId: data.provinceId,
        cityId: data.cityId,
        title: data.receiverName.trim(),
        street: data.street.trim(),
        address: data.addressLine.trim(),
        alley: undefined,
        plaque: undefined,
        unit: undefined,
        location: undefined,
      };

      setIsSubmittingAddress(true);

      try {
        if (modalState.mode === 'create') {
          await addressService.createAddress(payload);
          toast.success('Address added.');
        } else if (modalState.editingId) {
          await addressService.updateAddress(modalState.editingId, payload);
          toast.success('Address updated.');
        }

        await loadAddresses();
        setModalState((prev) => ({ ...prev, open: false }));
      } catch {
        toast.error('Unable to save address.');
      } finally {
        setIsSubmittingAddress(false);
      }
    },
    [loadAddresses, modalState],
  );

  const handleDefaultAddressChange = useCallback(
    async (addressId: string) => {
      if (addressId === defaultAddressId) {
        setSelectedId(addressId);
        return;
      }

      try {
        await addressService.setDefaultAddress(addressId);
        setDefaultAddressId(addressId);
        setSelectedId(addressId);
        toast.success('Default address updated.');
      } catch {
        toast.error('Unable to update default address.');
      }
    },
    [defaultAddressId, setSelectedId],
  );

  const handleContinue = () => {
    if (!hasSelection) {
      toast.error(translations.selectAddressWarning);
      return;
    }
    router.push(nextStepHref);
  };

  const modalFormId = 'checkout-address-form';

  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {isLoadingAddresses ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
              }}
            >
              <CircularProgress />
            </Box>
          ) : formattedAddresses.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                py: 6,
              }}
            >
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {translations.emptyAddressMessage}
              </Typography>
              <Button
                variant="bordered"
                onClick={handleOpenCreate}
                radius="full"
              >
                {translations.emptyAddressAction}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {formattedAddresses.map((address) => (
                <AdressCart
                  key={address.id}
                  address={address}
                  selected={selectedId === address.id}
                  onSelect={() => handleDefaultAddressChange(address.id)}
                  onEdit={() => handleOpenEdit(address.id)}
                  translations={{
                    selectedAddress: translations.selectedAddress,
                    editAddress: translations.editAddress,
                    receiverLabel: translations.receiverLabel,
                  }}
                />
              ))}
              <Button variant="bordered" onClick={handleOpenCreate} fullWidth>
                {translations.emptyAddressAction}
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      <CheckoutFooter
        totalLabel={totalLabel}
        totalValue={totalValue}
        actionLabel={actionLabel}
        onAction={handleContinue}
        summaryRows={summaryRows}
      />

      <AddressFormModal
        open={modalState.open}
        mode={modalState.mode}
        initialValues={formInitialValues}
        onClose={() => setModalState((prev) => ({ ...prev, open: false }))}
        onSubmit={handleSubmitAddress}
        translations={{
          addAddressTitle: translations.addAddressTitle,
          editAddressTitle: translations.editAddressTitle,
          submitAdd: translations.submitAdd,
          submitEdit: translations.submitEdit,
          cancel: translations.cancel,
          receiverName: translations.receiverName,
          phone: translations.phone,
          email: translations.email,
          province: translations.province,
          city: translations.city,
          street: translations.street,
          addressLine: translations.addressLine,
          required: translations.required,
        }}
        provinces={provinceOptions}
        cities={modalCities}
        isCityLoading={isModalCitiesLoading}
        onProvinceChange={loadModalCities}
        isSubmitting={isSubmittingAddress}
        formId={modalFormId}
      />
    </>
  );
}
