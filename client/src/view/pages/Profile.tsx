import {Component, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from "../../firebase";
export default function Profile(){
    // @ts-ignore
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);
    // @ts-ignore
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // const [filePerc, setFilePerc] = useState(0);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // setFilePerc(Math.round(progress));
                console.log("upload is "+progress+"done");
            },
            // (error) => {
            //     setFileUploadError(true);
            // },
            // () => {
            //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            //         setFormData({ ...formData, avatar: downloadURL })
            //     );
            // }
        );
    };

    return (
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
                <form  className='flex flex-col gap-4'>
                    <input
                        // @ts-ignore
                        onChange={(e) => setFile(e.target.files[0])}
                        // @ts-ignore
                        type='file' ref={fileRef}
                        hidden={true}
                        accept='image/*'
                    />

                    <img
                        // @ts-ignore
                        onClick={() => fileRef.current.click()}
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

                        id='username'
                        className='border p-3 rounded-lg'

                    />
                    <input
                        type='email'
                        placeholder='email'
                        id='email'

                        className='border p-3 rounded-lg'

                    />
                    <input
                        type='password'
                        placeholder='password'

                        id='password'
                        className='border p-3 rounded-lg'
                    />
                    <button

                        className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
                    >Update
                    </button>

                </form>
                <div className='flex justify-between mt-5'>
        <span

            className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
                    <span  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
                </div>

                {/*<p className='text-red-700 mt-5'></p>*/}
                {/*<p className='text-green-700 mt-5'>*/}

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