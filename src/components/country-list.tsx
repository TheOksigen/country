'use client'

import React, { useState, useEffect } from 'react'
import { Country } from '../types/country'
import { CountryCard } from './country-card'
import { Button } from "./ui/button"
import { useToast } from "../hooks/use-toast"
import { Loader2 } from "lucide-react"
import { countryApi } from '../api/api-client'

export function CountryList() {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCountries()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCountries = async () => {
    try {
      setIsLoading(true)
      toast({
        title: "Fetching countries",
        description: "Please wait while we load the data.",
      })
      const data = await countryApi.getAllCountries()
      setCountries(data)
      toast({
        title: "Countries loaded",
        description: `Successfully loaded ${data.length} countries.`,
        variant: "default",
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch countries. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Countries of the World</h1>
      {countries.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No countries found. Please try again.</p>
          <Button onClick={fetchCountries}>Retry</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}