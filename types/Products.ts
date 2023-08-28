export enum PurpleType {
  Product = 'product',
}
export enum DataType {
  Image = 'image',
  OptionType = 'option_type',
  ProductProperty = 'product_property',
  Taxon = 'taxon',
  Variant = 'variant',
}

export interface DAT {
  id: string
  type: DataType
}
export interface Images {
  data: DAT[]
}

export interface Variant {
  data: DAT
}

export interface Relationships {
  variants: Images
  option_types: Images
  product_properties: Images
  taxons: Images
  images: Images
  default_variant: Variant
  primary_variant: Variant
}
export enum Currency {
  Usd = 'USD',
}

export interface Attributes {
  name: string
  description: string
  available_on: string
  slug: string
  meta_description: null | string
  meta_keywords: null | string
  updated_at: string
  sku: string
  purchasable: boolean
  in_stock: boolean
  backorderable: boolean
  available: boolean
  currency: Currency
  price: string
  display_price: string
  compare_at_price: null | string
  display_compare_at_price: null | string
}
export interface Datum {
  id: string
  type: PurpleType
  attributes: Attributes
  relationships: Relationships
}

export interface ProductsModel {
  data: Datum[]
}
