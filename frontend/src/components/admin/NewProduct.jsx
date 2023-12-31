import React, { Fragment, useEffect, useState } from "react";
import "./Newproduct.css"
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { getAdminProducts, CreateNewProduct } from '../../Features/Productslice.js';

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const { error, loading, newproduct } = useSelector((state) => state.app)


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);


        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };


            reader.readAsDataURL(file);
        });
    };
    var imgarray = []

    const img = imagesPreview.map((url, index) => ({
        public_id: `image${index + 1}`,
        url: url
    }));
    const obj = {
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "Stock": Stock,
        "images": img
    }

    console.log(obj, "object")

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        // const myForm = new FormData();

        console.log(obj, "final obj")

        console.log(images)
        images.forEach((image) => {
            imgarray.push(image);
        });
        dispatch(CreateNewProduct(obj));
    };

    useDispatch(() => {
        if (error) {
            alert.error(error);
        }

        if (newproduct) {
            alert.success("Product Created Successfully");
            history.push("/admin/dashboard");
        }
        // 
    }, [loading, error, newproduct])

    console.log(imagesPreview, "all image preview")

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct