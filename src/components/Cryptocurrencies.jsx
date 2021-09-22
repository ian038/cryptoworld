import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

        setCryptos(filteredData)
    }, [cryptosList, search])

    if(isFetching) return <Loader />

    return (
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder="Search Cryptocurrency" onChange={e => setSearch(e.target.value)} />
                </div>  
            )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((c) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={c.id}>
                        <Link to={`/crypto/${c.id}`}>
                            <Card 
                            title={`${c.rank}. ${c.name}`}
                            extra={<img className='crypto-image' src={c.iconUrl} alt='cryptocurrency' />}
                            hoverable
                            >
                                <p>Price: {millify(c.price)}</p>
                                <p>Market Cap: {millify(c.marketCap)}</p>
                                <p>Daily Change: {millify(c.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
