import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin } from 'lucide-react'
import { Country } from '@/types/country'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`} passHref>
      <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/25 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold truncate">{country.name.common}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 grid gap-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Capital:</span>
            <span className="ml-1 font-medium">{country.capital?.[0] || 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Population:</span>
            <span className="ml-1 font-medium">{country.population.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}