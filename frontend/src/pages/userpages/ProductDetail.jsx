import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar";
import api from "../../api";
import { setCart } from "../../Redux/Cartslice";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data.product);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const res = await api.post("/user/cart", {
        productId: product._id,
        quantity: 1,
      });
      dispatch(setCart(res.data.cart.products));
      toast.success("Product is added to cart Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to add to cart");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen md:w-full bg-slate-50 px-4 md:px-8 lg:px-10 pt-24 pb-10">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="min-h-[50vh] flex items-center justify-center text-slate-600 font-semibold">
              Loading product details...
            </div>
          ) : !product ? (
            <div className="min-h-[50vh] flex flex-col gap-3 items-center justify-center">
              <p className="text-slate-600 font-semibold">Product not found</p>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-blue-600 transition"
              >
                Back to Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-5">
                <div className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {product.category}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {product.title}
                </h1>

                <p className="text-slate-600 leading-7">
                  {product.description ||
                    "No description available for this product."}
                </p>

                <div className="text-3xl font-bold text-slate-900">
                  ₹{product.price}
                </div>

                <div className="text-sm text-slate-600">
                  Stock: <span className="font-semibold">{product.stock}</span>
                </div>

                <div className="text-sm text-slate-600">
                  Vendor:{" "}
                  <span className="font-semibold">
                    {product.vendor?.fullName || "Unknown"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold transition hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 font-semibold transition hover:bg-slate-100"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
