import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./AddFishBuyer.css";
import toast from 'react-hot-toast';
import formimg1 from "../../backgroundimage/fishbuyer_formimg1.jpg";
import formimg2 from "../../backgroundimage/fishbuyer_formimg2.jpg";
import formimg3 from "../../backgroundimage/fishbuyer_formimg3.jpg";


const AddFishBuyer = () => {

  const [fishbuyers] = useState({
    name: "",
    contact_number: "",
    last_payment_option: "",
    last_payment: "",
    last_buy_quantity: "",
    total_payment: "",
    arrear:"",
    last_purchase_date: "",
    
  });
   
  

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3]; // Add more images to this array
  const [fishbuyer, setFishBuyer] = useState(fishbuyers);


  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Mod by the total number of images
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  });



const inputHandler = (e) => {
  const { name, value } = e.target;
  let newErrors = { ...errors };

  if (name === 'name' && !/^[A-Za-z]$/.test(value)) {
    newErrors.name = 'Name must be include only letters';
  } else {
    delete newErrors.name;
  }
  if (name === 'contact_number') {
    if (!/^\d{10}$/.test(value)) {
      newErrors.contact_number = 'Contact number must be 10 digits';
    } else {
      delete newErrors.contact_number;
    }
  }
  if ( name === "last_payment" ) {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      newErrors[name] = "You can only Insert Positive Integer or Decimal Number";
    } else {
      delete newErrors[name];
    }
  }
  if ( name === "total_payment" ) {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      newErrors[name] = "You can only Insert Positive Integer or Decimal Number";
    } else {
      delete newErrors[name];
    }
  }
  if ( name === "arrear" ) {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      newErrors[name] = "You can only Insert Positive Integer or Decimal Number";
    } else {
      delete newErrors[name];
    }
  }
  setErrors(newErrors);
  setFishBuyer({ ...fishbuyer, [name]: value });
};

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:4000/api/createbuyer", fishbuyer);
        if (response.status === 200) {
          toast.success("Fish Buyer Details Added Successfully", { position: "top-right" });
          navigate("/");
        } else {
          toast.error("Failed to add fish buyer", { position: "top-right" });
        }
      } catch (error) {
        toast.error("An error occurred while adding fish buyer", { position: "top-right" });
        console.error("Error adding fish buyer: ", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", { position: "top-right" });
    }
    
  };

  return (
    <div className="fishbuyerAddFishBuyer">
      <button class="fishbuyerback-button"><Link to={"/"} >Back</Link></button>
      <div className="fishbuyercontainer">
        <div className="fishbuyerimage-container">
          
            <img
            src={images[imageIndex]}
            alt=""
            className="fishbuyer-image"
            />
          
        </div>
        <div className="fishbuyerform-container">
          <div className="fishbuyerheader">
          <h1>Add A New Fish Buyer</h1>
          </div>
          <form className="fishbuyerAddFishBuyerform" onSubmit={submitForm}>
     
      <div className="fishbuyerinputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={inputHandler} id="name" name="name" autoComplete="off" placeholder="Name of The Fish Buyer" />
          {errors.name &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.name}</span>}
     
        </div>
        <div className="fishbuyerinputGroup">
          <label htmlFor="contact_number">Contact Number</label>
          <input type="text" onChange={inputHandler} id="contact_number" name="contact_number" autoComplete="off" placeholder="Contact Number" />
          {errors.contact_number &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.contact_number}</span>}
     
        </div>
        <div className="fishbuyerinputGroup">
          <label htmlFor="last_payment_option">Last Payment Option</label>
          <select id="last_payment_option" name="last_payment_option" onChange={inputHandler}>
      
            <option value="Creditor">Creditor</option>
            <option value="Debtor">Debtor</option>
          </select>
          {errors.last_payment_option && <span className="fishbuyererror">{errors.last_payment_option}</span>}
        </div>
    

        <div className="fishbuyerinputGroup">
          <label htmlFor="last_payment">Last Payment</label>
          <input type="text" onChange={inputHandler} id="last_payment" name="last_payment" autoComplete="off" placeholder="Last Payment(LKR)" />
          {errors.last_payment &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.last_payment}</span>}
     
        </div>
        
        <div className="fishbuyerinputGroup">
          <label htmlFor="last_buy_quantity">Last Buy Quantity</label>
          <input type="text" onChange={inputHandler} id="last_buy_quantity" name="last_buy_quantity" autoComplete="off" placeholder="Last Buy Quantity(kg)" />
          {errors.last_payment &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.last_payment}</span>}
     
        </div>
        <div className="fishbuyerinputGroup">
          <label htmlFor="total_payment">Total Payment</label>
          <input type="text" onChange={inputHandler} id="total_payment" name="total_payment" autoComplete="off" placeholder="Total Payment(LKR)" />
          {errors.total_payment &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.total_payment}</span>}
        </div>
        <div className="fishbuyerinputGroup">
          <label htmlFor="arrear">Arrear</label>
          <input type="text" onChange={inputHandler} id="arrear" name="arrear" autoComplete="off" placeholder="Arrear(LKR)" />
          {errors.arrear &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.arrear}</span>}
        </div>
       
        <div className="fishbuyerinputGroup">
          <label htmlFor=" last_purchase_date">Last Purchase Date</label>
          <input type="date" onChange={inputHandler} id="last_purchase_date" name="last_purchase_date" autoComplete="off" placeholder="(DD/MM/YYYY)" />
      
        </div>
        <div className="fishbuyerinputGroup">
          <button type="submit" className="submitfishbuyersubmitButton">Add A Fish Buyer</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddFishBuyer;