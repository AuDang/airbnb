const LOAD_REVIEWS = '/reviews/LOAD_REVIEWS'
const ADD_REVIEW = '/reviews/ADD_REVIEW'
const REMOVE_REVIEW = '/reviews/REMOVE_SPOT'

const loadReviews = reviews => (
    {
        type: LOAD_REVIEWS,
        reviews
    }
)

const loadReview = review => (
    {
        type: ADD_REVIEW,
        review
    }
)

const removeReview = review => (
    {
        type: REMOVE_REVIEW,
        review
    }
)


export const getReviews = () => async dispatch => {
    const res = await fetch('/api/reviews/')
    if (res.ok) {
        const reviews = await res.json()
        dispatch(loadReviews(reviews))
        return null
    }
    return res
}

export const addReview = (payload) => async dispatch => {
    const res = await fetch(`/api/reviews/spot/${payload.spot_id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(loadReview(review))
        return review
    } else if (res.status < 500) {
        const data = await res.json()
        if (data) {
            return data
        }
    }
}

export const editReview = (payload) => async dispatch => {
    const res = await fetch(`/api/reviews/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(loadReview(review))
        return review
    } else if (res.status < 500) {
        const data = await res.json()
        if (data) {
            return data
        }
    }
}


export const deleteReview = (id) => async dispatch => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(removeReview(review))
        return review
    }
}



const reviewReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS: {
            newState = { ...state };
            action.reviews.forEach(review => newState[review.id] = review);
            return newState
        }
        case ADD_REVIEW: {
            newState = { ...state };
            newState[action.review.id] = action.review
            return newState
        }
        case REMOVE_REVIEW: {
            newState = { ...state };
            delete newState[action.review.id]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer