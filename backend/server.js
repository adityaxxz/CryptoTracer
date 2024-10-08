/* const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/transactions/:address', async (req, res) => {
  const address = req.params.address;
  const apiKey = process.env.ETHERSCAN_API_KEY;
  
  try {
    const response = await axios.get('https://api-sepolia.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        sort: 'desc',
        apikey: apiKey
      }
    });

    const txs = response.data.result;
    const received = txs.filter(tx => tx.to.toLowerCase() === address.toLowerCase());
    const sent = txs.filter(tx => tx.from.toLowerCase() === address.toLowerCase());

    res.json({ received, sent });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 */
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/api/transactions/:address', async (req, res) => {
  const address = req.params.address;
  const apiKey = process.env.ETHERSCAN_API_KEY;
  
  try {
    const response = await axios.get('https://api-sepolia.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        page: '1',
        offset: '25',
        sort: 'desc',
        apikey: apiKey
      }
    });

    const txs = response.data.result;
    const received = txs.filter(tx => tx.to.toLowerCase() === address.toLowerCase());
    const sent = txs.filter(tx => tx.from.toLowerCase() === address.toLowerCase());

    res.json({ received, sent });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

app.get('/api/balance/:address', async (req, res) => {
  const address = req.params.address;
  const apiKey = process.env.ETHERSCAN_API_KEY;

  try {
    const response = await axios.get('https://api-sepolia.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: apiKey
      }
    });

    const balanceWei = response.data.result; // Balance in Wei
    const balanceEth = parseFloat(balanceWei) / 1e18; // Convert Wei to Ether

    res.json({ balance: balanceEth }); 
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Error fetching balance' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




  