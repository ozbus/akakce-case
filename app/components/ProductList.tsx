import React, { useState, useEffect } from "react";
import { Link } from "@remix-run/react"; // Sayfalar arası geçiş için Remix Link bileşenini import ediyoruz
import { Product } from "~/models/product"; // Product modelini import ediyoruz

interface Props {
    initialProducts: Product[]; // İlk yüklenmede gelen ürünler
    nextUrl: string | null; // Daha fazla ürün getirmek için kullanılacak URL
}

export default function ProductList({ initialProducts, nextUrl }: Props) {
    const [products, setProducts] = useState(initialProducts); // Ürünlerin listesini tutan state
    const [next, setNext] = useState(nextUrl); // Sonraki sayfa URL'sini tutan state

    /**
     * Daha fazla ürün yüklenmesi için API isteği yapar.
     * Gelen yeni ürünleri mevcut listeye ekler.
     */
    const loadMore = async () => {
        if (!next) return; // Sonraki URL yoksa işlem yapma
        const response = await fetch(next); // API isteği yapılır
        const data = await response.json(); // JSON verisi çözülür
        setProducts([...products, ...data.productList]); // Mevcut ürün listesine yeni ürünleri ekle
        setNext(data.nextUrl); // Yeni next URL'sini ayarla
    };

    /**
     * Scroll olayını takip eder ve kullanıcı sayfanın altına ulaştığında loadMore fonksiyonunu çağırır.
     */
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                loadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [next]);

    return (
        <div style={{ backgroundColor: "#f5f5f5", padding: "2rem" }}>
            {/* Ürünlerin bulundugu grid alanı */}
            <div
                style={{
                    display: "grid", // Grid layout kullanılır
                    gridTemplateColumns: "repeat(2, 1fr)", // 2 kolonluk ürün dizilimi
                    gap: "1.5rem", // Her bir ürün arasındaki boşluk
                }}
            >
                {products.map((product) => (
                    <Link
                        key={product.code} // React listesi için benzersiz anahtar
                        to={`/product/${product.code}`} // Ürün detay sayfasına geçiş
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            style={{
                                backgroundColor: "#ffffff",
                                padding: "1rem",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                height: "450px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* İndirim Rozeti */}
                            <p
                                style={{
                                    margin: "0 0 10px 10px",
                                    backgroundColor: "red",
                                    borderRadius: "50px",
                                    color: "white",
                                    padding: "5px 10px",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    alignSelf: "flex-start", // Rozeti sol üst köşeye hizala
                                }}
                            >
                                %{product.dropRatio}
                            </p>

                            {/* Ürün Resmi */}
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{
                                    maxHeight: "200px",
                                    margin: "0 auto",
                                    objectFit: "contain",
                                    borderRadius: "8px",
                                }}
                            />

                            {/* Ürün Bilgisi */}
                            <h3
                                style={{
                                    fontSize: "1rem",
                                    margin: "0.5rem 0",
                                    color: "#66c2ed",
                                    textAlign: "center",
                                }}
                            >
                                {product.name}
                            </h3>

                            {/* Fiyat, Satıcı ve Takipçi Bilgisi */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0.3rem"
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                        color: "#333",
                                        margin: "0",
                                    }}
                                >
                                    {product.price} TL
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "#666",
                                        margin: "0",
                                    }}
                                >
                                    {product.countOfPrices} satıcı &gt;
                                </p>

                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "#666",
                                        margin: "0",
                                    }}
                                >
                                    {product.followCount}+ takip
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
