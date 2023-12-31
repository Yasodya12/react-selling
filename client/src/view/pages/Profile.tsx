import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart,
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

export default function Profile(){
    const fileRef = useRef(null);

    // @ts-ignore
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    let [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (file) {
    //         handleFileUpload(file);
    //     }
    // }, [file]);

    // const handleFileUpload = (file) => {
    //     const storage = getStorage(app);
    //     const fileName = new Date().getTime() + file.name;
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //
    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             const progress =
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setFilePerc(Math.round(progress));
    //         },
    //         (error) => {
    //             setFileUploadError(true);
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //                 setFormData({ ...formData })
    //             );
    //         }
    //     );
    // };



    // @ts-ignore
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`http://localhost:4000/server/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log("awa false")
                dispatch(updateUserFailure(data.message));
                return;
            }


            dispatch(updateUserSuccess(data));

            setUpdateSuccess(true);

        } catch (error) {
            console.log("awasa")
            setUpdateSuccess(false);
            // @ts-ignore
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`http://localhost:4000/server/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            // @ts-ignore
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        navigate('/sign-in');
    };


    return (
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
                <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        // // @ts-ignore
                        // onChange={(e) => setFile(e.target.files[0])}
                        // // @ts-ignore
                        // type='file' ref={fileRef}
                        // hidden={true}
                        // accept='image/*'
                    />

                    <img
                        // // @ts-ignore
                        // onClick={() => fileRef.current.click()}
                        src={currentUser.avatar}
                        alt='profile'
                        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                    />
                    <p className='text-sm self-center'>

                            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>

                    </p>
                    <input
                        type='text'
                        placeholder='username'
                        defaultValue={currentUser.username}
                        id='username'
                        className='border p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        placeholder='email'
                        id='email'
                        defaultValue={currentUser.email}
                        className='border p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='password'

                        id='password'
                        className='border p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <button
                        disabled={loading}
                        className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
                    >{loading ? 'Loading...' : 'Update'}
                    </button>

                </form>
                <div className='flex justify-between mt-5'>
        <span
            onClick={handleDeleteUser}
            className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
                    <span  onClick={handleSignOut}  className='text-red-700 cursor-pointer'>

          Sign out
        </span>
                </div>

                <p id={"error"} className='text-red-700 mt-5'>{error ? error : ''}</p>
                <p id={"successful"} className='text-green-700 mt-5'>
                    {updateSuccess ? 'User is updated successfully!' : ''}
                </p>

                {/*</p>*/}
                {/*<button  className='text-green-700 w-full'>*/}
                {/*    Show Listings*/}
                {/*</button>*/}
                {/*<p className='text-red-700 mt-5'>*/}

                {/*</p>*/}


                {/*<div className='flex flex-col gap-4'>*/}
                {/*    <h1 className='text-center mt-7 text-2xl font-semibold'>*/}
                {/*        Your Listings*/}
                {/*    </h1>*/}

                {/*    <div*/}

                {/*        className='border rounded-lg p-3 flex justify-between items-center gap-4'*/}
                {/*    >*/}



                {/*        <div className='flex flex-col item-center'>*/}
                {/*            <button*/}

                {/*                className='text-red-700 uppercase'*/}
                {/*            >*/}
                {/*                Delete*/}
                {/*            </button>*/}

                {/*        </div>*/}
                {/*    </div>*/}

                {/*</div>*/}

            </div>
        );

}