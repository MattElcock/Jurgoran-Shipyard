import { gql } from '@apollo/client'
import { omit } from 'lodash'
import { useEffect, useState } from 'react'
import { client } from '../../apollo-client'

type StarshipReturn = {
  id: string
  attributes: Starship
}

type Starship = {
  name: string
  type: string
  subtype: string
  cost: number
  requisition: boolean
  imageUrl: string
  imageAlt: string
}

export interface StarshipState extends Starship {
  id: string
}

const useListStarships = (
  type: string,
  subtype: string,
  sort: string,
  page: number
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<StarshipState[]>()
  const [totalPages, setTotalPages] = useState()
  const apiClient = client

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const response = await apiClient.query({
        query: gql`
          query Starships(
            $filters: StarshipFiltersInput
            $sort: [String]
            $pagination: PaginationArg
          ) {
            starships(filters: $filters, sort: $sort, pagination: $pagination) {
              data {
                id
                attributes {
                  name
                  type
                  subtype
                  cost
                  imageUrl
                  imageAlt
                  requisition
                }
              }
              meta {
                pagination {
                  pageCount
                }
              }
            }
          }
        `,
        variables: {
          filters: {
            ...(type && {
              type: {
                eq: type,
              },
            }),
            ...(subtype && {
              subtype: {
                eq: subtype,
              },
            }),
          },
          sort: [`cost:${sort}`],
          pagination: {
            page,
            pageSize: 10,
          },
        },
      })

      setData(
        response.data.starships.data.map(({ id, attributes }: StarshipReturn) =>
          omit(
            {
              ...attributes,
              id,
            },
            '__typename'
          )
        )
      )
      setTotalPages(response.data.starships.meta.pagination.pageCount)
      setIsLoading(false)
    }

    fetchData()
  }, [apiClient, type, subtype, sort, page])

  return { isLoading, data, totalPages }
}

export { useListStarships }
