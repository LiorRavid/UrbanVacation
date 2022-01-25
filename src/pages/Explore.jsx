import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { StayList } from '../cmps/StayList.jsx'
import { Filter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'



class _Explore extends React.Component {

    componentDidMount() {
        this.scrollUp();
        this.getStays();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.getStays()
        }
    }

    scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    getStays = () => {
        const filterBy = queryString.parse(this.props.location.search)
        console.log(filterBy)
        this.props.loadStays(filterBy)
    }

    onSetPriceRange = (filterBy) => {
        this.props.history.push(`/explore?location=${filterBy.location}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}`);
    }

    render() {
        const {stays} = this.props
        const location = queryString.parse(this.props.location.search).location
        console.log(location)
        const trip = ''
        if (!stays) return <React.Fragment />
        else if (stays.length === 0) {
            return (
                <React.Fragment>
                    <span className="stays-number">{0} stays </span>
                    <h3>No search results, find other place to stay</h3>
                </React.Fragment>
            )
        } else {
            const imgUrl = stays[0].imgUrls[0]
            return (
                <section className="explore-container">
                <span className="stays-number">{stays.length} stays </span>
                <h1>Find place to stay in {location}</h1>
                <Filter onSetPriceRange={this.onSetPriceRange}/>
                <StayList stays={stays}/>
            </section>
        )
        }
    }
}

function mapStateToProps({ stayModule }) {
    return {
        stays: stayModule.stays,
    }
}

const mapDispatchToProps = {
    loadStays,
}


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)

