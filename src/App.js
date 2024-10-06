import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

function App() {
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [sgst, setSgst] = useState(0); // SGST per item
  const [cgst, setCgst] = useState(0); // CGST per item
  const [amount, setAmount] = useState(0); // Total amount for each item


  const [items, setItems] = useState([]);


  const [subTotal, setSubTotal] = useState(0);
  const [totalSgst, setTotalSgst] = useState(0);
  const [totalCgst, setTotalCgst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    if (rate && quantity) {
      calculateAmount();
    }
  }, [rate, quantity]);


  const calculateAmount = () => {
    const gstRate = 18;
    const halfGst = gstRate / 2;

    const calculatedSgst = (parseFloat(rate) * halfGst) / 100;
    const calculatedCgst = (parseFloat(rate) * halfGst) / 100;
    const totalAmount = (parseFloat(rate) * parseFloat(quantity)) + (calculatedSgst + calculatedCgst) * quantity;

    setSgst((calculatedSgst * quantity).toFixed(2));
    setCgst((calculatedCgst * quantity).toFixed(2));
    setAmount(totalAmount.toFixed(2));
  };

  const handleAddItem = () => {
    if (itemDescription && quantity && rate) {
      const newItem = {
        description: itemDescription,
        quantity: parseFloat(quantity),
        rate: parseFloat(rate),
        sgst: parseFloat(sgst),
        cgst: parseFloat(cgst),
        amount: parseFloat(amount)
      };

      // Add the new item to the items array
      setItems([...items, newItem]);

      setItemDescription('');
      setQuantity('');
      setRate('');
      setSgst(0);
      setCgst(0);
      setAmount(0);
    }
  };

  useEffect(() => {
    const newSubTotal = items.reduce((total, item) => total + item.quantity * item.rate, 0);
    const newTotalSgst = items.reduce((total, item) => total + item.sgst, 0);
    const newTotalCgst = items.reduce((total, item) => total + item.cgst, 0);
    const newTotalAmount = newSubTotal + newTotalSgst + newTotalCgst;

    setSubTotal(newSubTotal.toFixed(2));
    setTotalSgst(newTotalSgst.toFixed(2));
    setTotalCgst(newTotalCgst.toFixed(2));
    setTotalAmount(newTotalAmount.toFixed(2));
  }, [items]);

  return (
    <div>
      <div className='container'>
        <div className='row pt-7'>
          <div className='col-md-6 '>
            <img src="Amigos.jpg" className='w-[140px] h-[110px]' alt="logo" />
          </div>
          <div className='col-md-6 flex justify-end'>
            <h1>TAX INVOICE</h1>
          </div>
        </div>

        <div className='row pt-8'>
          <div className='col-md-12'>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className='row'>
                <div className='col-md-3'>
                  <input
                    type="text"
                    placeholder="Item Description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    className="form-control mb-2"
                  />
                </div>
                <div className='col-md-1'>
                  <input
                    type="number"
                    placeholder="Qty"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control mb-2"
                  />
                </div>
                <div className='col-md-2'>
                  <input
                    type="number"
                    placeholder="Rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="form-control mb-2"
                  />
                </div>
                <div className='col-md-2'>
                  <input
                    type="number"
                    placeholder="SGST"
                    value={sgst}
                    readOnly
                    className="form-control mb-2"
                  />
                </div>
                <div className='col-md-2'>
                  <input
                    type="number"
                    placeholder="CGST"
                    value={cgst}
                    readOnly
                    className="form-control mb-2"
                  />
                </div>
                <div className='col-md-1'>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    readOnly
                    className="form-control mb-2"
                  />
                </div>
                <div className='col-md-1'>
                  <button type="button" className="btn btn-primary mb-2" onClick={handleAddItem}>
                    Add Item
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Table Header */}
        <div className='row bg-black text-white flex items-center'>
          <div className='col-md-7'>
            <p>Item Description</p>
          </div>
          <div className='col-md-1'>
            <p>Qty</p>
          </div>
          <div className='col-md-1'>
            <p>Rate</p>
          </div>
          <div className='col-md-1'>
            <p>SGST</p>
          </div>
          <div className='col-md-1'>
            <p>CGST</p>
          </div>
          <div className='col-md-1'>
            <p>Amount</p>
          </div>
        </div>

        {items.length > 0 && items.map((item, index) => (
          <div className='row flex items-center' key={index}>
            <div className='col-md-7'>
              <p>{item.description}</p>
            </div>
            <div className='col-md-1'>
              <p>{item.quantity}</p>
            </div>
            <div className='col-md-1'>
              <p>{item.rate}</p>
            </div>
            <div className='col-md-1'>
              <p>{item.sgst}</p>
            </div>
            <div className='col-md-1'>
              <p>{item.cgst}</p>
            </div>
            <div className='col-md-1'>
              <p>{item.amount}</p>
            </div>
            <hr />
          </div>
        ))}

        <div className='row'>
          <div className='col-md-6'>
            <div className='flex justify-between'>
              <h4>SubTotal:</h4>
              <h4>{subTotal}</h4>
            </div>
            <div className='flex justify-between'>
              <h4>SGST:</h4>
              <h4>{totalSgst}</h4>
            </div>
            <div className='flex justify-between'>
              <h4>CGST:</h4>
              <h4>{totalCgst}</h4>
            </div>
            <div className='flex justify-between'>
              <h4>Total:</h4>
              <h4>{totalAmount}</h4>
            </div>
          </div>
        </div>
        <div><p className='text-right'>Notes: It was great doing business with you</p></div>
        <div><p className='text-right font-bold'>Terms and Condition:</p>
          <p className='text-right'>Please make the payment by the due date.</p></div>

      </div>
    </div>
  );
}

export default App;
