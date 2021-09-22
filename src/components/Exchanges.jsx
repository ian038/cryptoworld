import React from 'react'
import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoApi';
import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery()
    const exchangeList = data?.data?.exchanges

    if(isFetching) return <Loader />

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangeList.map(ex => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                            key={ex.id}
                            showArrow={false}
                            header={(
                                <Row key={ex.id}>
                                    <Col span={6}>
                                        <Text><strong>{ex.rank}</strong></Text>
                                        <Avatar className='exchange-image' src={ex.iconUrl} alt='Exchange Icon'/>
                                        <Text><strong>{ex.name}</strong></Text>
                                    </Col>
                                    <Col span={6}>${millify(ex.volume)}</Col>
                                    <Col span={6}>{millify(ex.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(ex.marketShare)}%</Col>
                                </Row>
                            )}
                            >
                                {HTMLReactParser(ex.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges
