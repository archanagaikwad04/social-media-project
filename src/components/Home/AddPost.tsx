import './Home.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import firebase from 'firebase/app';

export const AddPost = () => {
    let uid = '';
    const db = firebase.database();
    const [state, setState] = useState({
        post: '',
        createdAt: 0,
    });
    const [userName, setUserName] = useState<string | null>();
    const handleChange = (event: any) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });

    };
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            uid = user.uid;
            setUserName(user.displayName);
        }
    })
    const handleSubmit = (evt: any) => {
        console.log(state.post);
        evt.preventDefault();
        db.ref(`/posts/`).push({
            author: userName,
            uid: uid,
            postItem: state.post,
            starCount: 0,
            createdAt: new Date().getTime()
        });
    };

    return (

        <div className="card-body">
            <Form onSubmit={handleSubmit}>
                <div className="" id="myTabContent">

                    <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                        <div className="form-group">
                            <label className="sr-only" ></label>
                            <textarea className="form-control" id="post" name="post" onChange={handleChange} placeholder="What are you thinking?"></textarea>
                        </div>
                    </div>

                </div>
                <div className="btn-toolbar justify-content-between">
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary">share</button>
                    </div>
                    <div className="btn-group">
                        <button id="btnGroupDrop1" type="submit" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <i className="fa fa-globe"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                            <span className="dropdown-item" > <i className="fa fa-globe"></i> Public</span>
                            <span className="dropdown-item"> <i className="fa fa-users"></i> Friends</span>
                            <span className="dropdown-item"><i className="fa fa-user"></i> Just me</span>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default AddPost;
