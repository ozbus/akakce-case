import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from './ProductList';
import '@testing-library/jest-dom';

// Mock veri ürünler (Initial Products)
const mockInitialProducts = [
  {
    code: 101,
    name: "Iphone 13 128 GB",
    imageUrl: "https://cdn.akakce.com/x/apple/iphone-13.jpg",
    dropRatio: 5,
    price: 20567,
    countOfPrices: 96,
    followCount: 5000,
    url: "https://mock.akakce.dev/product101.json",
  },
  {
    code: 102,
    name: "Iphone 13 256 GB",
    imageUrl: "https://cdn.akakce.com/x/apple/iphone-13.jpg",
    dropRatio: 10,
    price: 22567,
    countOfPrices: 102,
    followCount: 8000,
    url: "https://mock.akakce.dev/product102.json",
  },
];

const mockNextUrl = "https://mock.akakce.dev/product103.json";

// API'nin sahtesi (Mock API)
jest.mock('../utils/api', () => ({
  fetchProducts: jest.fn(() =>
      Promise.resolve({
        productList: [
          {
            code: 103,
            name: "Iphone 13 512 GB",
            imageUrl: "https://cdn.akakce.com/x/apple/iphone-13.jpg",
            dropRatio: 15,
            price: 27567,
            countOfPrices: 120,
            followCount: 10000,
            url: "https://mock.akakce.dev/product103.json",
          },
        ],
        nextUrl: null,
      })
  ),
}));

// ProductList bileşeninin testleri
describe('ProductList Bileşeni', () => {
  it('ilk ürünleri doğru bir şekilde render eder', async () => {
    render(
        <MemoryRouter>
          <ProductList initialProducts={mockInitialProducts} nextUrl={mockNextUrl} />
        </MemoryRouter>
    );

    // Birinci ürünün render edildiğini doğruluyoruz
    expect(await screen.findByText(/Iphone 13 128 GB/i)).toBeInTheDocument();
    expect(screen.getByText(/96 satıcı/i)).toBeInTheDocument();
    expect(screen.getByText(/5000+ takip/i)).toBeInTheDocument();

    // İkinci ürünün render edildiğini doğruluyoruz
    expect(screen.getByText(/Iphone 13 256 GB/i)).toBeInTheDocument();
    expect(screen.getByText(/102 satıcı/i)).toBeInTheDocument();
    expect(screen.getByText(/8000+ takip/i)).toBeInTheDocument();
  });

  it('Daha Fazla Ürün yüklendiğinde yeni ürünleri listeler', async () => {
    render(
        <MemoryRouter>
          <ProductList initialProducts={mockInitialProducts} nextUrl={mockNextUrl} />
        </MemoryRouter>
    );

    const loadMoreButton = screen.getByText(/Daha Fazla Ürün/i);
    expect(loadMoreButton).toBeInTheDocument();

    // Daha Fazla Ürün butonuna tıklandığında yeni ürün yüklenmeli
    fireEvent.click(loadMoreButton);

    // Ek ürünün render edildiğini doğruluyoruz
    expect(await screen.findByText(/Iphone 13 512 GB/i)).toBeInTheDocument();
    expect(screen.getByText(/120 satıcı/i)).toBeInTheDocument();
    expect(screen.getByText(/10000+ takip/i)).toBeInTheDocument();
  });

  it('Bir ürünün üzerine tıklandığında doğru ürün detay sayfasına gidiyor', async () => {
    render(
        <MemoryRouter>
          <ProductList initialProducts={mockInitialProducts} nextUrl={mockNextUrl} />
        </MemoryRouter>
    );

    // Birinci ürünü tıkladığımızda, o ürünün detay sayfasına gitmeliyiz
    const productLink = screen.getByText(/Iphone 13 128 GB/i);
    expect(productLink.closest('a')).toHaveAttribute('href', '/product/101');
  });
});
