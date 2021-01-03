import './Home.css';
import React, { useState, useEffect } from "react";
import firebase from 'firebase/app';
import { AddPost } from "./AddPost";
import { useHistory } from "react-router-dom";

export const Home = () => {

    let history = useHistory();
    const [state, setState] = useState([]);
    const [uid, setUid] = useState<string>('');
    const [userName, setUserName] = useState<string | null>();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                setUid(user.uid);
                setUserName(user.displayName);
            }
            else {
                history.push("/");
            }
        })
    });



    useEffect(() => {
        if (!uid) {
            return;
        }
        firebase.database().ref(`posts/`).once('value', function (snapshot) {
            let postsArray: any = []
            snapshot.forEach((childSnapshot) => {
                let key = childSnapshot.key;
                let data = childSnapshot.val();
                postsArray.push({ key: key, ...data });

            });
            setState(postsArray);
        });
    }, [uid]);

    const handleLogout = (event: any) => {
        firebase.auth().signOut()
            .then(function () {
                history.push("/");
            }).catch(function (error) {
                // An error happened.
            });
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-white">
                <div className="h5">Social App</div>
                <form className="form-inline">
                    <div className="input-group">
                        <button type="button" onClick={handleLogout} className="btn btn-secondary float-right">Logout</button>
                    </div>
                </form>
            </nav>
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="h5">@{userName}</div>
                                <div className="profile-img">
                                    <img className="rounded-circle profile-img" width="45" src="https://avatars0.githubusercontent.com/u/1?v=4" alt="" />
                                </div>
                                <div className="h7 text-muted">Fullname : {userName}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 gedf-main">
                        <div className="card gedf-card">
                            <div className="card-header">

                            </div>
                            <AddPost />
                        </div>
                        <div className="">
                            {state.map((post: any) => {
                                return (
                                    <div key={post.key} className="card gedf-card">
                                        <div className="card-header">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="mr-2">
                                                        <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                                                    </div>
                                                    <div className="ml-2">
                                                        <div className="h5 m-0">@{post.author}</div>
                                                        <div className="h7 text-muted">Miracles Lee Cross</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="dropdown">
                                                        <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="fa fa-ellipsis-h"></i>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                                            <div className="h6 dropdown-header">Configuration</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="card-body">
                                            <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i></div>


                                            <p className="card-text">
                                                {post.postItem}
                                            </p>
                                        </div>
                                        <div className="card-footer">

                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    <div className="col-md-2 float-right">
                        <div className="">
                            <div className="">

                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};
export default Home;
