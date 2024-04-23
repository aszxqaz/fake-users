import { isEqualCaseInsensitive } from '@users/string_helpers';
import { CountryInfo, ICountriesRepo } from '@users/user_generator';
import { all } from 'country-codes-list';
import { shortCountryNames } from './short_country_names';

export class CountriesRepo implements ICountriesRepo {
    getCountryInfo(code?: string): CountryInfo | undefined {
        for (const data of all()) {
            const countryCode = data['countryCode'];
            if (isEqualCaseInsensitive(countryCode, code)) {
                let nameEn = data['countryNameEn'];
                let nameLocal = data['countryNameLocal'];
                const phoneCode = data['countryCallingCode'];
                nameEn = this.getShorterName(nameEn) ?? nameEn;
                nameLocal = this.getShorterName(nameLocal) ?? nameLocal;
                return {
                    name: nameEn,
                    phoneCode,
                    nameLocal,
                };
            }
        }
        return undefined;
    }

    private getShorterName(name: string): string | undefined {
        return shortCountryNames.find(
            short => short[0].toUpperCase() == name.toUpperCase()
        )?.[1];
    }
}

export const countriesRepo = new CountriesRepo();
