import { useState, useEffect } from "react";

import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";


export default function Home() {

  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch('/api/restaurants/restaurant')
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data.data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <SearchBar />
      <Table restaurants={restaurants} />
    </>
  )
}
