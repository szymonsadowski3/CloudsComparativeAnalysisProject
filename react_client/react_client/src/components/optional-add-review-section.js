import './styles/optional-add-review-section.css';
import React, {Component} from "react";

import {Rate, Skeleton, Input, Button, Popconfirm, message } from 'antd';
import {addReview, canUserRateProduct, whatProductsUserAlreadyRated} from "../api/custom-queries";
import includes from "lodash/includes";
import {getCurrentUser} from "../common/session";

export default class OptionalAddReviewSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            canUserRate: false,
            hasUserAlreadyRated: false,

            userRating: 0,
            userComment: '',
        }
    }

    makeRequestsNeededForCheckingIfUserAlreadyRated = () => {
        const promisesToRequest = [
            canUserRateProduct(getCurrentUser(), parseInt(this.props.productId)),
            whatProductsUserAlreadyRated(getCurrentUser())
        ];

        Promise.all(promisesToRequest).then(responses => {
            this.setState({
                canUserRate: responses[0],
                hasUserAlreadyRated: (
                    includes(
                        responses[1],
                        parseInt(this.props.productId)
                    )
                ),
                isLoading: false
            });
        });
    };

    componentDidMount() {
        if(getCurrentUser()) {
            this.makeRequestsNeededForCheckingIfUserAlreadyRated();
        } else {
            this.setState({
                isLoading: false,
            })
        }
    }

    render() {
        if(this.state.isLoading) {
            return <Skeleton active />
        } else {
            return this.renderReviewSection();
        }
    }

    submitReview = () => {
        addReview(
            this.props.productId,
            getCurrentUser(),
            this.state.userRating,
            this.state.userComment,
        ).then(response => {
            console.dir(response);
            message.success('Submitted the review');
            window.location.reload();
        });
    };

    renderReviewSection() {
        if(this.state.hasUserAlreadyRated) {
            return <h3>You've already rated this product</h3>
        }

        if(this.state.canUserRate) {
            return <div className="optional-add-review-section-wrapper">
                <h3>Review this product</h3>
                <div className="your-rating-section">
                    <div className="star-rating">
                        <span>Select your rating: </span>
                        <Rate value={this.state.userRating} onChange={value => {
                            this.setState({
                                userRating: value
                            });
                        }} />
                    </div>

                    <div className="comment-section">
                        <span>Write your comment:</span>
                        <Input.TextArea
                            rows={2}
                            value={this.state.userComment}
                            onChange={event => {
                                this.setState({
                                    userComment: event.target.value
                                })
                            }}
                        />
                    </div>

                    <Popconfirm
                        title="Are you sure you want to submit the review?"
                        onConfirm={this.submitReview}
                        onCancel={() => {message.success('canceled')}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className='submit-your-rating-button'
                            type="primary"
                        >
                            Submit your rating
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        } else {
            return <div>
                <h3>You cannot rate this product, because you've never bought it.</h3>
            </div>;
        }

    }
}