import { gql } from '@apollo/client'
import { client } from 'apollo-client'
import { useState, useEffect } from 'react'

type Weapon = {
  data: {
    attributes: {
      name: string
    }
  }
}

type Armament = {
  quantity: number
  weapon: Weapon
}

type Starship = {
  name: string
  type: string
  subtype: string
  cost: number
  requisition: boolean
  imageUrl: string
  imageAlt: string
  description: string
  armament: Armament[]
}

type StarshipReturn = {
  starship: {
    data: {
      id: number
      attributes: Starship
    }
  }
}

const useGetStarship = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Starship>()
  const apiClient = client

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const response = await apiClient.query<StarshipReturn>({
        query: gql`
          query Starship($id: ID) {
            starship(id: $id) {
              data {
                id
                attributes {
                  name
                  type
                  subtype
                  cost
                  imageUrl
                  imageAlt
                  description
                  requisition
                  armament {
                    quantity
                    weapon {
                      data {
                        attributes {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          id,
        },
      })

      setData(response.data.starship.data.attributes)
      setIsLoading(false)
    }

    fetchData()
  }, [apiClient, id])

  return { isLoading, data }
}

export { useGetStarship }
