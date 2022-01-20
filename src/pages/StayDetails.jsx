// export function StayDetails() {
//     return(
//         <section className="stay-detail">
//             Stay Details
//         </section>
//     )
// }

import React from 'react'
// import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom'

// import { Chat } from '../cmps/Chat.jsx'

import { stayService } from '../services/stay.service.js'
// import { addReview } from '../store/review.actions.js'

export class StayDetails extends React.Component {
    state = {
        stay: null,
        reviews: []
    }


    componentDidMount() {
        this.loadStay()
    }

    loadStay = () => {
        const { stayId } = this.props.match.params
        stayService.getById(stayId).then((stay) => {
            console.log('stay from details', stay)
            const reviews = [...stay.reviews]
            this.setState({ stay, reviews })
        })
        // , () => { console.log('the state after stay', this.state) }
    }

    // handleChange = ({ target }) => {
    //     const field = target.name
    //     this.setState((prevState) => ({ ...prevState, review: { ...prevState.review, [field]: target.value } }))
    // }

    // onGoBack = () => {
    //     this.props.history.push('/toy')
    // }


    // addToyReview = (ev) => {
    //     const { review, toy } = this.state
    //     ev.preventDefault()
    //     review.toyId = toy._id
    //     this.props.addReview(review)
    // }


    //ADD REVIEW MODAL (NESTED ROUTE)
    // addReviewModal = () => {

    //     console.log('modalactive!');
    //     const { toy } = this.state
    //     // TO DO : ADD USER CONNECTED!!!!!
    //     /// Dont let users that are not logged in to add review.

    //     return (
    //         <div className="add-review">
    //             <Link className="close-btn" to={`/toy/${toy._id}`}>x</Link>
    //             <h1>Add toy Review</h1>
    //             <form onSubmit={this.addToyReview}>
    //                 <label htmlFor="review-info">Your review</label>
    //                 <textarea onChange={this.handleChange} name="txt" id="review-info" cols="20" rows="10"></textarea>
    //                 <button>Submit</button>
    //             </form>
    //         </div>
    //     )

    // }

    getReviewsAvg = (reviews) => {
        const sum = reviews.reduce((acc, review) =>{
            return acc + review.rate;
          }, 0);
          
          const average = sum / reviews.length;
          
          console.log(average);
          return Number.parseFloat(average).toFixed(2)
    }



    render() {
        const { stay,reviews } = this.state
        const reviewsAvg = this.getReviewsAvg(reviews)
        

        if (!stay) return <h1>Loading...</h1>
        return (
            <div className="stay-details">
                <section className="title">
                    <h1>{stay.name}</h1>
                    <p>⭐ {reviewsAvg} ({reviews.length} reviews)</p>
                    <p>∙</p>
                    <p>{stay.loc.address}</p>
                </section>
                <section className="gallery">
                    {stay.imgUrls.map(imgUrl => <img src={imgUrl} alt="" />)}
                </section>
                {/* <section className="reviews">
                    <h2>Toy reviews:</h2>
                    <hr />
                    {toy.reviews.map(review => {
                        return <section key={review._id}>
                            <p><span>Review: </span>{review.txt}</p>
                            <p><span>Creator: </span>{review.byUser}</p>
                            <hr />
                        </section>
                    })}
                </section>
                <section className="controllers flex">
                    <button>
                        <Link className="primary-btn clean-link" to={`/toy/edit/${toy._id}`
                        }>Edit</Link>
                    </button>
                    <NavLink className="modal-link" to={`/toy/review-add`}>Add Review</NavLink>
                    <button onClick={this.onGoBack}>Back</button>
                </section>
                <Route component={this.addReviewModal} path="/toy/review-add" />
                <Chat toyId={toy._id} /> */}
            </div>

        )
    }

}


// const mapDispatchToProps = {
//     addReview
// }


// export const ToyDetails = connect(null, mapDispatchToProps)(_ToyDetails)