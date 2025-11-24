
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOME_CATEGORIES, DEALS_ITEMS, HOME_OUTDOOR_PRODUCTS, CONSUMER_ELECTRONICS_PRODUCTS, EXTRA_SERVICES, SUPPLIERS } from '../constants';
import { ChevronDownIcon, SearchCircleIcon, CubeIcon, PaperPlaneIcon, ShieldCheckIcon, SearchIcon } from '../components/Icons';
import { getAllProducts } from '../services/api';
import { Product } from '../types';

const iconMap = {
    SearchCircle: SearchCircleIcon,
    Cube: CubeIcon,
    PaperPlane: PaperPlaneIcon,
    ShieldCheck: ShieldCheckIcon,
};

const MobileHomeHeader: React.FC = () => (
    <div className="lg:hidden bg-gray-100 p-4">
        <div className="relative">
            <input type="search" placeholder="Search" className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 bg-white" />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex space-x-4 overflow-x-auto whitespace-nowrap mt-4 pb-2">
            {['All category', 'Gadgets', 'Clothes', 'Accessories'].map(cat => (
                <button key={cat} className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">{cat}</button>
            ))}
        </div>
    </div>
);

const HeroSection: React.FC = () => (
    <section className="bg-white rounded-lg shadow-sm mt-5 hidden lg:block">
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 p-5 border-r hidden lg:block">
                <ul className="space-y-1 text-dark">
                    {HOME_CATEGORIES.map(category => (
                        <li key={category} className="px-2 py-1.5 hover:bg-gray-200 rounded-md"><Link to="/products">{category}</Link></li>
                    ))}
                </ul>
            </div>
            <div className="w-full lg:w-2/3 p-1 sm:p-5">
                <div className="bg-gray-800 text-white p-8 rounded-lg h-full flex flex-col justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/hero_image.jpg')" }}>
                    <h2 className="text-2xl lg:text-3xl">Latest trending</h2>
                    <h1 className="text-3xl lg:text-4xl font-bold mt-2">Electronic items</h1>
                    <button className="mt-6 bg-white text-dark font-semibold py-2 px-5 rounded-md self-start hover:bg-gray-200">Learn more</button>
                </div>
            </div>
            <div className="w-full lg:w-1/3 p-5 flex-col justify-between space-y-3 hidden lg:flex">
                <div className="bg-blue-light p-4 rounded-lg flex flex-col items-center text-center">
                    <div className="bg-blue-300 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white w-8 h-8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <p className="font-semibold mt-2">Hi, user <br /> let's get stated</p>
                    <div className="flex flex-col space-y-2 mt-3 w-full">
                        <button className="bg-blue text-white font-medium py-2 rounded-lg w-full">Join now</button>
                        <button className="bg-white text-blue font-medium py-2 rounded-lg w-full border border-gray-300">Log in</button>
                    </div>
                </div>
                <div className="bg-orange text-white p-4 rounded-lg">Get US $10 off with a new supplier</div>
                <div className="bg-teal-400 text-white p-4 rounded-lg">Send quotes with supplier preferences</div>
            </div>
        </div>
    </section>
);

const MobileHero: React.FC = () => (
    <div className="lg:hidden p-4">
        <div className="bg-gray-800 text-white p-6 rounded-lg h-48 flex flex-col justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Ecommerce Web Design (Community)_Page_01_Image_0003.png')" }}>
            <h2 className="text-xl">Latest trending</h2>
            <h1 className="text-2xl font-bold">Electronic items</h1>
            <button className="mt-4 bg-white text-dark font-semibold py-2 px-4 rounded-md self-start text-sm">Learn more</button>
        </div>
    </div>
);

