// Gerekli kütüphanelerin ve bileşenlerin import edilmesi
import React from "react";
import { useLoaderData, useNavigate } from "@remix-run/react"; // Remix kütüphanesinden hook'lar
import { fetchProductDetails } from "~/utils/api"; // Ürün detaylarını getiren API fonksiyonu

// Loader fonksiyonu: Ürün detaylarını API'den çeker
export async function loader({ params }: { params: { id: string } }) {
    const url = `https://mock.akakce.dev/product${params.id}.json`; // Ürün detay URL'si
    const product = await fetchProductDetails(url); // Ürün detaylarını API'den çekiyoruz

    // Ürün kapasite seçeneklerini dinamik olarak oluşturuyoruz
    product.options = product.storageOptions?.map((storageOption: number, index: number) => ({
        capacity: storageOption,
        price: product.price + index * 2000, // Fiyat, kapasiteye göre dinamik olarak hesaplanır
    })) || [];

    return product; // Ürün verilerini döndürüyoruz
}

// Ürün detay bileşeni
export default function ProductDetails() {
    const product = useLoaderData(); // Loader'dan gelen ürün verilerini alıyoruz
    const [selectedOption, setSelectedOption] = React.useState(product.options[0]); // Seçilen kapasite seçeneğini tutar
    const navigate = useNavigate(); // Geri dönüş işlemleri için navigate hook'u

    // Ürün değerlendirme yıldızlarını render eden fonksiyon
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i < rating ? "#93b8e1" : "#ccc", // Değerlendirme puanına göre yıldız rengi
                        fontSize: "1.2rem",
                    }}
                >
          ★
        </span>
            );
        }
        return stars; // Yıldızları döndürüyoruz
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "2rem" }}>

            {/* Ürün detay kartı */}
            <div style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "2rem",
                position: "relative",
                backgroundColor: "#fff",
                borderRadius: "8px"
            }}>

                {/* Geri Dön Butonu */}
                <button
                    onClick={() => navigate(-1)} // Kullanıcıyı bir önceki sayfaya yönlendirir
                    style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        padding: "0.5rem 1rem",
                        fontSize: "0.9rem",
                        color: "#fff",
                        backgroundColor: "#93b8e1",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    &larr;
                </button>

                {/* Ürün başlığı ve yıldız değerlendirmesi */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                        marginTop: "2rem",
                    }}
                >
                    <div>
                        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#66c2ed" }}>
                            {product.mkName} {/* Marka adı */}
                        </h1>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                            {product.productName} {/* Ürün adı */}
                        </h2>
                        <p
                            style={{
                                display: "inline-block",
                                fontSize: "1rem",
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "#93b8e1",
                                padding: "0.3rem 0.5rem",
                                borderRadius: "4px",
                            }}
                        >
                            {product.badge} {/* Ürün rozeti */}
                        </p>
                    </div>

                    {/* Yıldızlı değerlendirme */}
                    <div>{renderStars(product.rating)}</div>
                </div>

                {/* Ürün görseli */}
                <img
                    src={product.imageUrl}
                    alt={product.productName}
                    style={{
                        maxWidth: "250px",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                />

                {/* Ürün fiyat bilgileri ve kapasite seçenekleri */}
                <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
                    <div style={{ padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>

                        <p style={{ fontWeight: "bold", marginBottom: "0.5rem", textAlign: "center" }}>
                            Kapasite seçenekleri:
                        </p>

                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                            {product.options.map((option: { capacity: string; price: number }) => (
                                <button
                                    key={option.capacity}
                                    onClick={() => setSelectedOption(option)} // Seçilen kapasiteyi günceller
                                    style={{
                                        padding: "0.5rem 1rem",
                                        border: option.capacity === selectedOption.capacity
                                            ? "2px solid #007bff"
                                            : "2px solid #ccc",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    {option.capacity} GB {/* Depolama kapasitesi */}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Fiyat bilgisi */}
                    <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#333", marginBottom: "1rem", textAlign: "center" }}>
                        {product.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat seçeneği
                    </p>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", marginBottom: "1rem", textAlign: "center" }}>
                        {selectedOption?.price || product.price} TL
                    </p>

                    {/* Ücretsiz kargo bildirimi */}
                    {product.freeShipping && (
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
                            Ücretsiz kargo
                        </p>
                    )}

                    {/* Son güncelleme bilgisi */}
                    <p style={{ fontSize: "0.8rem", color: "#666", textAlign: "center" }}>
                        Son güncelleme: {product.lastUpdate}
                    </p>
                </div>
            </div>
        </div>
    );
}
