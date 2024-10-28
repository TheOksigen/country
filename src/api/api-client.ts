import { Country } from '../types/country';
import { endpoints } from './endpoints.ts';

export const countryApi = {
    async getAllCountries(): Promise<Country[]> {
        try {
            const response = await fetch(endpoints.all);
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    },


    async getCountryByCode(code: string): Promise<Country> {
        try {
            const response = await fetch(`${endpoints.code}/${code}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch country with code: ${code}`);
            }
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error(`Error fetching country with code ${code}:`, error);
            throw error;
        }
    },

};