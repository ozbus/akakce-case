import React, { useState, useRef } from "react";
import { Link } from "@remix-run/react"; // Sayfalar arasi gezinme icin Link bileşenini import ediyoruz
import { Product } from "~/models/product";

export default function HorizontalScroller({ products }: { products: Product[] }) {
    // Aktif sayfalama göstergesinin index'ini takip eden state
    const [activeIndex, setActiveIndex] = useState(0);

    // Kaydirilabilir konteynerı referans alır
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Scroll olayını yakalayan fonksiyon.
     * Scroll konumuna göre mevcut ürün index'ini hesaplar.
     */
    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const container = e.currentTarget;
        const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
        setActiveIndex(currentIndex); // Aktif index'i günceller
    };

    /**
     * Sayfalama göstergesine tıklanıldığında çalışan fonksiyon.
     * Konteynerı tıklanılan ürünün bulundugu konuma kaydırır.
     *
     * @param {number} index - Tıklanılan ürünün index'i
     */
    const handlePaginationClick = (index: number) => {
        setActiveIndex(index); // Aktif sayfalama index'ini ayarla
        const container = containerRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth * index; // Kaydırma miktarını hesapla
            container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth', // Yumuşak kaydırma efekti
            });
        }
    };

    return (

        <div style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
            {/* Scrollable Area */}
            <div
                ref={containerRef} // Konteynerın referansı
                style={{
                    display: "flex",
                    overflow: "hidden", // Scroll çubuğunu gizle
                    scrollSnapType: "x mandatory",
                    gap: "1rem",
                    padding: "1rem 0",
                    width: "100%",
                }}
            >
                {products.map((product, index) => (
                    <div
                        key={product.code} // React listesi için benzersiz anahtar
                        style={{
                            flex: "0 0 100%", // Her bir ürünün konteynerin %100'ünü kaplaması
                            scrollSnapAlign: "center", // Ürünü merkeze hizala
                        }}
                    >
                        <Link
                            to={`/product/${product.code}`} // Ürün detay sayfasına geçiş yapar
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "0.3rem",
                                marginTop: "1rem",
                                textDecoration: "none", // Link alt çizgisini kaldır
                                color: "inherit", // Yazı rengini miras al
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    textAlign: "left",
                                    width: "100%",
                                    maxWidth: "300px",
                                    minHeight: "230px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* Resim ve Metin Kısmı */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    {/* Ürün Resmi */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "contain",
                                            borderRadius: "8px",
                                        }}
                                    />

                                    {/* Ürün Bilgi Kısmı */}
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p style={{backgroundColor:"red", borderRadius: "50px", color:"white", paddingTop:"3px", paddingLeft:"3px",  paddingBottom:"3px", width:"50px"}}> % {product.dropRatio}</p>
                                        <h3 style={{ fontSize: "1rem", margin: "0.5rem 0", color:"#66c2ed" }}>{product.name}</h3>
                                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>{product.price} TL</p>
                                        <p style={{ fontSize: "0.9rem", color: "#666" }}>{product.countOfPrices} satıcı &gt;</p>
                                        <p style={{ fontSize: "0.9rem", color: "#666" }}>{product.followCount}+ takip</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Sayfalama Göstergeleri */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "0.3rem",
                                marginTop: "1rem",
                            }}
                        >
                            {products.map((_, indicatorIndex) => (
                                <div
                                    key={indicatorIndex} // Her sayfa göstergesi için benzersiz anahtar
                                    onClick={() => handlePaginationClick(indicatorIndex)} // Sayfalama olayını tetikler
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: indicatorIndex === activeIndex ? "#007bff" : "#ccc",
                                        transition: "background-color 0.3s ease",
                                        cursor: "pointer", // Hover'da pointer işareti
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
