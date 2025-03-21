export interface SymbolDetails {
  askSz: string;
  baseVol: string;
  bidSz: string;
  buyOne: string;
  change: string;
  changeUtc: string;
  close: string;
  high24h: string;
  low24h: string;
  openUtc0: string;
  quoteVol: string;
  sellOne: string;
  symbol: string;
  ts: string;
  usdtVol: string;
}

export interface OrderBook {
  code: string;
  msg: string;
  requestTime: number;
  data: {
    asks: [price: string, quantity: string][];
    bids: [price: string, quantity: string][];
    ts: string;
  };
}

export interface SymbolInfo {
  code: string;
  msg: string;
  requestTime: number;
  data: SymbolData[];
}

export interface SymbolData {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  minTradeAmount: string;
  maxTradeAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  pricePrecision: string;
  quantityPrecision: string;
  quotePrecision: string;
  minTradeUSDT: string;
  status: string;
  buyLimitPriceRatio: string;
  sellLimitPriceRatio: string;
  orderQuantity: string;
  areaSymbol: string;
}


//apikey mx0vglc8ZezSDgE3P1
//secretkey 91ef4cf96c4546b3b1b0bec19e8e3170