const DealsAndOffers: React.FC = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-12-31") - +new Date();
        let timeLeft: { [key: string]: number } = {};
        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Min: Math.floor((difference / 1000 / 60) % 60),
                Sec: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map(interval => (
        <div key={interval} className="text-center">
            <div className="bg-gray-200 text-dark font-bold text-base md:text-lg rounded-md w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">{String(timeLeft[interval]).padStart(2, '0')}</div>
            <div className="text-xs text-gray-800 mt-1">{interval.slice(0, 3)}</div>
        </div>
    ));

    return (
        <section className="bg-white rounded-lg lg:p-5 mt-5 lg:border-2 lg:border-gray-300 p-4">
            <div className="flex flex-col lg:flex-row gap-5 items-stretch">
                <div className="w-full lg:w-1/4 lg:border-r lg:pr-5">
                    <h3 className="text-xl font-semibold">Deals and offers</h3>
                    <p className="text-gray-600">Electronic equipments</p>
                    <div className="flex space-x-2 mt-4 lg:flex">
                        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
                    </div>
                </div>
                <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {DEALS_ITEMS.map(item => (
                        <Link to="/products" key={item.name} className="text-center p-2 hover:bg-gray-100 rounded-md flex flex-col items-center">
                            <img src={item.img} alt={item.name} className="rounded-md w-24 h-24 object-cover" />
                            <p className="mt-2 text-sm">{item.name}</p>
                            <span className="bg-red-100 text-red-600 text-xs font-bold py-1 px-2 rounded-full">{item.discount}%</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategorySection: React.FC<{ title: string; image: string; products: { name: string; price: number; img: string }[] }> = ({ title, image, products }) => (
    <section className="mt-5 p-4 lg:p-0">
        <div className="bg-white lg:border-2 lg:border-gray-300 rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/4 bg-cover bg-center p-5 hidden lg:block" style={{ backgroundImage: `url('${image}')` }}>
                    <h3 className="text-2xl font-bold max-w-[150px]">{title}</h3>
                    <button className="mt-4 bg-white text-dark font-semibold py-2 px-4 rounded-md hover:bg-gray-200">Source now</button>
                </div>
                <div className="lg:hidden flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <Link to="/products" className="text-primary font-semibold">Source now &gt;</Link>
                </div>
                <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4">
                    {products.slice(0, 8).map(product => (
                        <Link to="/products" key={product.name} className="p-2 lg:p-4 lg:border-l lg:border-b flex justify-between items-center hover:bg-gray-100">
                            <div className="pr-2">
                                <p className="font-semibold text-sm lg:text-base">{product.name}</p>
                                <p className="text-xs lg:text-sm text-gray-500">From USD {product.price}</p>
                            </div>
                            <img src={product.img} alt={product.name} className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </section>
)

const InquirySection: React.FC = () => (
    <section className="mt-5 rounded-lg bg-cover bg-center p-4 lg:p-8" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/inquiry.png')" }}>
        <div className="flex flex-col lg:flex-row items-center">
            <div className="text-white lg:w-1/2">
                <h2 className="text-2xl lg:text-3xl font-bold">An easy way to send requests to all suppliers</h2>
                <p className="mt-2 max-w-sm hidden lg:block">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                <button className="lg:hidden mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm">Send inquiry</button>
            </div>
            <div className="bg-white p-6 rounded-lg lg:w-1/2 mt-5 lg:mt-0 w-full hidden lg:block">
                <h3 className="text-xl font-bold">Send quote to suppliers</h3>
                <input type="text" placeholder="What item you need?" className="w-full bg-white border-2 border-gray-300 rounded-md p-2 mt-4" />
                <textarea placeholder="Type more details" className="w-full bg-white border-2 border-gray-300 rounded-md p-2 mt-4 h-24"></textarea>
                <div className="flex items-center mt-4 space-x-2">
                    <input type="number" placeholder="Quantity" className="w-full bg-white border-2 border-gray-300 rounded-md p-2" />
                    <div className="relative">
                        <select className="appearance-none text-dark bg-white border-2 border-gray-300 rounded-md p-2 pr-8">
                            <option>Pcs</option>
                            <option>Kgs</option>
                            <option>Tons</option>
                        </select>
                        <ChevronDownIcon className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none text-gray-600" />
                    </div>
                </div>
                <button className="bg-blue text-white font-medium py-2 px-5 rounded-md mt-4">Send inquiry</button>
            </div>
        </div>
    </section>
)

const RecommendedItems: React.FC<{ products: Product[] }> = ({ products }) => (
    <section className="mt-5 p-4 lg:p-0">
        <h2 className="text-2xl font-semibold mb-4">Recommended items</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {products.slice(0, 10).map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="bg-white p-2 lg:p-4 rounded-lg border hover:shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-32 lg:h-40 object-cover rounded-md" />
                    <p className="font-semibold mt-3 text-sm lg:text-base">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 text-xs lg:text-sm mt-1 h-10 overflow-hidden">{product.name}</p>
                </Link>
            ))}
        </div>
    </section>
)

const ExtraServices: React.FC = () => (
    <section className="mt-5 hidden lg:block">
        <h2 className="text-2xl font-semibold mb-4">Our extra services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXTRA_SERVICES.map(service => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || SearchCircleIcon;
                return (
                    <div key={service.name} className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden relative group">
                        <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url('${service.img}')` }}></div>
                        <div className="absolute top-4 right-4 bg-gray-400/50 backdrop-blur-sm rounded-full p-3 border-2 border-white/50 text-white group-hover:bg-blue-light group-hover:text-blue transition-colors">
                            <IconComponent className="w-8 h-8" />
                        </div>
                        <p className="font-semibold p-4">{service.name}</p>
                    </div>
                )
            })}
        </div>
    </section>
)

const SuppliersSection: React.FC = () => (
    <section className="mt-8 py-6 hidden lg:block">
        <h2 className="text-2xl font-semibold mb-6">Suppliers by region</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-4">
            {SUPPLIERS.map((supplier, index) => (
                <div key={index} className="flex items-center">

                    <img src={`https://flagcdn.com/w40/${supplier.code}.png`} alt={`${supplier.name} flag`} className="w-8 h-auto mr-3 rounded-sm" />

                    <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-gray-500">{supplier.domain}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
)

const NewsletterSection: React.FC = () => (
    <section className="py-12 bg-gray-200 mt-5">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold text-dark">Subscribe on our newsletter</h3>
            <p className="text-gray-600 mt-2">Get daily news on upcoming offers from many suppliers all over the world</p>
            <form className="mt-4 max-w-md mx-auto flex">
                <input type="email" placeholder="Email" className="border border-gray-300 bg-white rounded-l-md px-4 py-2 w-full focus:outline-none" />
                <button className="bg-primary text-white rounded-r-md px-6 hover:bg-blue-700">Subscribe</button>
            </form>
        </div>
    </section>
)

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { products } = await getAllProducts();
            setProducts(products);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading products...</p>
            </div>
        );
    }

    return (
        <>
            <MobileHomeHeader />
            <MobileHero />
            <div className="container mx-auto px-0 lg:px-4 pb-5">
                <HeroSection />
                <div className="lg:hidden p-4"><div className="border-t"></div></div>
                <DealsAndOffers />
                <CategorySection title="Home and outdoor" image="/images/home&outdoor.png" products={HOME_OUTDOOR_PRODUCTS} />
                <CategorySection title="Consumer electronics" image="/images/electronics.png" products={CONSUMER_ELECTRONICS_PRODUCTS} />
                <InquirySection />
                <RecommendedItems products={products} />
                <ExtraServices />
                <SuppliersSection />
                <NewsletterSection />
            </div>
        </>
    );
};

export default HomePage;
