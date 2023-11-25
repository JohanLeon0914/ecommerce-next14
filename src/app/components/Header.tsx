"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { IoMdCart } from "react-icons/io";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Product, StateProps } from "../../../types";
import FormattedPrice from "./FormattedPrice";
import Link from "next/link";
import { addUser, deleteUser } from "@/redux/shoppingSlice";
import { useMediaQuery } from "react-responsive";
import { addSearch } from "@/redux/shoppingSlice";

function Header() {
  const dispatch = useDispatch();
  const { search } = useSelector((state: StateProps) => state.shopping);
  const { data: session } = useSession();
  const { productData } = useSelector((state: StateProps) => state.shopping);
  const [totalAmount, setTotalAmount] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const formattedAmount = new Number(9999.99).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    } else {
      dispatch(deleteUser());
    }
  }, [session, dispatch]);

  useEffect(() => {
    let amt = 0;
    productData.map((item: Product) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [productData]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addSearch(event.target.value));
  };

  return (
    <div className="bg-bodyColor h-20 top-0 sticky z-50">
      <Container className="h-full flex items-center md:gap-x-5 justify-between md:justify-start">
        <Logo />
        {/* Search bar */}
        <div className="w-full bg-white hidden md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-600 group">
          <FiSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
          <input
            value={search}
            onChange={onChangeInput}
            type="text"
            placeholder="Search for products"
            className="placeholder:text-sm flex-1 outline-none"
          />
        </div>
        {/* Login and register */}
        {!session && (
          <div
            onClick={() => signIn()}
            className={`headerDiv cursor-pointer ${
              isMobile ? "flex items-center gap-x-1" : ""
            }`}
          >
            <AiOutlineUser className="text-2xl" />
            {!isMobile && (
              <p className="text-sm font-semibold">Login/Register</p>
            )}
          </div>
        )}

        {/* user Image */}
        {session && (
          <Image
            src={session?.user?.image as string}
            alt="user image"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        )}

        {/* Logout button */}
        {session && (
          <div
            onClick={() => signOut()}
            className={`headerDiv ${
              isMobile ? "flex items-center gap-x-1" : "px-2 gap-x-1"
            } cursor-pointer`}
          >
            <FiLogOut className="text-2xl" />
            {!isMobile && <p className="text-sm font-semibold">Logout</p>}
          </div>
        )}

        {/* Cart button */}
        <Link href="/cart">
          <div
            className={`bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white
            flex items-center justify-center gap-x-1 px-3 py-1.5 border-[1px] border-black
            hover:border-orange-600 duration-200 relative ${
              isMobile ? "flex-col items-center" : ""
            }`}
          >
            <IoMdCart className="text-xl" />
            {isMobile && totalAmount && totalAmount > 9999.99 ? (
              <p className="text-sm font-semibold">+{formattedAmount}</p>
            ) : (
              <>
                <p className="text-sm font-semibold">
                  <FormattedPrice amount={totalAmount ? totalAmount : 0} />
                </p>
                {/* El span es la cantidad de productos dentro del carrito */}
                <span
                  className="bg-white text-orange-600 rounded-full
                text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 
                flex items-center justify-center shadow-xl shadow-black"
                >
                  {productData ? productData?.length : 0}
                </span>
              </>
            )}
          </div>
        </Link>
      </Container>
    </div>
  );
}

export default Header;
