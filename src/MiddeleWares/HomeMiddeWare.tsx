import React from "react";
import axios from "axios";
import { ProductListParams, FetchProductsParam } from "../TypesCheck/HomeProps";


interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

interface ITrendingProductProps {
    setTrendingProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

export const fetchTrendingProducts = async ({setTrendingProducts} : ITrendingProductProps) => {
    try {
        const response: FetchProductsParam = await axios.get("http://10.106.20.70:9000/product/getTrendingProducts");
        console.log("API Response: ", response.data);

        if(Array.isArray(response.data)){
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => 
                    img.replace("http://localhost", "http://10.106.20.70")
                ) 
            }));

            setTrendingProducts(fixedData);
        } else {
            console.warn("fetchCategories: Du lieu API khong phai la mang", response.data);
            setTrendingProducts([]);
        }
    } catch (error) {
        console.log("axios get error", error);
        setTrendingProducts([]);
    }
}

export const fetchCategories = async ({ setGetCategory}: ICatProps) => {
    try {
        const response = await axios.get("http://10.106.20.70:9000/category/getAllCategories");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map((item) => ({
              ...item,
              images: item.images.map((img: string) =>
                img.replace("http://localhost", "http://10.106.20.70")
              ),
            }));
            setGetCategory(fixedData);
        } else {
            console.warn("fetchCategories: Du lieu API khong phai la mang", response.data);
            setGetCategory([]);
        }
    } catch (error) {
        console.log("axios get error", error)
        setGetCategory([]);
    }
};

export const fetchProductsByCatID = async ({ setGetProductsByCatID, catID}: IProdByCatProps) => {
    try {
        const response: FetchProductsParam = await axios.get(`http://10.106.20.70:9000/product/getProductByCatID/${catID}`);
        console.log("API Response: ", response.data);

        if(Array.isArray(response.data)){
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => 
                    img.replace("http://localhost", "http://10.106.20.70")
                )
            }));

            setGetProductsByCatID(fixedData);
        } else {
            console.warn("fetchProductsByCatID: Du lieu API khong phai la mang", response.data);
            setGetProductsByCatID([]);
        }
    } catch (error) {
        console.log("axios get error", error);
        setGetProductsByCatID([]);
    }
}


