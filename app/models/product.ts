// Ürün arayüzü: Tüm ürünler için temel yapıyı tanımlar
export interface Product {
    code: number; // Ürün kodu
    name: string; // Ürün adı
    imageUrl: string; // Ürün görselinin URL'si
    dropRatio: number; // İndirim oranı (%)
    price: number; // Ürün fiyatı
    countOfPrices: number; // Fiyat seçenek sayısı
    followCount: number; // Ürünü takip eden kullanıcı sayısı
    url: string; // Ürün detay URL'si
}

// Ürün seçeneği arayüzü: Örneğin farklı depolama seçenekleri
export interface ProductOption {
    capacity: number; // Depolama kapasitesi (örneğin GB)
    price: number; // Bu kapasiteye ait fiyat
}

// Ürün detayları arayüzü: Tek bir ürünün detay bilgilerini içerir
export interface ProductDetails {
    code: number; // Ürün kodu
    mkName: string; // Marka adı
    productName: string; // Ürün adı
    badge: string; // Rozet bilgisi (örneğin "En Çok Satan")
    rating: number; // Ürün değerlendirme puanı
    imageUrl: string; // Ürün görsel URL'si
    storageOptions: number[]; // Mevcut depolama seçenekleri (örneğin [128, 256])
    price: number; // Ürün fiyatı
    freeShipping: boolean; // Ücretsiz kargo seçeneği
    lastUpdate: string; // Ürün fiyatı için son güncelleme tarihi
    options: ProductOption[]; // Farklı kapasite ve fiyat seçenekleri
}

// Ürün liste öğesi arayüzü: Ürün listesinde her bir ürünün temel bilgilerini içerir
export interface ProductListItem {
    code: number; // Ürün kodu
    name: string; // Ürün adı
    imageUrl: string; // Ürün görsel URL'si
    dropRatio: number; // İndirim oranı (%)
    price: number; // Ürün fiyatı
    countOfPrices: number; // Fiyat seçenek sayısı
    followCount: number; // Ürünü takip eden kullanıcı sayısı
    url: string; // Ürün detay URL'si
}

// Ürün liste yanıtı arayüzü: API'den gelen ürün listesini ve sonraki URL'yi içerir
export interface ProductListResponse {
    horizontalProductList: ProductListItem[]; // Yatay kaydırmalı ürün listesi
    productList: ProductListItem[]; // Dikey ürün listesi
    nextUrl: string | null; // Sonraki sayfa için URL, yoksa null
}
