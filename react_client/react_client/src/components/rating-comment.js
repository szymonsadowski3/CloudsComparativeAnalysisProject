import React, {Component} from "react";
import {Avatar, Comment, Rate} from "antd";


export default class RatingComment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.user);

        return <Comment
            author={
                <div>
                    <span>{this.props.user.username}</span> rated <Rate
                        allowHalf
                        value={this.props.rating}
                        disabled={true}
                    />
                </div>}
            avatar={
                <Avatar
                    src={this.props.user.avatarUrl}
                    alt="Han Solo"
                />
            }
            content={
                <p>{this.props.comment}</p>
            }
        />
    }
}