'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CheckoutFooter from './CheckoutFooter';
import DayCard from './DayCard';
import { SummaryRow } from '../types/checkout';
import RadioInput from '@/components/ui/RadioInput';
import {
  CartDto,
  CheckoutConfiguration,
  estimateCartShipping,
  fetchCheckoutConfiguration,
  fetchCurrentCart,
  setDeliverDateTime,
  updateCartShipping,
  updateCartShippingAmount,
} from '@/services/checkout.service';

interface CheckoutStepTwoClientProps {
  locale: string;
  currency: string;
  actionLabel: string;
  nextStepHref: string;
  translations: {
    methodTitle: string;
    timeTitle: string;
    postMethodInvoice: string;
    postMethodPayLater: string;
    courierMethod: string;
    itemsPrice: string;
    shippingCost: string;
    cartTotal: string;
    savingsLabel: string;
    selectDeliveryWarning: string;
  };
}

type ShippingMethodId = 'courier' | 'post-invoice' | 'post-pay-later';

interface ShippingMethodOption {
  id: ShippingMethodId;
  label: string;
}

interface DayCardInfo {
  id: number;
  dayLabel: string;
  dateLabel: string;
  date: Date;
}

const COURIER_SHIPPING_COST_TOMAN = 123000;
const COURIER_SHIPPING_COST_RIAL = 1230000;
const MAX_DAY_CARDS = 8;
const FRIDAY_DAY = 5;

