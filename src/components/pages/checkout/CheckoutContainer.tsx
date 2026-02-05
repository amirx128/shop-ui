import { getLocale, getTranslations } from 'next-intl/server';
import { Box } from '@mui/material';
import CheckoutHeader from './components/CheckoutHeader';
import CheckoutBody from './components/CheckoutBody';
import CheckoutStepOneClient from './components/CheckoutStepOneClient';
import CheckoutStepTwoClient from './components/CheckoutStepTwoClient';
import CheckoutStepThreeClient from './components/CheckoutStepThreeClient';
import CheckoutStepPlaceholderClient from './components/CheckoutStepPlaceholderClient';
import { CheckoutAddress, SummaryRow } from './types/checkout';

interface CheckoutContainerProps {
  step: number;
}

export default async function CheckoutContainer({
  step,
}: CheckoutContainerProps) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('checkout'),
  ]);

  const translations = {
    back: t('back'),
    currency: t('currency'),
    steps: {
      address: t('steps.address'),
      delivery: t('steps.delivery'),
      payment: t('steps.payment'),
      placeholder: t('steps.placeholder'),
    },
    actions: {
      selectDeliveryTime: t('actions.selectDeliveryTime'),
      addNewAddress: t('actions.addNewAddress'),
      editAddress: t('actions.editAddress'),
      cancel: t('actions.cancel'),
      continue: t('actions.continue'),
      confirmOrder: t('actions.confirmOrder'),
      pay: t('actions.pay'),
    },
    address: {
      emptyMessage: t('address.emptyMessage'),
      emptyAction: t('address.emptyAction'),
      emptyAlt: t('address.emptyAlt'),
      selectedAddress: t('address.selectedAddress'),
      receiverLabel: t('address.receiverLabel'),
      addTitle: t('address.addTitle'),
      editTitle: t('address.editTitle'),
      receiverName: t('address.receiverName'),
      phone: t('address.phone'),
      email: t('address.email'),
      province: t('address.province'),
      city: t('address.city'),
      postalCode: t('address.postalCode'),
      addressLine: t('address.addressLine'),
    },
    summary: {
      itemsPrice: t('summary.itemsPrice'),
      shippingCost: t('summary.shippingCost'),
      cartTotal: t('summary.cartTotal'),
      savings: t('summary.savings'),
    },
    delivery: {
      methodTitle: t('delivery.methodTitle'),
      timeTitle: t('delivery.timeTitle'),
      postMethod: t('delivery.postMethod'),
      courierMethod: t('delivery.courierMethod'),
    },
    payment: {
      gateway: t('payment.gateway'),
      wallet: t('payment.wallet'),
      walletBalance: t('payment.walletBalance'),
      discountTitle: t('payment.discountTitle'),
      discountPlaceholder: t('payment.discountPlaceholder'),
      applyCode: t('payment.applyCode'),
      bankMelli: t('payment.bankMelli'),
      bankMellat: t('payment.bankMellat'),
    },
    form: {
      required: t('form.required'),
    },
    toast: {
      selectAddressWarning: t('toast.selectAddressWarning'),
      selectDeliveryWarning: t('toast.selectDeliveryWarning'),
    },
  };

  const addressData: CheckoutAddress[] = [
    {
      id: 'address-1',
      receiverName: 'ناهید رضایی',
      phone: '09912330923',
      email: '',
      province: 'تهران',
      city: 'تهران',
      postalCode: '1234567890',
      addressLine: 'تهران، خیابان ولیعصر، کوچه نرگس، پلاک 12',
    },
    {
      id: 'address-2',
      receiverName: 'امیر محمدی',
      phone: '09912330923',
      email: 'amir@example.com',
      province: 'البرز',
      city: 'کرج',
      postalCode: '9876543210',
      addressLine: 'کرج، بلوار طالقانی، کوچه سرو، پلاک 8',
    },
  ];

  const itemsCount = 3;
  const itemsPrice = 5200000;
  const savings = 250000;
  const baseTotal = itemsPrice - savings;
  const defaultShippingCost = 120000;
  const totalWithShipping = baseTotal + defaultShippingCost;

  const formatCurrency = (value: number) =>
    `${value.toLocaleString(locale)} ${translations.currency}`;

  const summaryRows: SummaryRow[] = [
    {
      title: `${translations.summary.itemsPrice} (${itemsCount})`,
      value: formatCurrency(itemsPrice),
    },
    {
      title: translations.summary.cartTotal,
      value: formatCurrency(baseTotal),
    },
    {
      title: translations.summary.savings,
      value: formatCurrency(savings),
      color: 'success.main',
    },
  ];

  const stepTitles: Record<number, string> = {
    1: translations.steps.address,
    2: translations.steps.delivery,
    3: translations.steps.payment,
  };

  const stepTitle = stepTitles[step] ?? stepTitles[1];
  const backHref =
    step > 1
      ? `/${locale}/mobile/checkout?step=${step - 1}`
      : `/${locale}/mobile/cart`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CheckoutHeader
        title={stepTitle}
        backHref={backHref}
        backLabel={translations.back}
      />
      <CheckoutBody>
        {step === 1 ? (
          <CheckoutStepOneClient
            summaryRows={summaryRows}
            totalLabel={translations.summary.cartTotal}
            totalValue={formatCurrency(baseTotal)}
            actionLabel={translations.actions.selectDeliveryTime}
            nextStepHref={`/${locale}/mobile/checkout?step=2`}
            initialAddresses={addressData}
            translations={{
              emptyAddressMessage: translations.address.emptyMessage,
              emptyAddressAction: translations.address.emptyAction,
              emptyAddressAlt: translations.address.emptyAlt,
              selectedAddress: translations.address.selectedAddress,
              editAddress: translations.actions.editAddress,
              receiverLabel: translations.address.receiverLabel,
              addAddressTitle: translations.address.addTitle,
              editAddressTitle: translations.address.editTitle,
              submitAdd: translations.actions.addNewAddress,
              submitEdit: translations.actions.editAddress,
              cancel: translations.actions.cancel,
              receiverName: translations.address.receiverName,
              phone: translations.address.phone,
              email: translations.address.email,
              province: translations.address.province,
              city: translations.address.city,
              postalCode: translations.address.postalCode,
              addressLine: translations.address.addressLine,
              required: translations.form.required,
              selectAddressWarning: translations.toast.selectAddressWarning,
            }}
          />
        ) : step === 2 ? (
          <CheckoutStepTwoClient
            locale={locale}
            currency={translations.currency}
            itemsCount={itemsCount}
            itemsPrice={itemsPrice}
            savings={savings}
            baseTotal={baseTotal}
            actionLabel={translations.actions.confirmOrder}
            nextStepHref={`/${locale}/mobile/checkout?step=3`}
            translations={{
              methodTitle: translations.delivery.methodTitle,
              timeTitle: translations.delivery.timeTitle,
              postMethod: translations.delivery.postMethod,
              courierMethod: translations.delivery.courierMethod,
              itemsPrice: translations.summary.itemsPrice,
              shippingCost: translations.summary.shippingCost,
              cartTotal: translations.summary.cartTotal,
              savingsLabel: translations.summary.savings,
              selectDeliveryWarning: translations.toast.selectDeliveryWarning,
            }}
          />
        ) : step === 3 ? (
          <CheckoutStepThreeClient
            summaryRows={[
              {
                title: `${translations.summary.itemsPrice} (${itemsCount})`,
                value: formatCurrency(itemsPrice),
              },
              {
                title: translations.summary.shippingCost,
                value: formatCurrency(defaultShippingCost),
              },
              {
                title: translations.summary.cartTotal,
                value: formatCurrency(totalWithShipping),
              },
              {
                title: translations.summary.savings,
                value: formatCurrency(savings),
                color: 'success.main',
              },
            ]}
            totalLabel={translations.summary.cartTotal}
            totalValue={formatCurrency(totalWithShipping)}
            actionLabel={translations.actions.pay}
            translations={{
              paymentGateway: translations.payment.gateway,
              wallet: translations.payment.wallet,
              walletBalance: translations.payment.walletBalance,
              discountTitle: translations.payment.discountTitle,
              discountPlaceholder: translations.payment.discountPlaceholder,
              applyCode: translations.payment.applyCode,
              bankMelli: translations.payment.bankMelli,
              bankMellat: translations.payment.bankMellat,
            }}
          />
        ) : (
          <CheckoutStepPlaceholderClient
            title={stepTitle}
            placeholder={translations.steps.placeholder}
            totalLabel={translations.summary.cartTotal}
            totalValue={formatCurrency(baseTotal)}
            actionLabel={translations.actions.continue}
          />
        )}
      </CheckoutBody>
    </Box>
  );
}
