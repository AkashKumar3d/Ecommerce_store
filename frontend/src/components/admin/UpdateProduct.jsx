import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Get_All_Product_Detail, UpdateProduct1 } from '../../Features/Productslice.js';
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom"

import "./Newproduct.css"


const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const param = useParams()
    const navigate = useNavigate();
    console.log(param.id, "params")
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { error, loading, product } = useSelector((state) => state.app)
    const { error: updatederror, loading: updatedloding, updateProduct } = useSelector((state) => state.app)

    const productId = param.id

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const updateProductImagesChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([])
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

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        // const myForm = new FormData();

        console.log(obj, "final obj")

        console.log(images)
        images.forEach((image) => {
            imgarray.push(image);
        });
        dispatch(UpdateProduct1({productId , obj}));
        // window.location.reload()
    };

    useEffect(() => {
        console.log(product, "product")
        if (product && product._id !== productId) {
            dispatch(Get_All_Product_Detail(productId));

        } else {
            console.log(product.name, product.description , product.price, product.category, product.Stock, product.images)
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
        }

        if (updatederror) {
            alert.error(updatederror)
        }

        console.log(updateProduct, "updateProductupdateProductupdateProduct")
        if (updateProduct) {
            alert.success("Product update Successfully");
            navigate("/admin/products");
            window.location.reload()
        }
        // 
    }, [loading, dispatch, error, updatederror,updateProduct, product])

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
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update  Product</h1>

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
                                value={price}
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
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
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
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct