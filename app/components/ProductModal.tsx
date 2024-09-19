import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { addToCart } from "../services/orderServices"
import { toast } from 'react-hot-toast'

interface Product {
  id: number
  name: string
  price: number | string
  color:string,
  image: string
  description: string
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  if (!isOpen && !isVisible) return null

  const handleAddToCart = async () => {
    if (!product) return

    try {
      await addToCart(product.id, 1)
      toast.success("Product added to cart successfully!")
      onClose()
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast.error("Failed to add product to cart.")
    }
  }

  const formatPrice = (price: number | string): string => {
    if (typeof price === 'number') {
      return price.toFixed(2)
    }
    if (typeof price === 'string') {
      const numPrice = parseFloat(price)
      return isNaN(numPrice) ? price : numPrice.toFixed(2)
    }
    return 'N/A'
  }

  if (!product) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-4xl h-96 overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <div className="relative flex flex-col md:flex-row h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-secondary">
            <img
              src={`/static/images/${product.image}.jpg`}
              alt={product.name}
              className="w-full h-[90%]  rounded-lg shadow-md"
            />
          </div>
          
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
              
              <p className="text-2xl font-semibold text-primary mb-4">${formatPrice(product.price)}</p>
              <div className="mb-1">
                <h3 className="text-xl font-semibold text-gray-700 ">Color</h3>
                <p className="text-gray-600 leading-relaxed font-bold">{product.color}</p>
                
              </div>
              <div className="">
                <h3 className="text-xl font-semibold text-gray-700 ">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                
              </div>
              
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M24 39.5C18.76 39.5 14.5 35.24 14.5 30C14.5 24.76 18.76 20.5 24 20.5C29.24 20.5 33.5 24.76 33.5 30C33.5 35.24 29.24 39.5 24 39.5ZM24 23.5C20.42 23.5 17.5 26.42 17.5 30C17.5 33.58 20.42 36.5 24 36.5C27.58 36.5 30.5 33.58 30.5 30C30.5 26.42 27.58 23.5 24 23.5Z"
                  fill="currentColor"
                />
                <path
                  d="M22.88 33.08C22.24 33.08 21.6 32.84 21.12 32.34L19.82 31.04C19.24 30.46 19.24 29.5 19.82 28.92C20.4 28.34 21.36 28.34 21.94 28.92L22.9 29.88L26.12 26.92C26.72 26.36 27.68 26.4 28.24 27C28.8 27.6 28.76 28.56 28.16 29.12L24.6 32.4C24.1 32.86 23.48 33.08 22.88 33.08Z"
                  fill="currentColor"
                />
                <path
                  d="M30 45.5H18C8.76 45.5 7.04 41.2 6.6 37.02L5.1 25.04C4.88 22.88 4.8 19.78 6.9 17.46C8.7 15.46 11.68 14.5 16 14.5H32C36.34 14.5 39.32 15.48 41.1 17.46C43.18 19.78 43.12 22.88 42.9 25L41.4 37.02C40.96 41.2 39.24 45.5 30 45.5ZM16 17.5C12.62 17.5 10.3 18.16 9.12 19.48C8.14 20.56 7.82 22.22 8.08 24.7L9.58 36.68C9.92 39.88 10.8 42.52 18 42.52H30C37.2 42.52 38.08 39.9 38.42 36.72L39.92 24.7C40.18 22.26 39.86 20.6 38.88 19.5C37.7 18.16 35.38 17.5 32 17.5H16Z"
                  fill="currentColor"
                />
                <path
                  d="M33 17.26C32.18 17.26 31.5 16.58 31.5 15.76V13C31.5 10.9 30.6 8.85999 29.04 7.43999C27.46 5.99999 25.4 5.33999 23.26 5.53999C19.66 5.87999 16.5 9.55999 16.5 13.4V15.34C16.5 16.16 15.82 16.84 15 16.84C14.18 16.84 13.5 16.16 13.5 15.34V13.38C13.5 7.99999 17.84 3.03999 22.98 2.53999C25.98 2.25999 28.86 3.19999 31.06 5.21999C33.24 7.19999 34.5 10.04 34.5 13V15.76C34.5 16.58 33.82 17.26 33 17.26Z"
                  fill="currentColor"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal


