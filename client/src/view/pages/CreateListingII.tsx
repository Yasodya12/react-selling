import img from "../../img/Sample_User_Icon.png";
import React, {ChangeEvent, useState} from "react";
import {app} from "../../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const storeImage = async (file: File): Promise<string> => {
    // Your implementation...
    return Promise.resolve(''); // Replace with your actual implementation
};

interface FormData {
    imageUrls: string[];
}

export function CreateListingII() {

    const [files, setFiles] = React.useState<File[]>([]);
    const [formData, setFormData] = React.useState<FormData>({ imageUrls: [] });
    const [imageUploadError, setImageUploadError] = useState<any>(null);
    let [uploading, setUploading] = useState(false);

    console.log(formData);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            // Convert FileList to an array
            const filesArray = Array.from(selectedFiles);

            // Use the functional form of setFiles with prevState
            setFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };



    const handleImageSubmit = () => {

        if (files.length > 0 && files.length  + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises: Promise<string>[] = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    imageUrls: prevFormData.imageUrls.concat(urls),
                }));

                setImageUploadError(false);
                setUploading(false)
            })
                .catch((err) => {
                    setImageUploadError("Image size in maximum 10mb");
                    setUploading(false)
                });
        }else {
            console.log("else")
            setImageUploadError("You can upload only 6 images for listing")
            setFiles([]);
            setUploading(false)
        }
    };



    const storeImage = async (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };


    // @ts-ignore
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };


    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Create a Listing
            </h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='border p-3 rounded-lg'
                        id='name'
                        maxLength={62}
                        minLength={10}
                        required

                    />
                    <textarea
                        typeof='text'
                        placeholder='Description'
                        className='border p-3 rounded-lg'
                        id='description'
                        required

                    />
                    <input
                        type='text'
                        placeholder='Address'
                        className='border p-3 rounded-lg'
                        id='address'
                        required

                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'

                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'

                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'

                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'

                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'

                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bedrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg'

                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg'

                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='regularPrice'
                                min='50'
                                max='10000000'
                                required
                                className='p-3 border border-gray-300 rounded-lg'

                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>

                                <span className='text-xs'>(LKR / month)</span>

                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='discountPrice'
                                min='0'
                                max='10000000'
                                required
                                className='p-3 border border-gray-300 rounded-lg'

                            />
                            <div className='flex flex-col items-center'>
                                <p>Discounted price</p>


                                <span className='text-xs'>(LKR / month)</span>

                            </div>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
                    </p>
                    <div className='flex gap-4'>
                        <input

                            onChange={handleFileChange}
                            className='p-3 border border-gray-300 rounded w-full'
                            type='file'
                            id='images'
                            accept='image/*'
                            multiple
                        />
                        <button
                            type='button'
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>

                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={url}
                                    alt='listing image'
                                    className='w-20 h-20 object-contain rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    <button
                        onClick={handleImageSubmit}
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        Create listing
                    </button>

                </div>
            </form>
        </main>
    );
}