export default function CheckoutStepTwoClient({
  locale,
  currency,
  actionLabel,
  nextStepHref,
  translations,
}: CheckoutStepTwoClientProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartDto | null>(null);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethodId | null>(
    null,
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [dayCards, setDayCards] = useState<DayCardInfo[]>([]);
  const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfiguration | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [shippingEstimate, setShippingEstimate] = useState<number | null>(null);
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
  const [isSettingDeliverDate, setIsSettingDeliverDate] = useState(false);

  const {
    methodTitle,
    timeTitle,
    postMethodInvoice,
    postMethodPayLater,
    courierMethod,
    itemsPrice: itemsPriceLabel,
    shippingCost: shippingCostLabel,
    cartTotal: cartTotalLabel,
    savingsLabel,
    selectDeliveryWarning,
  } = translations;

  useEffect(() => {
    let isActive = true;
    const loadCart = async () => {
      setIsCartLoading(true);
      try {
        const response = await fetchCurrentCart();
        if (isActive) {
          setCart(response);
        }
      } catch (error) {
        if (isActive) {
          toast.error(
            error instanceof Error
              ? error.message
              : 'Unable to load cart information.',
          );
        }
      } finally {
        if (isActive) {
          setIsCartLoading(false);
        }
      }
    };

    const loadConfig = async () => {
      setIsConfigLoading(true);
      try {
        const result = await fetchCheckoutConfiguration();
        if (isActive) {
          setCheckoutConfig(result);
        }
      } catch (error) {
        if (isActive) {
          toast.error(
            error instanceof Error
              ? error.message
              : 'Unable to load delivery configuration.',
          );
          setCheckoutConfig(null);
        }
      } finally {
        if (isActive) {
          setIsConfigLoading(false);
        }
      }
    };

    void loadCart();
    void loadConfig();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (selectedMethod !== 'post-invoice' || !cart?.CartId) {
      setShippingEstimate(null);
      return;
    }

    let isActive = true;
    setShippingEstimate(null);

    const loadEstimate = async () => {
      try {
        const result = await estimateCartShipping(
          cart.CartId,
          cart.CustomerAddress?.AddressId ?? undefined,
        );
        if (isActive) {
          setShippingEstimate(result.ShippingCost);
        }
      } catch (error) {
        if (isActive) {
          toast.error(
            error instanceof Error
              ? error.message
              : 'Unable to estimate the shipping cost.',
          );
          setShippingEstimate(null);
        }
      }
    };

    void loadEstimate();

    return () => {
      isActive = false;
    };
  }, [selectedMethod, cart]);

  useEffect(() => {
    if (!checkoutConfig) {
      setDayCards([]);
      setSelectedDayIndex(null);
      return;
    }

    const serverNow = new Date(checkoutConfig.ServerUtcNow);
    const startDate = new Date(Date.UTC(
      serverNow.getUTCFullYear(),
      serverNow.getUTCMonth(),
      serverNow.getUTCDate(),
    ));
    startDate.setUTCDate(
      startDate.getUTCDate() + Math.max(0, checkoutConfig.MinDeliverDay),
    );

    const weekdayFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
    });
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    });

    const cards: DayCardInfo[] = [];
    const cursor = new Date(startDate);

    while (cards.length < MAX_DAY_CARDS) {
      if (cursor.getUTCDay() !== FRIDAY_DAY) {
        cards.push({
          id: cards.length,
          dayLabel: weekdayFormatter.format(cursor),
          dateLabel: dateFormatter.format(cursor),
          date: new Date(cursor),
        });
      }

      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    setDayCards(cards);
    setSelectedDayIndex(null);
  }, [checkoutConfig, locale]);

  useEffect(() => {
    if (!cart?.DeliverDateTime || dayCards.length === 0) {
      return;
    }

    const normalized = new Date(cart.DeliverDateTime).toISOString().split('T')[0];
    const match = dayCards.find(
      (card) => card.date.toISOString().split('T')[0] === normalized,
    );

    if (match) {
      setSelectedDayIndex(match.id);
    }
  }, [cart?.DeliverDateTime, dayCards]);

  const cartItems = cart?.Items ?? [];
  const { itemsCount, itemsPrice, savings, baseTotal } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        acc.itemsCount += item.Quantity;
        acc.itemsPrice += (item.UnitPrice + item.DiscountPerUnit) * item.Quantity;
        acc.savings += item.DiscountPerUnit * item.Quantity;
        acc.baseTotal += item.RowPrice;
        return acc;
      },
      { itemsCount: 0, itemsPrice: 0, savings: 0, baseTotal: 0 },
    );
  }, [cartItems]);

  const shippingMethods: ShippingMethodOption[] = useMemo(
    () => [
      { id: 'post-invoice', label: postMethodInvoice },
      { id: 'post-pay-later', label: postMethodPayLater },
      { id: 'courier', label: courierMethod },
    ],
    [postMethodInvoice, postMethodPayLater, courierMethod],
  );

  const hasSelection = selectedMethod !== null && selectedDayIndex !== null;

  const shippingCost = useMemo(() => {
    if (selectedMethod === 'courier') {
      return COURIER_SHIPPING_COST_TOMAN;
    }

    if (selectedMethod === 'post-invoice') {
      return shippingEstimate ?? 0;
    }

    if (selectedMethod === 'post-pay-later') {
      return 0;
    }

    return 0;
  }, [selectedMethod, shippingEstimate]);

  const totalWithShipping = baseTotal + (hasSelection ? shippingCost : 0);

  const formatCurrency = (value: number) =>
    `${value.toLocaleString(locale)} ${currency}`;

  const summaryRows = useMemo<SummaryRow[]>(() => {
    const rows: SummaryRow[] = [
      {
        title: `${itemsPriceLabel} (${itemsCount})`,
        value: formatCurrency(itemsPrice),
      },
      ...(hasSelection
        ? [
            {
              title: shippingCostLabel,
              value: formatCurrency(shippingCost),
            },
          ]
        : []),
      {
        title: cartTotalLabel,
        value: formatCurrency(totalWithShipping),
      },
      {
        title: savingsLabel,
        value: formatCurrency(savings),
        color: 'success.main',
      },
    ];

    return rows;
  }, [
    itemsCount,
    itemsPrice,
    savings,
    shippingCost,
    totalWithShipping,
    itemsPriceLabel,
    shippingCostLabel,
    cartTotalLabel,
    savingsLabel,
    hasSelection,
  ]);

  const handleDaySelect = useCallback(
    async (card: DayCardInfo) => {
      if (!cart?.CartId || isSettingDeliverDate) {
        return;
      }

      setIsSettingDeliverDate(true);
      try {
        await setDeliverDateTime(cart.CartId, card.date.toISOString());
        setSelectedDayIndex(card.id);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to set the delivery date.',
        );
      } finally {
        setIsSettingDeliverDate(false);
      }
    },
    [cart?.CartId, isSettingDeliverDate],
  );

  const handleContinue = useCallback(async () => {
    if (!hasSelection) {
      toast.error(selectDeliveryWarning);
      return;
    }

    if (!selectedMethod || !cart?.CartId) {
      toast.error('Unable to update shipping method.');
      return;
    }

    setIsUpdatingShipping(true);
    try {
      if (selectedMethod === 'courier') {
        await updateCartShippingAmount(cart.CartId, COURIER_SHIPPING_COST_RIAL);
      } else if (selectedMethod === 'post-invoice') {
        await updateCartShipping(cart.CartId, false);
      } else {
        await updateCartShipping(cart.CartId, true);
      }

      await router.push(nextStepHref);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Unable to apply the selected shipping method.',
      );
    } finally {
      setIsUpdatingShipping(false);
    }
  }, [
    cart?.CartId,
    hasSelection,
    nextStepHref,
    router,
    selectDeliveryWarning,
    selectedMethod,
  ]);

  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {methodTitle}
            </Typography>
            <RadioGroup
              value={selectedMethod ?? ''}
              onChange={(event) =>
                setSelectedMethod(event.target.value as ShippingMethodId)
              }
              sx={{ gap: 1 }}
            >
              {shippingMethods.map((method) => (
                <FormControlLabel
                  key={method.id}
                  value={method.id}
                  control={<RadioInput />}
                  label={method.label}
                />
              ))}
            </RadioGroup>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {timeTitle}
            </Typography>
            {isConfigLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 4,
                }}
              >
                <CircularProgress size={24} />
              </Box>
            ) : dayCards.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}
              >
                Unable to load delivery dates.
              </Typography>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 80px)',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                {dayCards.map((day) => (
                  <DayCard
                    key={day.id}
                    dayLabel={day.dayLabel}
                    dateLabel={day.dateLabel}
                    selected={selectedDayIndex === day.id}
                    onSelect={() => handleDaySelect(day)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <CheckoutFooter
        totalLabel={cartTotalLabel}
        totalValue={formatCurrency(totalWithShipping)}
        actionLabel={actionLabel}
        onAction={handleContinue}
        disabled={
          isCartLoading || isUpdatingShipping || isSettingDeliverDate || !dayCards.length
        }
        summaryRows={summaryRows}
      />
    </>
  );
}
