export const BASE_URL: string = process.env.BASE_URL || "https://restcountries.com/v3.1"

export const endpoints = {
    all: `${BASE_URL}/all`,
    name: `${BASE_URL}/name`,
    code: `${BASE_URL}/alpha`,  
}