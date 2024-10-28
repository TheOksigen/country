export interface CountryName {
    common: string;
    official: string;
    nativeName: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
}

export interface Currency {
    name: string;
    symbol: string;
}

export interface Idd {
    root: string;
    suffixes: string[];
}

export interface Translation {
    official: string;
    common: string;
}

export interface Demonyms {
    eng: {
        f: string;
        m: string;
    };
}

export interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

export interface Car {
    signs: string[];
    side: string;
}

export interface Flags {
    png: string;
    svg: string;
}

export interface CapitalInfo {
    latlng: [number, number];
}

export interface Country {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    name: CountryName;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {
        [key: string]: Currency;
    };
    idd: Idd;
    capital: string[];
    altSpellings: string[];
    region: string;
    languages: {
        [key: string]: string;
    };
    translations: {
        [key: string]: Translation;
    };
    latlng: [number, number];
    landlocked: boolean;
    area: number;
    demonyms: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    car: Car;
    timezones: string[];
    continents: string[];
    flags: Flags;
    coatOfArms: Record<string, string>;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
}