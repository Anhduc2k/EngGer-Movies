import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import { OutlineButton } from '../button/Button'
import MovieCard from '../movie-card/MovieCard'
import './movie-grid.scss'

export default function MovieGrid(props) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState([1])
  const [totalPage, setTotalPage] = useState([0])

  const { keyword } = useParams()

  useEffect(() => {
    const getList = async () => {
      let response = null
      if (keyword === undefined) {
        const params = {}
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params
            })
            break
          default:
            response = await tmdbApi.getMoviesList(tvType.popular, { params })
        }
      } else {
        const params = { query: keyword }
        response = await tmdbApi.search(props.category, { params })
      }
      setItems(response.results.reverse())
      setTotalPage(response.total_pages)
    }
    getList()
  }, [props.category, keyword])

  const loadMore = async () => {
    let response = null
    if (keyword === undefined) {
      const params = {
        page: page + 1
      }
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params
          })
          break
        default:
          response = await tmdbApi.getMoviesList(tvType.popular, { params })
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword
      }
      response = await tmdbApi.search(props.category, { params })
    }
    setItems([...items, ...response.results])
    setPage(page + 1)
  }
  return (
    <>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard category={props.category} item={item} key={index} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  )
}
