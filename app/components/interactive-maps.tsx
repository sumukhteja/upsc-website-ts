"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Mountain, Waves, AlertCircle, ExternalLink, Crown, Building2, Scroll } from "lucide-react"

// Google Maps types
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

// Map data for different topics
const mapTopics = {
  mahajanapadas: {
    title: "16 Mahajanapadas",
    description: "Ancient Indian kingdoms (6th-4th centuries BCE)",
    icon: <Crown className="h-5 w-5" />,
    center: { lat: 24.0, lng: 78.0 },
    zoom: 4,
    tableHeaders: ["S.No", "Name", "Capital", "Rivers", "Modern Location", "Significance"],
    markers: [
      {
        position: { lat: 25.2425, lng: 86.9842 },
        title: "Anga",
        info: "Capital: Champa | Rivers: Ganga, Champa | Modern: Bhagalpur region, Bihar",
        tableData: ["1", "Anga", "Champa", "Ganga, Champa", "Bhagalpur region, Bihar", "Eastern kingdom, trade center"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 25.0961, lng: 85.4298 },
        title: "Magadha",
        info: "Capital: Rajagriha/Pataliputra | Rivers: Son, Ganga | Most powerful Mahajanapada",
        tableData: [
          "2",
          "Magadha",
          "Rajagriha/Pataliputra",
          "Son, Ganga",
          "Bihar",
          "Most powerful Mahajanapada, Mauryan empire",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 25.9909, lng: 85.1356 },
        title: "Vajji",
        info: "Capital: Vaishali | River: Gandak | First republic in world history",
        tableData: ["3", "Vajji", "Vaishali", "Gandak", "Bihar", "First republic in world history"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 26.7386, lng: 83.8936 },
        title: "Malla",
        info: "Capitals: Kusinara, Pava | River: Gandak | Buddha's Mahaparinirvana site",
        tableData: ["4", "Malla", "Kusinara, Pava", "Gandak", "Eastern UP", "Buddha's Mahaparinirvana site"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 25.3176, lng: 82.9739 },
        title: "Kashi",
        info: "Capital: Varanasi | River: Ganga | Ancient center of learning and culture",
        tableData: ["5", "Kashi", "Varanasi", "Ganga", "Uttar Pradesh", "Ancient center of learning and culture"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 27.5114, lng: 82.0534 },
        title: "Kosala",
        info: "Capital: Shravasti | River: Ghaghara (Sarayu) | Buddha spent many monsoons here",
        tableData: ["6", "Kosala", "Shravasti", "Ghaghara (Sarayu)", "Eastern UP", "Buddha spent many monsoons here"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 25.3311, lng: 81.4304 },
        title: "Vatsa",
        info: "Capital: Kausambi | River: Yamuna | Important trade center on Yamuna",
        tableData: ["7", "Vatsa", "Kausambi", "Yamuna", "Uttar Pradesh", "Important trade center on Yamuna"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 24.8318, lng: 80.0464 },
        title: "Chedi",
        info: "Capital: Shuktimati | River: Ken | Located in Bundelkhand region",
        tableData: ["8", "Chedi", "Shuktimati", "Ken", "Bundelkhand region", "Central Indian kingdom"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 28.6139, lng: 77.209 },
        title: "Kuru",
        info: "Capital: Indraprastha | River: Yamuna | Epic Mahabharata kingdom",
        tableData: ["9", "Kuru", "Indraprastha", "Yamuna", "Delhi region", "Epic Mahabharata kingdom"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 28.367, lng: 79.4304 },
        title: "Panchala",
        info: "Capitals: Ahichhatra, Kampilya | River: Ganga | Divided into North & South Panchala",
        tableData: [
          "10",
          "Panchala",
          "Ahichhatra, Kampilya",
          "Ganga",
          "Western UP",
          "Divided into North & South Panchala",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 27.0238, lng: 76.8512 },
        title: "Matsya",
        info: "Capital: Viratanagara | River: Chambal | Pandavas spent exile year here",
        tableData: ["11", "Matsya", "Viratanagara", "Chambal", "Rajasthan", "Pandavas spent exile year here"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 27.4924, lng: 77.6737 },
        title: "Surasena",
        info: "Capital: Mathura | River: Yamuna | Krishna's birthplace, Yadava kingdom",
        tableData: ["12", "Surasena", "Mathura", "Yamuna", "Uttar Pradesh", "Krishna's birthplace, Yadava kingdom"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 19.0144, lng: 77.3418 },
        title: "Assaka",
        info: "Capital: Potali | River: Godavari | Only Mahajanapada south of Vindhyas",
        tableData: ["13", "Assaka", "Potali", "Godavari", "Maharashtra", "Only Mahajanapada south of Vindhyas"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 23.1765, lng: 75.7885 },
        title: "Avanti",
        info: "Capitals: Ujjayini, Mahishmati | River: Narmada | Important trade route center",
        tableData: [
          "14",
          "Avanti",
          "Ujjayini, Mahishmati",
          "Narmada",
          "Madhya Pradesh",
          "Important trade route center",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 33.749, lng: 72.8397 },
        title: "Gandhara",
        info: "Capital: Takshashila | River: Indus | Famous ancient university center",
        tableData: [
          "15",
          "Gandhara",
          "Takshashila",
          "Indus",
          "Pakistan/Afghanistan",
          "Famous ancient university center",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 34.5553, lng: 69.2075 },
        title: "Kamboja",
        info: "Capital: Rajapura | Region: Upper Kabul river | Known for horse breeding",
        tableData: ["16", "Kamboja", "Rajapura", "Upper Kabul river", "Afghanistan", "Known for horse breeding"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  "ashokan-edicts": {
    title: "Ashokan Edicts",
    description: "Emperor Ashoka's inscriptions across his empire (3rd century BCE)",
    icon: <Scroll className="h-5 w-5" />,
    center: { lat: 24.0, lng: 78.0 },
    zoom: 4,
    tableHeaders: ["S.No", "Location", "Type", "Script", "State/Country", "Significance"],
    markers: [
      {
        position: { lat: 31.6137, lng: 65.7372 },
        title: "Kandahar",
        info: "Type: Major | Greek-Aramaic inscription | Dhamma outreach to Hellenistic world",
        tableData: [
          "1",
          "Kandahar",
          "Major Rock Edict",
          "Greek-Aramaic",
          "Afghanistan",
          "Bilingual edict, cultural synthesis",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 34.3333, lng: 73.15 },
        title: "Mansehra",
        info: "Type: Major | Rock edict in Kharosthi script | Dhamma propagation",
        tableData: ["2", "Mansehra", "Major Rock Edict", "Kharosthi", "Pakistan", "Northwestern frontier of empire"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 34.1167, lng: 71.75 },
        title: "Shahbazgarhi",
        info: "Type: Major | Earliest Kharosthi edict | Dhamma message",
        tableData: ["3", "Shahbazgarhi", "Major Rock Edict", "Kharosthi", "Pakistan", "Earliest Kharosthi edict"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 27.4728, lng: 83.2785 },
        title: "Lumbini",
        info: "Type: Major | Pillar inscription | Marks Buddha's birthplace",
        tableData: ["4", "Lumbini", "Pillar Edict", "Brahmi", "Nepal", "Buddha's birthplace, UNESCO site"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 30.5167, lng: 77.8667 },
        title: "Kalsi",
        info: "Type: Major | First discovered rock edict in India (1860)",
        tableData: ["5", "Kalsi", "Major Rock Edict", "Brahmi", "Uttarakhand", "First discovered in India (1860)"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 29.6857, lng: 77.0424 },
        title: "Topra",
        info: "Type: Major | Pillar edict later moved to Delhi",
        tableData: ["6", "Topra", "Pillar Edict", "Brahmi", "Haryana", "Later moved to Delhi by Firoz Shah"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 25.4358, lng: 81.8463 },
        title: "Allahabad",
        info: "Type: Major | Pillar reused by later rulers",
        tableData: ["7", "Allahabad", "Pillar Edict", "Brahmi", "Uttar Pradesh", "Reused by Gupta and Mughal rulers"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 25.3811, lng: 83.0311 },
        title: "Sarnath",
        info: "Type: Major | Pillar with Lion Capital (National Emblem)",
        tableData: ["8", "Sarnath", "Pillar Edict", "Brahmi", "Uttar Pradesh", "Lion Capital, National Emblem"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 21.5222, lng: 70.4579 },
        title: "Girnar",
        info: "Type: Major | Rock edict showing welfare and tolerance",
        tableData: ["9", "Girnar", "Major Rock Edict", "Brahmi", "Gujarat", "14 major rock edicts, welfare policies"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 15.1394, lng: 76.2711 },
        title: "Maski",
        info: "Type: Minor | Rock inscription with Ashoka's name",
        tableData: ["10", "Maski", "Minor Rock Edict", "Brahmi", "Karnataka", "First edict to mention 'Ashoka'"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 20.1833, lng: 85.8333 },
        title: "Dhauli",
        info: "Type: Major | Rock edict expressing remorse after Kalinga war",
        tableData: ["11", "Dhauli", "Major Rock Edict", "Brahmi", "Odisha", "Remorse after Kalinga war"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 19.8667, lng: 85.0833 },
        title: "Jaugada",
        info: "Type: Major | Rock edict | Dhamma policies",
        tableData: ["12", "Jaugada", "Major Rock Edict", "Brahmi", "Odisha", "Kalinga war aftermath policies"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  "world-organizations": {
    title: "World Organizations",
    description: "Major international organizations and their headquarters",
    icon: <Building2 className="h-5 w-5" />,
    center: { lat: 30.0, lng: 20.0 },
    zoom: 2,
    tableHeaders: ["S.No", "City", "Country", "Organizations", "Region", "Focus Area"],
    markers: [
      {
        position: { lat: 46.2044, lng: 6.1432 },
        title: "Geneva",
        info: "WTO, WIPO, WHO, WMO, WWF, WEF, IUCN, ILO, UNCTAD, UNHCR, Red Cross, ITU, UPU",
        tableData: [
          "1",
          "Geneva",
          "Switzerland",
          "WTO, WHO, WMO, ILO, UNHCR, Red Cross",
          "Europe",
          "Trade, Health, Labor, Humanitarian",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 40.7589, lng: -73.9851 },
        title: "New York",
        info: "UNO, UNSC, UN-OHRLLS, UN Women, UNICEF, UNFPA, UNDP, UNDESA",
        tableData: [
          "2",
          "New York",
          "USA",
          "UN, UNSC, UNICEF, UNDP",
          "North America",
          "Global governance, Development",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 38.8951, lng: -77.0364 },
        title: "Washington DC",
        info: "IMF, World Bank, IUPAC, Human Rights Watch",
        tableData: ["3", "Washington DC", "USA", "IMF, World Bank", "North America", "Financial governance"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 41.9028, lng: 12.4964 },
        title: "Rome",
        info: "FAO, WFP, IFAD, UNICRI, CCEX",
        tableData: ["4", "Rome", "Italy", "FAO, WFP, IFAD", "Europe", "Food security, Agriculture"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 48.2082, lng: 16.3738 },
        title: "Vienna",
        info: "IAEA, OPEC, UNIDO, UNODC",
        tableData: ["5", "Vienna", "Austria", "IAEA, OPEC, UNIDO", "Europe", "Energy, Industrial development"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 51.5074, lng: -0.1278 },
        title: "London",
        info: "Commonwealth of Nations, IMO, Amnesty International",
        tableData: ["6", "London", "UK", "Commonwealth, IMO", "Europe", "Maritime, Human rights"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 52.0705, lng: 4.3007 },
        title: "The Hague",
        info: "ICC, ICJ, OPCW",
        tableData: ["7", "The Hague", "Netherlands", "ICC, ICJ, OPCW", "Europe", "International justice, Law"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: -1.2921, lng: 36.8219 },
        title: "Nairobi",
        info: "UNEP, UN-Habitat",
        tableData: ["8", "Nairobi", "Kenya", "UNEP, UN-Habitat", "Africa", "Environment, Urban development"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 48.8566, lng: 2.3522 },
        title: "Paris",
        info: "UNESCO, ICOMOS, RSF, OECD",
        tableData: ["9", "Paris", "France", "UNESCO, OECD", "Europe", "Culture, Development"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 50.8503, lng: 4.3517 },
        title: "Brussels",
        info: "NATO",
        tableData: ["10", "Brussels", "Belgium", "NATO", "Europe", "Security alliance"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  rivers: {
    title: "Major Rivers of India",
    description: "Important rivers and their tributaries",
    icon: <Waves className="h-5 w-5" />,
    center: { lat: 24.0, lng: 78.0 },
    zoom: 4,
    tableHeaders: ["S.No", "River", "Origin", "Length (km)", "States", "Significance"],
    markers: [
      {
        position: { lat: 25.3176, lng: 82.9739 },
        title: "Ganga",
        info: "Holy river flowing through Varanasi",
        tableData: ["1", "Ganga", "Gangotri Glacier", "2525", "UK, UP, Bihar, WB", "Holy river, largest river system"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 31.634, lng: 74.8723 },
        title: "Ravi",
        info: "Tributary of Indus, flows through Punjab",
        tableData: ["2", "Ravi", "Bara Bhangal", "720", "HP, Punjab", "Indus tributary, flows through Amritsar"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 17.6868, lng: 83.2185 },
        title: "Godavari",
        info: "Largest peninsular river",
        tableData: [
          "3",
          "Godavari",
          "Trimbakeshwar",
          "1465",
          "MH, TS, AP, CG",
          "Largest peninsular river, Dakshin Ganga",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 15.8497, lng: 74.4977 },
        title: "Mandovi",
        info: "Main river of Goa",
        tableData: ["4", "Mandovi", "Western Ghats", "77", "Karnataka, Goa", "Main river of Goa, flows to Arabian Sea"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 26.9124, lng: 75.7873 },
        title: "Chambal",
        info: "Major tributary of Yamuna",
        tableData: ["5", "Chambal", "Janapav Hills", "960", "MP, Rajasthan, UP", "Major tributary of Yamuna, ravines"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  mountains: {
    title: "Mountain Ranges",
    description: "Major mountain ranges and peaks of India",
    icon: <Mountain className="h-5 w-5" />,
    center: { lat: 28.0, lng: 78.0 },
    zoom: 4,
    tableHeaders: ["S.No", "Peak", "Height (m)", "Range", "Location", "First Ascent"],
    markers: [
      {
        position: { lat: 28.0, lng: 84.0 },
        title: "Mount Everest",
        info: "World's highest peak - 8,848m",
        tableData: ["1", "Mount Everest", "8848", "Himalayas", "Nepal-Tibet border", "1953 (Hillary & Tenzing)"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 35.8825, lng: 76.5133 },
        title: "K2",
        info: "Second highest peak - 8,611m",
        tableData: ["2", "K2", "8611", "Karakoram", "Pakistan-China border", "1954 (Italian expedition)"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 10.8505, lng: 77.1533 },
        title: "Anamudi",
        info: "Highest peak in South India - 2,695m",
        tableData: ["3", "Anamudi", "2695", "Western Ghats", "Kerala", "Highest in South India"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 11.4102, lng: 76.9902 },
        title: "Doddabetta",
        info: "Highest peak in Nilgiris - 2,637m",
        tableData: ["4", "Doddabetta", "2637", "Nilgiri Hills", "Tamil Nadu", "Highest in Nilgiris"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        position: { lat: 30.3617, lng: 79.9999 },
        title: "Nanda Devi",
        info: "Highest peak entirely in India - 7,816m",
        tableData: ["5", "Nanda Devi", "7816", "Himalayas", "Uttarakhand", "1936 (British-American)"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
}

// Fallback Map Component
function FallbackMap({
  center,
  zoom,
  markers,
  title,
  hoveredMarker,
  onMarkerHover,
  onMarkerLeave,
}: {
  center: { lat: number; lng: number }
  zoom: number
  markers: Array<{ position: { lat: number; lng: number }; title: string; info: string; image?: string }>
  title: string
  hoveredMarker: number | null
  onMarkerHover: (index: number) => void
  onMarkerLeave: () => void
}) {
  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden relative">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600">Interactive Map (Fallback Mode)</p>
      </div>

      {/* Markers */}
      <div className="absolute inset-0">
        {markers.map((marker, index) => {
          // Simple positioning based on lat/lng (not accurate but visual)
          const x = ((marker.position.lng + 180) / 360) * 100
          const y = ((90 - marker.position.lat) / 180) * 100

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${Math.max(5, Math.min(95, x))}%`,
                top: `${Math.max(5, Math.min(95, y))}%`,
              }}
              onMouseEnter={() => onMarkerHover(index)}
              onMouseLeave={onMarkerLeave}
            >
              <MapPin
                className={`h-6 w-6 text-red-600 drop-shadow-lg transition-transform ${
                  hoveredMarker === index ? "scale-125" : "group-hover:scale-125"
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Instructions */}
    </div>
  )
}

// Google Maps Component with Error Handling
function GoogleMap({
  center,
  zoom,
  markers,
  onMapLoad,
  onError,
  hoveredMarker,
  onMarkerHover,
  onMarkerLeave,
}: {
  center: { lat: number; lng: number }
  zoom: number
  markers: Array<{ position: { lat: number; lng: number }; title: string; info: string; image?: string }>
  onMapLoad?: (map: any) => void
  onError?: (error: string) => void
  hoveredMarker: number | null
  onMarkerHover: (index: number) => void
  onMarkerLeave: () => void
}) {
  const [map, setMap] = useState<any>(null)
  const [googleMaps, setGoogleMaps] = useState<any>(null)
  const [mapMarkers, setMapMarkers] = useState<any[]>([])

  useEffect(() => {
    // Load Google Maps script with error handling
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBb0cDXHqoApwmZhvFeoNfgFkq-TCM7eRU&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      script.onerror = () => {
        onError?.("Failed to load Google Maps script")
      }
      document.head.appendChild(script)
    } else {
      initializeMap()
    }

    function initializeMap() {
      try {
        if (window.google && !map) {
          const mapInstance = new window.google.maps.Map(document.getElementById("google-map"), {
            center,
            zoom,
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ color: "#f5f5f5" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#000000" }, { lightness: 40 }, { weight: 1 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
              },
            ],
          })

          setMap(mapInstance)
          setGoogleMaps(window.google.maps)

          onMapLoad?.(mapInstance)
        }
      } catch (error) {
        console.error("Google Maps initialization error:", error)
        onError?.("Google Maps API not activated or quota exceeded")
      }
    }
  }, [center, zoom, onMapLoad, onError])

  // Update map center and zoom when props change
  useEffect(() => {
    if (map) {
      try {
        map.setCenter(center)
        map.setZoom(zoom)
      } catch (error) {
        console.error("Error updating map:", error)
      }
    }
  }, [map, center, zoom])

  // Update markers when they change
  useEffect(() => {
    if (map && googleMaps) {
      try {
        // Clear existing markers
        mapMarkers.forEach((marker) => marker.setMap(null))

        // Create new markers
        const newMarkers = markers.map((markerData, index) => {
          const marker = new googleMaps.Marker({
            position: markerData.position,
            map,
            title: markerData.title,
            icon: {
              path: googleMaps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#FF2D20",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          })

          marker.addListener("mouseover", () => {
            onMarkerHover(index)
          })

          marker.addListener("mouseout", () => {
            onMarkerLeave()
          })

          return marker
        })

        setMapMarkers(newMarkers)
      } catch (error) {
        console.error("Error creating markers:", error)
      }
    }
  }, [map, googleMaps, markers, onMarkerHover, onMarkerLeave])

  // Handle external hover (from table)
  useEffect(() => {
    if (hoveredMarker !== null && mapMarkers[hoveredMarker]) {
      const marker = mapMarkers[hoveredMarker]
      googleMaps.event.trigger(marker, "mouseover")
    } else if (hoveredMarker === null) {
      if (mapMarkers.length > 0) {
        mapMarkers.forEach((marker) => googleMaps.event.trigger(marker, "mouseout"))
      }
    }
  }, [hoveredMarker, mapMarkers, googleMaps])

  return <div id="google-map" className="w-full h-[800px] rounded-lg" />
}

export default function InteractiveMaps() {
  const [selectedTopic, setSelectedTopic] = useState("mahajanapadas")
  const [mounted, setMounted] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [useFallback, setUseFallback] = useState(false)
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMapLoad = useCallback((map: any) => {
    setMapLoaded(true)
    setMapError(null)
  }, [])

  const handleMapError = useCallback((error: string) => {
    setMapError(error)
    setUseFallback(true)
    setMapLoaded(true)
  }, [])

  const handleMarkerHover = useCallback((index: number) => {
    setHoveredMarker(index)
  }, [])

  const handleMarkerLeave = useCallback(() => {
    setHoveredMarker(null)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading maps...</div>
      </div>
    )
  }

  const currentTopic = mapTopics[selectedTopic as keyof typeof mapTopics]

  return (
    <div className="space-y-8">
      {/* API Error Notice */}
      {mapError && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-gray-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">Google Maps API Not Activated</h3>
              <p className="text-sm text-gray-700 mb-4">
                The Google Maps JavaScript API needs to be activated for your API key. Don't worry - the maps are still
                functional in fallback mode below!
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">To activate Google Maps API:</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>
                    Go to the{" "}
                    <a
                      href="https://console.cloud.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      Google Cloud Console
                    </a>
                  </li>
                  <li>Select your project or create a new one</li>
                  <li>Navigate to "APIs & Services" → "Library"</li>
                  <li>Search for "Maps JavaScript API" and click on it</li>
                  <li>Click "Enable" to activate the API</li>
                  <li>Refresh this page to see the full Google Maps experience</li>
                </ol>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Activate Maps API
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topic Selection */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Choose a map from the dropdown</p>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-full border-gray-300 focus:border-black focus:ring-0">
                <SelectValue placeholder="Select a map topic" />
              </SelectTrigger>
              <SelectContent className="border-gray-300 shadow-sm animate-none transition-none duration-0">
                {Object.entries(mapTopics).map(([key, topic]) => (
                  <SelectItem key={key} value={key} className="focus:bg-gray-100 focus:text-black">
                    {topic.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Map Display with Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container - Takes 2/3 of the space on large screens */}
        <Card className="border-2 border-gray-200 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {currentTopic.icon}
              {currentTopic.title}
              {useFallback && (
                <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Fallback Mode</span>
              )}
            </CardTitle>
            <p className="text-gray-600">{currentTopic.description}</p>
          </CardHeader>
          <CardContent>
            {/* Map Container */}
            <div className="relative w-full">
              {useFallback ? (
                <FallbackMap
                  center={currentTopic.center}
                  zoom={currentTopic.zoom}
                  markers={currentTopic.markers}
                  title={currentTopic.title}
                  hoveredMarker={hoveredMarker}
                  onMarkerHover={handleMarkerHover}
                  onMarkerLeave={handleMarkerLeave}
                />
              ) : (
                <>
                  <GoogleMap
                    center={currentTopic.center}
                    zoom={currentTopic.zoom}
                    markers={currentTopic.markers}
                    onMapLoad={handleMapLoad}
                    onError={handleMapError}
                    hoveredMarker={hoveredMarker}
                    onMarkerHover={handleMarkerHover}
                    onMarkerLeave={handleMarkerLeave}
                  />

                  {!mapLoaded && !mapError && (
                    <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                        <div className="text-gray-500">Loading Google Maps...</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Information Panel - Takes 1/3 of the space on large screens */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <p className="text-gray-600">Hover over markers or table rows to see details</p>
          </CardHeader>
          <CardContent>
            {hoveredMarker !== null && currentTopic.markers[hoveredMarker] ? (
              <div className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={
                      currentTopic.markers[hoveredMarker].image ||
                      "/placeholder.svg?height=300&width=500&query=map+location" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={currentTopic.markers[hoveredMarker].title}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold">{currentTopic.markers[hoveredMarker].title}</h3>
                  <p className="mt-2 text-gray-700">{currentTopic.markers[hoveredMarker].info}</p>
                </div>

                <div className="mt-4 space-y-2">
                  {currentTopic.markers[hoveredMarker].tableData &&
                    currentTopic.markers[hoveredMarker].tableData.slice(1).map((data, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2 border-b border-gray-100 py-2">
                        <span className="text-sm font-medium text-gray-500">
                          {currentTopic.tableHeaders[index + 1]}
                        </span>
                        <span className="text-sm text-gray-900">{data}</span>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <MapPin className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500">No location selected</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Hover over a marker on the map or a row in the table below to see details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Excel-like Data Table */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle>Detailed Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {currentTopic.tableHeaders.map((header, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTopic.markers.map((marker, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${hoveredMarker === index ? "bg-blue-50" : ""} hover:bg-blue-50 transition-colors cursor-pointer`}
                    onMouseEnter={() => handleMarkerHover(index)}
                    onMouseLeave={handleMarkerLeave}
                  >
                    {marker.tableData.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
