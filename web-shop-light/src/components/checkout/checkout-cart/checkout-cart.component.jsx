import {useState, useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import "./checkout-cart.styles.scss";

import { setShippingMethod, removeItem, setCartSummary, clearCart, updateQuantity } from "../../../features/cart-slice/cartSlice";

//import CartItem from "../../cart/cart-item";
import CartItem from '../../cart/cart-item/cart-item.component'

const shippingOptions = [
    { id: 'standard', label: "cart.standardShipping", cost: 5.0 },
    { id: 'express', label: "cart.expressShipping", cost: 15.0 },
  ];



const CheckoutCart = ({cartStep, handleAction}) => {
    console.log("Debug CheckoutCart");
     // import { useTranslation } from 'react-i18next';
 const { t, i18n } = useTranslation();
 const currentLanguage = i18n.language; // Trenutni jezik
 
    const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]?.cost || 0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);


    const formatCurrency = (value) => {
        return new Intl.NumberFormat('sl-SI', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        }).format(value).replace('€', '');
    };

    const reversedShippmentOptions = [...shippingOptions].reverse();

    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
    // Stalna vrednost za DDV in poštnino
    const VAT_RATE = 0.22; // 22%
    const SHIPPING_COST = 5.0; // Poštnina

    const subTotal = items.reduce((sum, item) => sum + item.quantity*item.price, 0);

    // Izračuni
    // const totalVAT1 = items.reduce((sum, item) => sum + item.quantity *item.price*item.vat_rate/100, 0);
    const totalVAT = items.reduce((sum, item) => {

        const vatAmount = item.quantity * (item.price - item.price / ((100 + item.vat_rate) / 100));
        return sum + vatAmount;
    }, 0);
    //(totalAmount * VAT_RATE).toFixed(2); // Izračun DDV
    const grandTotal =subTotal+ totalVAT + SHIPPING_COST;
    
    //(parseFloat(totalAmount) + parseFloat(totalVAT) + SHIPPING_COST).toFixed(2);
    // Skupaj z DDV in poštnino
    const handleQuantityChange = (delta) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1) { // Preprečimo količino manjšo od 1
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        }
    };


    const handleShippingChange = (event) => {
        const selectedCost = parseFloat(event.target.value);
        setSelectedShipping(selectedCost);
    };
  
    useEffect(() => {
        // Calculate subtotal whenever cartItems change
        const newSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(newSubtotal);
      }, [items]);
      
    useEffect(() => {
        // Calculate total whenever subtotal or selectedShipping changes
        if (subtotal === 0) {
          setTotal(0);
        } else {
          setTotal(subtotal + selectedShipping);
        }
    }, [subtotal, selectedShipping]);




    const handleProceedNext = () => {
      /*
   const totalVAT = items.reduce((sum, item) => {
        const vatAmount = item.quantity * (item.price - item.price / ((100 + item.vat_rate) / 100));
        return sum + vatAmount;
    }, 0);
     
          const totalVAT = items.reduce((sum, item) => {
            const vatAmount = item.quantity * (item.price - item.price / ((100 + item.vat_rate) / 100));
            return sum + vatAmount;
        }, 0);
         */
           /* if (!selectedAddress.nameto || !selectedAddress.addressLine1 || !selectedAddress.city) {
                console.error('Address is incomplete.');
                return;
            }*/
            //totalQuantity, totalAmount, selectedShipping, subtotal, total

            

            console.log("handleProceedNext: totalQuantity=",totalQuantity);
            // ta znesek je napačen
            // console.log("handleProceedNext: totalAmount=",totalAmount);  
            console.log("Total VAT:", totalVAT);
            console.log("handleProceedNext: selectedShipping=",selectedShipping);

            console.log("handleProceedNext: total=",total);
            // console.log("handleProceedNext: grandTotal=",grandTotal);
            // Shranjevanje v Redux
            dispatch(setCartSummary({
              totalAmount: total,
              totalVAT: totalVAT,
              shippingCost: selectedShipping,
            }));
     
            const selectedShippingOption = shippingOptions.find(option => option.cost === selectedShipping);
            if (!selectedShippingOption) {
              console.error('Selected shipping option not found.');
              return;
            }
            console.log(t(selectedShippingOption.label));
            dispatch(setShippingMethod({
              text: t(selectedShippingOption.label),
              cost: selectedShippingOption.cost,
            }));
           // dispatch(setShippingMethod({ text: 'Express Shipping', cost: 15.0 }));

            //handleAction('payment', cartData); // Pokliči zbrane podatke in premik na plačilo
            handleAction( "shipping");
          };

    return (
        <>
            <div className="checkout-main-content">
                {/* Prva vrstica */}
                <div className="wrapx">
      
      <div className="heading cf">
        <h1>{t("cart.title")}</h1>
        <a href="/shop" className="continue">{t("cart.continueShopping")}</a>
      </div>

      <div className="cart">
        <ul className="cartWrap">
          {items.map((item, index) => (
            <li className={`items ${index % 2 === 0 ? 'odd' : 'even'}`} key={item.id}> 
                  <CartItem item={item} />     
            </li>
          ))}
        </ul>
        <button
          className="clear-cart-button"
          onClick={() => dispatch(clearCart())}
        >
          {t("cart.clearcart")}
        </button>
      </div>

      <div className="promoCode">
        <label htmlFor="promo">{t("cart.promoCode")}</label>
        <input type="text" name="promo" placeholder="Enter Code" />
        <a href="#" className="btn"></a>
      </div>

      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            {t("cart.totalItems")}: {itemsCount}
            <span className="label">{t("cart.subtotal")}</span>
            <span className="value">{formatCurrency(subtotal-totalVAT)} €</span>
            
          </li>
          <li className="totalRow selectboxli">
          

  
<span className="label">{t("cart.selectshipping")}  </span>
            
            <div className="select-box">
              <div className="select-box__current" tabIndex="1">
                 {[...shippingOptions].map((option, index) => (
                  <div key={`shipping_key_${option.id}`} className="select-box__value">
                       <input className="select-box__input" type="radio" id={`cart_shipping_${index}`} 
                       value={option.cost} 
                       name="Standard" 
                       checked={selectedShipping === option.cost}
                       onChange={handleShippingChange}
                       
                       />
                       <p className="select-box__input-text">{t(option.label)} &nbsp; {formatCurrency(option.cost)}€</p>
                     </div>
                  ))}
                <img className="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
              </div>
              <ul className="select-box__list">
              {reversedShippmentOptions.map((option, reversedIndex) => {
                 const originalIndex = shippingOptions.length - 1 - reversedIndex;

                 return (
                   <li key={`shipping_li_key${option.id}`} className="select_items">
                     <label
                       className="select-box__option"
                       htmlFor={`cart_shipping_${originalIndex}`}
                       aria-hidden="true"
                     >
                       {t(option.label)} &nbsp; {option.cost.toFixed(2)}€
                     </label>
                   </li>
                 );
                })}
          
              </ul>
            </div>
          </li>
          <li className="totalRow">
            <span className="label">{t("cart.vat")} &nbsp;{VAT_RATE*100}%</span>
            <span className="value">{formatCurrency(totalVAT)} €</span>
          </li>
          <li className="totalRow final">
            <span className="label">{t("cart.total")}</span>
            <span className="value">{formatCurrency(total)} €</span>

          </li>
  
        </ul>

      </div>
    </div>








            </div>
     

            <div className="checkout-navigation">
            
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={handleProceedNext}
              
                    >Naslov za dostavo</a>
            </div>

        </>

    );
};

CheckoutCart.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}

export default CheckoutCart;