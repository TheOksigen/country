'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Country } from '@/types/country'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Loader2, Globe, Users, MapPin, Languages, Currency, Flag, Mountain, Clock, Car, CalendarCheck, Building, Waves, ExternalLink } from "lucide-react"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast'
import { countryApi } from '@/api/api-client'

export function CountryDetail() {
    const [country, setCountry] = useState<Country | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
    const params = useParams()
    const countryCode = params.id as string

    useEffect(() => {
        fetchCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryCode])

    const fetchCountry = async () => {
        try {
            setIsLoading(true)
            toast({
                title: "Fetching country details",
                description: "Please wait while we load the data.",
            })
            const data = await countryApi.getCountryByCode(countryCode)
            setCountry(data)
            toast({
                title: "Country details loaded",
                description: `Successfully loaded details for ${data.name.common}.`,
                variant: "default",
            })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to fetch country details. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }


  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6000000!2d${country?.latlng[1]}!3d${country?.latlng[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1730075555550!5m2!1sen!2sus`

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!country) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Country Not Found</h1>
                <p className="mb-4">Sorry, we couldn&apos;t find the country you&apos;re looking for.</p>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="overflow-hidden">
                <div className="relative h-64 md:h-96 w-full">
                    <Image
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-current   mb-2">{country.name.common}</h1>
                        <p className="text-xl text-current">{country.name.official}</p>
                    </div>
                </div>
                <CardContent className="p-6">
                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="w-full flex ">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="symbols">Symbols</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <InfoItem icon={Globe} label="Region" value={`${country.subregion}, ${country.region}`} />
                                <InfoItem icon={MapPin} label="Capital" value={country.capital?.[0] || 'N/A'} />
                                <InfoItem icon={Users} label="Population" value={country.population.toLocaleString()} />
                                <InfoItem icon={Building} label="UN Member" value={country.unMember ? 'Yes' : 'No'} />
                                <InfoItem icon={Currency} label="Currencies" value={Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')} />
                                <InfoItem icon={Flag} label="Top Level Domain" value={country.tld.join(', ')} />
                                <InfoItem icon={Mountain} label="Area" value={`${country.area.toLocaleString()} km²`} />
                                <InfoItem icon={Waves} label="Landlocked" value={country.landlocked ? 'Yes' : 'No'} />
                                <InfoItem icon={Clock} label="Timezones" value={country.timezones.join(', ')} />
                                <InfoItem icon={Car} label="Driving Side" value={country.car.side} />
                                <InfoItem label="Latitude" value={country.latlng[0].toString()} />
                                <InfoItem label="Longitude" value={country.latlng[1].toString()} />
                                <InfoItem icon={Languages} label="Languages" value={Object.values(country.languages).join(', ')} />
                                <InfoItem icon={CalendarCheck} label="Start of Week" value={country.startOfWeek} />
                                <InfoItem label="Demonyms" value={`${country.demonyms.eng.m} (m), ${country.demonyms.eng.f} (f)`} />
                                <InfoItem label="Alternative Spellings" value={country.altSpellings.join(', ')} />
                            </div>
                        </TabsContent>
                        <TabsContent value="symbols" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Flag</h3>
                                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg shadow-lg">
                                        <Image
                                            src={country.flags.svg}
                                            alt={`Flag of ${country.name.common}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Coat of Arms</h3>
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg bg-white">
                                        <Image
                                            src={country.coatOfArms.svg}
                                            alt={`Coat of Arms of ${country.name.common}`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="map" className="mt-6">
                            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                            
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={mapSrc}
                                ></iframe>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">External Maps</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={country.maps.googleMaps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                <Globe className="mr-2 h-4 w-4" />
                                Google Maps
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                            <Link
                                href={country.maps.openStreetMaps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                <Globe className="mr-2 h-4 w-4" />
                                OpenStreetMap
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button onClick={() => window.history.back()}>Go Back</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

interface InfoItemProps {
    icon?: React.ElementType
    label: string
    value: string
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
    return (
        <div className="flex items-start space-x-3">
            {Icon && <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />}
            <div>
                <span className="font-medium">{label}:</span>
                <span className="ml-1">{value}</span>
            </div>
        </div>
    )
}