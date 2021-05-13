import React, { useEffect, useState, useRef } from 'react';
import useApi from 'components/utils/useApi'
import { Link } from 'react-router-dom';
import PromotionList from '../List/List';
import UIInfiniteScroll from '../../UI/InfiniteScroll/InfiniteScroll';
import './Search.css';

const baseParams = {
  _embed: 'comments',
  _order: 'desc',
  _sort: 'id',
  _limit: 2,
}

const PromotionSearch = () => {
  const [page, setPage] = useState(1)
  const mountRef = useRef(null)
  const [search, setSearch] = useState('')
  const [load, loadInfo] = useApi({
    debounceDelay: 300,
    url: '/promotions',
    method: 'get',
  })

  useEffect(() => {
    load({
      debouced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined,
      }
    })

    if (!mountRef.current) {
      mountRef.current = true
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  function fetchMore() {
    const newPage = page + 1
    load({
      isFetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },
      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [
          ...prevRequestInfo.data,
          ...newRequestInfo.data,
        ]
      })
    })

    setPage(newPage)
  }

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>Promo Show</h1>
        <Link to="/create">Nova Promoção</Link>
      </header>
      <input
        type="search"
        className="promotion-search__input"
        placeholder="Buscar"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
      {loading.data &&
        !loadInfo.loading &&
        loadInfo.data?.length < loadInfo.total(
          <UIInfiniteScroll fetchMore={fetchMore} />
        )
      }
    </div>
  )
}

export default PromotionSearch;