import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../addFishBuyer/AddFishBuyer.css";
import toast from 'react-hot-toast';
import formimg5 from "../../backgroundimage/fishbuyer_formimg5.jpg";
import formimg6 from "../../backgroundimage/fishbuyer_formimg6.jpg";
import formimg9 from "../../backgroundimage/fishbuyer_formimg9.jpg";


const EditFishBuyer = () => {

  const fishbuyers = {
 
    name: '',
    contact_number: '',
    last_payment_option: '',
    last_payment: '',
    last_buy_quantity: '',
    arrear: '',
    last_purchase_date: '',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [fishbuyer, setFishBuyer] = useState(fishbuyers);
  const [errors, setErrors] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg5, formimg6, formimg9]; // Add more images to this array

  const updateImageIndex = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 3000);
    return () => clearInterval(intervalId);
  } );

  const inputHandler = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === 'last_payment_option') {
      if (!/^\d{10}$/.test(value)) {
        newErrors.last_payment_option = 'Contact number must be 10 digits';
      } else {
        delete newErrors.last_payment_option;
      }
    }
  }


  const inputChangeHandler = (e) => {
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

  if ( name === "last_buy_quantity" ) {
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

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/getonebuyer/${id}`)
      .then((response) => {
        setFishBuyer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
    try {
        const response = await axios.put(`http://localhost:4000/api/updatebuyer/${id}`, fishbuyer);
        if (response.status === 200) {
          toast.success("Fish Buyer Details Updated Successfully", { position: "top-right" });
          navigate("/");
        } else {
          toast.error("Failed to Update fish Buyer Details", { position: "top-right" });
        } 
      } catch (error) {
          toast.error("An error occurred while adding fish buyer", { position: "top-right" });
          console.error("Error adding fish buyer: ", error);
        }
       }
        else {
        toast.error("Please fix the errors before submitting", { position: "top-right" });
      }
      
      };
  

  return (
    <div className='fishbuyerAddFishBuyer'>
       <button className="fishbuyerback-button"><Link to={"/"} >Back</Link></button>
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
            <h1 className="fishbuyerform-title">Update Fish Details</h1>
          </div>
    
    
      <form className='fishbuyerAddFishBuyer' onSubmit={submitForm}>
        
        <div className="fishbuyerinputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={inputChangeHandler} id="name" name="name" autoComplete='off' placeholder='Name' value={fishbuyer.name} />
          {errors.name &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.name}</span>}
        </div>
        <div className="fishbuyerinputGroup">
          <label htmlFor="contact_number">Contact Number</label>
          <input type="text" onChange={inputChangeHandler} id="contact_number" name="contact_number" autoComplete='off' placeholder='Contact Number' value={fishbuyer.contact_number} />
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
          <input type="text" onChange={inputChangeHandler} id="last_payment" name="last_payment" autoComplete='off' placeholder='Last Payment(LKR)' value={fishbuyer.last_payment} />
          {errors.last_payment &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.last_payment}</span>}
        </div>

        <div className="fishbuyerinputGroup">
          <label htmlFor="last_buy_quantity">Last Buy Quantity</label>
          <input type="text" onChange={inputChangeHandler} id="last_buy_quantity" name="last_buy_quantity" autoComplete='off' placeholder='Last Buy Quantity(kg)' value={fishbuyer.last_buy_quantity} />
          {errors.last_buy_quantity &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.last_buy_quantity}</span>}
        </div>
        <div className="fishbuyerinputGroup">
          <label htmlFor="arrear">Arrear</label>
          <input type="text" onChange={inputChangeHandler} id="arrear" name="arrear" autoComplete='off' placeholder='Arrear(LKR)' value={fishbuyer.arrear} />
          {errors.arrear &&   <span className="fishbuyererror" style={{color:"red"}}>{errors.arrear}</span>}
        </div>
       
        <div className="fishbuyerinputGroup">
          <label htmlFor="last_purchase_date">Last Purchase Date</label>
          <input type="date" onChange={inputChangeHandler} id="last_purchase_date" name="last_purchase_date" autoComplete='off' placeholder='Last Purchase Date' value={fishbuyer.last_purchase_date} />
          
        </div>
        <div className="fishbuyerinputGroup">
          <button type="submit" className="submitfishbuyersubmitButton">UPDATE FISH BUYER</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};


export default EditFishBuyer;
