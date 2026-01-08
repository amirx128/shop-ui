export enum ProductColor {
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  GRAY = 'GRAY',
  SILVER = 'SILVER',
  BLUE = 'BLUE',
  PURPLE = 'PURPLE',
  RED = 'RED',
  PINK = 'PINK',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  BROWN = 'BROWN',
}

export const COLOR_CONFIG: Record<
  ProductColor,
  { colors: string[]; labelFa: string; labelEn: string }
> = {
  [ProductColor.BLACK]: {
    colors: ['#27272A'],
    labelFa: 'مشکی',
    labelEn: 'Black',
  },
  [ProductColor.WHITE]: {
    colors: ['#FFF'],
    labelFa: 'سفید',
    labelEn: 'White',
  },
  [ProductColor.GRAY]: {
    colors: ['#A2A2A9'],
    labelFa: 'طوسی',
    labelEn: 'Gray',
  },
  [ProductColor.SILVER]: {
    colors: ['#C2C2C2'],
    labelFa: 'نقره ای',
    labelEn: 'Silver',
  },
  [ProductColor.BLUE]: {
    colors: ['#2C5FE9', '#477AE9', '#6E95ED', '#B5CFFF'],
    labelFa: 'آبی',
    labelEn: 'Blue',
  },
  [ProductColor.PURPLE]: {
    colors: ['#8A00A4', '#A900BB', '#C76DD2', '#E3BAE9'],
    labelFa: 'بنفش',
    labelEn: 'Purple',
  },
  [ProductColor.RED]: {
    colors: ['#F03A22', '#E86565', '#FC8888', '#FCD2CE'],
    labelFa: 'قرمز',
    labelEn: 'Red',
  },
  [ProductColor.PINK]: {
    colors: ['#C90051', '#D90D7F', '#E877AA', '#F4BCD5'],
    labelFa: 'صورتی',
    labelEn: 'Pink',
  },
  [ProductColor.GREEN]: {
    colors: ['#54B333', '#81C967', '#ACDD9B', '#D5EFCC'],
    labelFa: 'سبز',
    labelEn: 'Green',
  },
  [ProductColor.ORANGE]: {
    colors: ['#E29400', '#F9A609', '#F9C774', '#FBE4BB'],
    labelFa: 'نارنجی',
    labelEn: 'Orange',
  },
  [ProductColor.YELLOW]: {
    colors: ['#F7D200', '#F8E14D', '#F9EE8D', '#FBF8C7'],
    labelFa: 'زرد',
    labelEn: 'Yellow',
  },
  [ProductColor.BROWN]: {
    colors: ['#5E4034', '#877067', '#AFA19A', '#D6CFCD'],
    labelFa: 'قهوه ای',
    labelEn: 'Brown',
  },
};
